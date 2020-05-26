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

searchNearby = async (req, res, next) => {
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

searchByText = async (req, res, next) => {
	console.log(req.body)
	let search = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
		params: {
			key: process.env.GOOGLE,
			query: req.body.input,
			type: 'gym'
		}
	})
	return res.send(search.data.results)
}

// findPlaceFromText = async (req, res, next) => {
// 	console.log(req.body)
// 	let search = await axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json', {
// 		params: {
// 			key: process.env.GOOGLE,
// 			input: req.body.input,
// 			inputtype: 'textquery',
// 			fields: 'formatted_address,name,geometry,photos,place_id,types,user_ratings_total,rating',
// 			type: 'powerlifting gym'
// 		}
// 	})
// 	console.log(search.data.candidates)
// 	return res.send(search.data.candidates)
// }

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

changePassword = async (req, res) => {
	const { uuid } = req.user
	let user = await pool.query(queries.selectOneUserByUUID, [uuid])
	const checkPassword = await bcrypt.compare(req.body.cur, user.rows[0].password)
	if (checkPassword && req.body.new === req.body.confirm) {
		let newPassword = await bcrypt.hash(req.body.new, saltRounds)
		let update = await pool.query(queries.updatePassword, [newPassword, uuid])
	}
}

changePersonalInfo = async (req, res) => {
	const { uuid } = req.user;
	const { firstName, lastName, email, phone, bio } = req.body
	console.table([uuid, firstName, lastName, email, phone, bio])
	let update = await pool.query(queries.updatePersonalInfo, [firstName, lastName, email, phone, bio, uuid])
}

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

selectUser = async (req, res) => {
	const { uuid } = req.user
	let user = await pool.query(queries.selectOneUserByUUID, [uuid])
	user.rows[0].password = ''
	user.rows[0].user_id = ''
	return res.send(user.rows[0])
}

sendUser = async (req, res) => {
	const { user } = req
	return res.send({ user: user})
}

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

getUsersGymMemberships = async (req, res) => {
	let { uuid } = req.user
	let memberships = await pool.query(queries.getUsersMemberships, [uuid])
	return res.send(memberships.rows)
}

addGymMember = async (req, res) => {
	let { place_id, gym_name } = req.body.gymData
	let { uuid } = req.user
	
	let gym_member_check = await pool.query(queries.checkIfMember, [place_id, uuid])
	if (gym_member_check.rowCount === 1) {
		console.log(gym_member_check.rows[0], ' youre already a member here')
		return
	}
	
	let gym = await pool.query(queries.selectOneGym, [place_id])
	if (gym.rowCount === 0) {
		let { place_id, gym_name, coords, ratingsTotal, img } = req.body.gymData
		
		const insertGym = await pool.query(queries.insertNewGym, [place_id, gym_name, 1, coords.lat, coords.lng, ratingsTotal, img])
		
		let user = await pool.query(queries.selectOneUserByUUID, [uuid])
		let { user_id, user_uuid } = user.rows[0]
		
		const insertNewMember = await pool.query(queries.insertNewMember, [place_id, gym_name, user_id, user_uuid])
		return res.send(insertNewMember.rows[0])
	}
	else {
		const updateGym = await pool.query(queries.updateGymMemberCount, [gym.rows[0].membership_count + 1, gym.rows[0].place_id])

		const user = await pool.query(queries.selectOneUserByUUID, [uuid])
		let { user_id, user_uuid } = user.rows[0]
		
		const insertNewMember = await pool.query(queries.insertNewMember, [place_id, gym_name, user_id, user_uuid])
		return res.send(insertNewMember.rows[0])
	}
}


router.post('/addGymMember', checkToken, addGymMember)
	
router.get('/search_nearby', searchNearby);

router.post('/searchByText', searchByText)

router.post('/signUp', registerUser);

router.post('/login', authenticateUser, createToken)

router.post('/personalInfo', checkToken, changePersonalInfo)

router.post('/changePassword', checkToken, changePassword)

router.get('/verifyToken', checkToken, sendUser)

router.get('/getUsersMemberships', checkToken, getUsersGymMemberships)

router.get('/selectUser', checkToken, selectUser)

module.exports = router
