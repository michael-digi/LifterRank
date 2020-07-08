const express = require('express')
require('dotenv').config()
const queries = require('./queries')
const bcrypt = require('bcrypt')
const router = express.Router()
const axios = require('axios')
const pool = require('./db')
const saltRounds = 12;
const secret = process.env.SECRET
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const jwtExpirySeconds = 3000;

//search near the user. lat lng is center with radius searched around this point. query is hardcoded to 'powerlifting gym'
//as that seems to return closest to the places we're looking for
searchNearby = async (req, res) => {
  const lat = req.query.lat, lng = req.query.lng;
  console.log(' endpoint hit')
	let response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
  	params: {
			query: 'powerlifting gym',
			key: process.env.GOOGLE,
			radius: 2500,
			location: lat + ',' + lng
		}
	})  
	return res.send(response.data.results)
}

//uses the google place's API with the query taken in from the user, with 'type' narrowed down to 'gym' so as to not
//return other industries
searchByText = async (req, res, next) => {
	console.log('endpoint hit, for search')
	let search = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
		params: {
			key: process.env.GOOGLE,
			query: req.query.gym_name,
			type: 'gym'
		}
	})
	console.log(search.data.results, ' this is results')
	return res.send(search.data.results)
}

//for login, checks if their is both an email and password given, if not, send error message
//if email and password given, but not user is found from db query, return error
//if user exists, unhash the password in the db and compare it to the one given when attempting login
//if incorrect, send error. if correct, send user info along to next route via next()
authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send({ message: 'Invalid Login' })
	let user = await pool.query(queries.selectOneUserByEmail, [email])
	if (user.rowCount === 0) return res.send({ message: 'Invalid Login' })
	const hashed = user.rows[0].password
	const checkPassword = await bcrypt.compare(password, hashed)
	const userInfo = user.rows[0]
	if (checkPassword) {
		req.user = userInfo
		next()
	} else {
		return res.send({ message: 'Invalid Login' })
	}
}

//grab user from db by uuid. compare the password in the db to the one given by the user
//if they match, allow them to change their password to the new one they submitted
//if not match, send back error
changePassword = async (req) => {
	const { uuid } = req.user
	let user = await pool.query(queries.selectOneUserByUUID, [uuid])
	const checkPassword = await bcrypt.compare(req.body.cur, user.rows[0].password)
	if (checkPassword && req.body.new === req.body.confirm) {
		let newPassword = await bcrypt.hash(req.body.new, saltRounds)
		let update = await pool.query(queries.updatePassword, [newPassword, uuid])
	}
}

//update user with updated info submitted from the personal info section of their dashboard
changePersonalInfo = async (req) => {
	const { uuid } = req.user;
	const { firstName, lastName, email, phone, bio } = req.body
	console.table([uuid, firstName, lastName, email, phone, bio])
	let update = await pool.query(queries.updatePersonalInfo, [firstName, lastName, email, phone, bio, uuid])
}

//creates a JWToken, the payload being a combo of their uuid and email, using the HS256 alogorithm, and expires in 10 mins, currently
//respond with a cookie containing the token
//send the uuid and email back
createToken = async (req, res) => {
	const { user } = req
	if (!req.user) {
		return res.status(400).json({ message: 'An error occured, please try again' });
	}
	const payload = {
		uuid: user.user_uuid,
		email: user.email
	}
	const token = jwt.sign(payload, secret, {
		algorithm: "HS256",
		expiresIn: 1000
	})
	res.cookie('token', token, { maxAge: jwtExpirySeconds * 3000 });
	res.status(200).send({ uuid: user.user_uuid, email: user.email });
}

//send back user info based on uuid but first make blank their password and user_id (obscuring the user_id currently
//so as to not communicate how many users are in the db)
selectUser = async (req, res) => {
	const { uuid } = req.user
	let user = await pool.query(queries.selectOneUserByUUID, [uuid])
	user.rows[0].password = ''
	user.rows[0].user_id = ''
	return res.send(user.rows[0])
}

//send user as response
sendUser = async (req, res) => {
	const { user } = req
	return res.send({ user: user})
}

//check if token is valid. First check the amount of sections separated by a period. There should be three: header, payload,
//signature. we check this because a common attack is to strip the signature and change the algorithm.
//use the built in JWToken package to verify using the token, secret, and algorithm.
//catch the error of the token being expired if necessary and send as response
checkToken = async (req, res, next) => {
	const { token } = req.cookies
	if (token.split('.').length !== 3) return res.send({ message: 'invalid token' })
	try {
		console.log(req.body, ' this is in check token')
		const verifyUser = jwt.verify(token, secret, {algorithms: ['HS256']})
		if (verifyUser.uuid && verifyUser.email) req.user = verifyUser
		next() 
	}
	catch (error) {
		if (error.expiredAt) return res.send({ expired: error.expiredAt })
		return res.send({message: 'invalid token'})
	}
}

//registering the user in the db, first check if the user already exists but checking if there is a response when searching
//for that user. If not, hash their password, create a random uuidv4 string to represent their uuid, and insert them into the db.
//this query is setup to return the row that was just inserted, so if nothing is returned, then that means there was an error.
//if no error, send the recently created user back as response.
registerUser = async (req, res, next) => {
	let { email, password } = req.body
	let user = await pool.query(queries.selectOneUserByEmail, [email])
	if (user.rowCount === 1) return res.send('this user already exists')
	const hashedPassword = await bcrypt.hash(password, saltRounds)
	const uuid = uuidv4()
	password = hashedPassword
	const insertUser = await pool.query(queries.insertNewUser, [email, password, uuid]
	)
	if (insertUser.rowCount === 0) return res.send('Error inserting user')
	user = await pool.query(queries.selectOneUserByEmail, [email])
	return res.send(user.rows[0].user_uuid)
}

//grab all memberships the user has to different gyms
getUsersGymMemberships = async (req, res) => {
	let { uuid } = req.user
	let memberships = await pool.query(queries.getUsersMemberships, [uuid])
	return res.send(memberships.rows)
}

//this is triggered when a user tries to claim they are a member of a gym. first, check if they've already declared themselves
//as a member and send this information as a response if they are. If a gym's info is not yet in the database at all (much
//less if users have claimed memberships there), hit the yelp api and get info about the gym. insert all available info about
//the gym into the db from the yelp response. If successful, also add the gym hours if applicable.
//if the gym does exist, increment their member count by 1 (new members) and update the members table with this new relationship
addGymMember = async (req, res) => {
	console.log('add')
	let { place_id, gym_name, ratingsTotal } = req.body.gymData
	let { uuid } = req.user
	
	let gym_member_check = await pool.query(queries.checkIfMember, [place_id, uuid])
	if (gym_member_check.rowCount === 1) {
		console.log(gym_member_check.rows[0], ' youre already a member here')
		return
	}
	let gym = await pool.query(queries.selectOneGym, [place_id])
	if (gym.rowCount === 0) {
		let { place_id, gym_name, coords, ratingsTotal, img } = req.body.gymData
		let { lat, lng } = coords
		
		const yelp = await getGymYelp(place_id, gym_name, lat, lng, img)
		const { id, image_url, phone, display_phone, location, photos, hours} = yelp

		const insertGym = await pool.query(queries.insertNewGym, 
			[ place_id, id, gym_name, location.display_address[0], location.display_address[1], 1,
				ratingsTotal, lat, lng, phone, display_phone, photos[0], photos[1], photos[2],
				img, image_url, location.city, location.state, location.ountry, location.zip_code])
		
		if (insertGym.rowCount === 1) {
			try{
				processHours(place_id, id, gym_name, hours[0].open)
			}
			catch {
				console.log('no hours')
			}
		}
		
		let user = await pool.query(queries.selectOneUserByUUID, [uuid])
		let { user_id, user_uuid } = user.rows[0]
		
		const insertNewMember = await pool.query(queries.insertNewMember, [place_id, id, gym_name, user_id, user_uuid])
		return res.send(insertNewMember.rows[0])
	}
	else {
		const updateGym = await pool.query(queries.updateGymMemberCount, [gym.rows[0].membership_count + 1, gym.rows[0].place_id])

		const user = await pool.query(queries.selectOneUserByUUID, [uuid])
		let { user_id, user_uuid } = user.rows[0]
		let { place_id2 } = gym.rows[0]
		const insertNewMember = await pool.query(queries.insertNewMember, [place_id, place_id2, gym_name, user_id, user_uuid])
		return res.send(insertNewMember.rows[0])
	}
}

//get different types of exercises for modal
getLiftTypes = async (req, res) => {
	const types = await pool.query(queries.getLiftTypes)
	let response = types.rows.map(type => {
		return type.exercise_type
	})
	return res.send(response)
}

//get different exercises once type is chosen
getExercisesFromType = async (req, res) => {
	let exercises = await pool.query(queries.getExercisesFromType, [req.query.exercise])
	let response = exercises.rows.map(exercise => {
		return exercise.exercise_name
	})
	return res.send(response)
}

//extract uuid, reps, weight, exercises from request
//get the user from the uuid, get the exercise by name
//insert into the user PR's table using the uuid and exercise_id
addNewPr = async (req, res) => {
	const { uuid } = req.user
	const { reps, weight, exercise } = req.body.PR
	let getExercise = await pool.query(queries.getExerciseFromName, [exercise])
	let user = await pool.query(queries.selectOneUserByUUID, [uuid])
	const { exercise_id } = getExercise.rows[0]
	const { user_id } = user.rows[0]
	let newPr = await pool.query(queries.addNewPr, [user_id, uuid, exercise_id, reps, weight])
	return res.send(newPr.rows)
}

//this is a bit tricky; it's necessary to return a nested, convenient data stucture of all the user's lifts. This 
//is also only returning the major competition lifts (not any variations, so Snatch will be returned but not Hang Snatch).
//first find all the user's PR's in the table by using their uuid. then use 'filter' to only find those lifts where the
//type equals the name (which is only the major comp lifts).
getUserPrs = async (req, res) => {
	const { uuid } = req.user
	let formatted = {}
	let getExercises = await pool.query(queries.getUserPrs, [uuid])
  let filteredRows = getExercises.rows.filter(row => {
		if (row.exercise_name === row.exercise_type) {
			return row
		}
	})
	for (let i=0; i < filteredRows.length; i++){
		if (formatted[`${filteredRows[i].exercise_name}`]) { formatted[`${filteredRows[i].exercise_name}`].push(filteredRows[i]) }
		else { formatted[`${filteredRows[i].exercise_name}`] = [filteredRows[i]] }
	}
	const final = []
	Object.keys(formatted).forEach(key => {
		let obj = {}
		obj[`${key}`] = formatted[key]
		final.push(obj)
	});
	return res.send(final)
}

//get a gym's info via the google api
getGymGoogle = async (place_id, gym_name, lat, lng, img) => {
	console.log(gym_name, place_id, lat, lng)
  let response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
    params: {
			key: process.env.GOOGLE,
			place_id: place_id
    }
	})
	console.log(response.data.result.opening_hours.periods, ' this is responsedataa')
}

//get a gym's info via the yelp api, the first query being general info from the name, the second query being specific info
//based on the place's yelp id
getGymYelp = async (place_id, gym_name, lat, lng, img) => {
	console.log('first query')
  let response = await axios.get('https://api.yelp.com/v3/businesses/search', {
    headers: {
      'Authorization': `Bearer ${process.env.YELP}`
    },
    params: {
      term: gym_name,
      latitude: lat,
			longitude: lng,
			limit: 1
    }
	})
	//Detail info, hours, three images 
	console.log('second query')
	let id = response.data.businesses[0].id
  let details = await axios.get(`https://api.yelp.com/v3/businesses/${id}`, {
    headers: {
      'Authorization': `Bearer ${process.env.YELP}`
    }
	})
	console.log('second query over')
	return details.data
}

//get gym overview for a gym's page. if the gym is in the db, send it. if not, need to hit the yelp endpoint and return
//the info. insert this new info into the db, then send it.
getGymOverview = async (req, res) => {
	console.log('start of overview')
	let { place_id, gym_name, lat, lng, img, ratings_total } = req.query
	let gym = await pool.query(queries.selectOneGym, [place_id])
	if (gym.rowCount === 1) {
		console.log('database hit')
		return res.send(gym.rows[0])
	}
	else {
		console.log('start yelp')
		let yelp = await getGymYelp(place_id, gym_name, lat, lng, img)
		console.log('returned yelp')
		console.log(yelp, 'look here')
		let { id, image_url, phone, display_phone, location, photos, hours } = yelp
		console.log('start insert')
		const insertGym = await pool.query(queries.insertNewGym, 
			[ place_id, id, gym_name, location.display_address[0], location.display_address[1], 1,
				ratings_total, lat, lng, phone, display_phone, photos[0], photos[1], photos[2],
				img, image_url, location.city, location.state, location.ountry, location.zip_code])
		console.log('end insert')
		if(insertGym.rowCount === 1) processHours(place_id, id, gym_name, hours[0].open)

		console.log('this is insertGym, database not hit')
		return res.send(insertGym.rows[0])
	}
}

//process the hours from the yelp api
processHours = (place_id, place_id2, gym_name, hours) => {
	console.log(hours, gym_name)
		hours.map(time => {
			try {
				const { start, end, day } = time
			  pool.query(queries.insertHoursRow, [place_id, place_id2, gym_name, day, start, end])
			}
			catch {
				console.log('error inserting hours')
			}
		})
}

//not yet implemented, essentially an autocomplete for the postgres db
fuzzySearch =  async (req, res) => {
	console.log(req.query)
	const { gym_name } = req.query;
	let response = await pool.query(queries.fuzzyDatabaseGymSearch, [gym_name])
	console.log(response.rows)
	return res.send(response.rows)
}

//get gym overview from the db
gymPageOverview = async (req, res) => {
	console.log('hit')
	const gym = await pool.query(queries.selectOneGym, [req.query.place_id])
	return res.send(gym.rows[0])
}

//get hours from db and format them
gymHours = async (req, res) => {
	console.log(req.query.place_id)
	const gymHours = await pool.query(queries.getHours, [req.query.place_id])
	let days = {};
	gymHours.rows.map(row => {
		let opening = row.opening.split(':')
		let closing = row.closing.split(':')
		opening = opening[0] + ':' + opening[1]
		closing = closing[0] + ':' + closing[1]
		days[`${row.day_of_the_week}`] = {opening: opening, closing: closing}
	})
	console.log(days[`${0}`])
	return res.send(days)
}

//this makes a weightlifting stats table in the DB on the fly, and first drops such a table if it exists
weightliftingStats = async (req, res) => {
	let place_id = req.query[`0`]
	await pool.query(queries.dropWeightlifting)
	let snatches = await pool.query(queries.getSnatches, [place_id])
	await pool.query(queries.getCnj, [place_id])
	let lifts = await pool.query(queries.getSnAndCl)
	return res.send(lifts.rows)
}

//this makes a powerlifting stats table in the DB on the fly, and first drops such a table if it exists
powerliftingStats = async (req, res) => {
	let place_id = req.query[`0`]
	await pool.query(queries.dropPowerlifting)
	await pool.query(queries.getSquats, [place_id])
	await pool.query(queries.getBench, [place_id])
	await pool.query(queries.getDeadlift, [place_id])
	let lifts = await pool.query(queries.getSBD)
	return res.send(lifts.rows)
}

router.post('/addGymMember', checkToken, addGymMember)
	
router.get('/search_nearby', searchNearby);

router.get('/searchByText', searchByText)

router.post('/signUp', registerUser);

router.post('/login', authenticateUser, createToken)

router.post('/personalInfo', checkToken, changePersonalInfo)

router.post('/changePassword', checkToken, changePassword)

router.get('/verifyToken', checkToken, sendUser)

router.get('/getUsersMemberships', checkToken, getUsersGymMemberships)

router.get('/selectUser', checkToken, selectUser)

router.get('/getLiftTypes', getLiftTypes)

router.get('/getExercisesFromType', getExercisesFromType)

router.post('/addNewPr', checkToken, addNewPr)

router.get('/getUserPrs', checkToken, getUserPrs)

router.get('/getGymGoogle', getGymGoogle)

router.get('/getGymOverview', getGymOverview)

router.get('/fuzzySearch', fuzzySearch)

router.get('/gymPageOverview', gymPageOverview)

router.get('/getGymHours', gymHours)

router.get('/getGymWeightliftingStats', weightliftingStats)

router.get('/getGymPowerliftingStats', powerliftingStats)

module.exports = router
