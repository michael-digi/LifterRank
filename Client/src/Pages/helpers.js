import React, { useState, useEffect } from 'react';
import ResultCard from './Components/ResultCard';
import ModalResultCard from './Components/ModalResultCard';
import ExerciseCard from './Components/ExerciseCard';
import ExerciseCardRow from './Components/ExerciseCardRow';
import WeightliftingTableRow from './Components/WeightliftingTableRow';
import PowerliftingTableRow from './Components/PowerliftingTableRow';
import { Map, Marker } from 'google-maps-react';
import axios from 'axios';
import _ from 'lodash';
import haversine from 'haversine-distance'

//nearby search using lat lng as a center and radius constant value set on backend
export const searchNearby = async (lat, lng) => {
  let nearby = await axios.get('/search_nearby', {
    params: {
      lat: lat,
      lng: lng
    }
  })
  return nearby.data
}

//grab the user coords of current location
//uses browser's navigation.geolocation
export const usePosition = () => {
  const [position, setPosition] = useState({coords: null});
  const [error, setError] = useState(null);

  const getCoords = event => {
    let coords = {
      lat: event.coords.latitude,
      lng: event.coords.longitude
    }
    setPosition({coords: coords})
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
    else {
      geo.getCurrentPosition(getCoords)
    }
  }, []);
  return {...position, error};
}

//makes cards for the main result page, using ResultCard component and passing in each bit of data as a prop
export const makeCards = (gyms = [], coords) => {
  let cards = []
  let photoUrl;
  let addressOne, city, state, country;
  gyms.slice(0, 10).map(place => {
    let address = place.formatted_address.split(',')
    addressOne = address[0].trim()
    city = address[1].trim()
    state = address[2].trim()
    country = address[3].trim()
    place.photos 
    ? photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=215&maxheight=215&photoreference=${place.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE}`
    : photoUrl = 'https://banner2.cleanpng.com/20180605/fia/kisspng-barbell-dumbbell-weight-training-physical-fitness-dumbbell-5b16616f58d006.4342646415281933913638.jpg'
    let distance = (haversine(coords, place.geometry.location) / 1609)
    cards.push(
      <ResultCard 
        name = {place.name} 
        distance = {_.round(distance, 2)}
        id = {place.place_id} 
        key = {place.place_id}
        coords = {place.geometry.location}
        ratingsTotal = {place.user_ratings_total}
        img = {photoUrl}
        addressOne = {addressOne}
        city = {city}
        state = {state}
        country = {country} />
        // address = {place.formatted_address.split(',')} />
    )
  })
  return cards
}


//makes cards for the user dashboard page, using ResultCard component and passing in each bit of data as a prop
export const makeDashboardCards = (gyms = [], coords) => {
  let cards = []
  let photoUrl;

  gyms.slice(0, 10).map(place => {
    let location = {lat: place.lat, lng: place.lng}
    place.photo_url 
    ? photoUrl = place.photo_url
    : photoUrl = 'https://banner2.cleanpng.com/20180605/fia/kisspng-barbell-dumbbell-weight-training-physical-fitness-dumbbell-5b16616f58d006.4342646415281933913638.jpg'
    let distance = (haversine(coords, location) / 1609)
    cards.push(
      <ResultCard 
        name = {place.gym_name} 
        members = {place.membership_count}
        distance = {_.round(distance, 2)}
        id = {place.place_id} 
        key = {place.place_id}
        coords = {{lat: place.lat, lng: place.lng}}
        ratingsTotal = {place.review_count}
        img = {photoUrl} />
        // address = {place.formatted_address.split(',')} />
    )
  })
  return cards
}

//card for each section of user's best lifts dashboard
export const makeExerciseCard = (exercises = []) => {
  let cards = []
  exercises.map(exercise => {
    let exerciseName = Object.keys(exercise)[0]
    cards.push(
      <ExerciseCard
        exerciseName = {exerciseName}
        key = {exerciseName}
        prArray = {exercise[exerciseName]}/>
    )
  }) 
  return cards
}

export const makeExerciseRows = (rows) => {
  let cards = []
  let date;
  rows.map(row => {
    date = row.date_lifted.split('T')[0]
    let key = row.exercise_id + row.weight + row.reps
    cards.push(
      <ExerciseCardRow
        exerciseId = {row.exercise_id}
        exerciseType = {row.exercise_type}
        exerciseName = {row.exercise_name}
        weight = {row.weight}
        reps = {row.reps}
        dateLifted = {date}
        key = {key} />
    )
  })
  return cards
}

//miniature cards that appear as previews when a user searches for a gym to add to "Your Gyms"
export const makeModalCards = (gyms = [], coords) => {
  console.log(gyms)
  let cards = []
  let photoUrl;
  gyms.slice(0, 10).map(place => {
    place.photos 
    ? photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=215&maxheight=215&photoreference=${place.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE}`
    : photoUrl = 'https://banner2.cleanpng.com/20180605/fia/kisspng-barbell-dumbbell-weight-training-physical-fitness-dumbbell-5b16616f58d006.4342646415281933913638.jpg'
    let distance = (haversine(coords, place.geometry.location) / 1609)
    cards.push(
      <ModalResultCard
        gym_name = {place.name} 
        distance = {_.round(distance, 2)}
        place_id = {place.place_id} 
        key = {place.place_id}
        coords = {place.geometry.location}
        ratingsTotal = {place.user_ratings_total}
        img = {photoUrl}
        address = {place.formatted_address.split(',')} />
    )
  })
  return cards
}

//This will be used if the gym info is already in the db, making a call to the API not necessary
export const makeModalCardsFromDb = (gyms = [], coords) => {
  console.log(gyms, ' this is gyms')
  let cards = []
  let photoUrl;
  
  gyms.slice(0, 10).map(place => {
    let { lat, lng } = place
    let url = place.photo_url.split('key')[0]
    console.log(url, ' this is url')
    place.photo_url
    ? photoUrl = `${url}key=${process.env.REACT_APP_GOOGLE}`
    : photoUrl = 'https://banner2.cleanpng.com/20180605/fia/kisspng-barbell-dumbbell-weight-training-physical-fitness-dumbbell-5b16616f58d006.4342646415281933913638.jpg'
    let distance = (haversine(coords, {lat, lng}) / 1609)
    cards.push(
      <ModalResultCard
        gym_name = {place.gym_name} 
        distance = {_.round(distance, 2)}
        place_id = {place.place_id} 
        key = {place.place_id}
        coords = {{lat, lng}}
        ratingsTotal = {place.review_count}
        img = {photoUrl}
        fromDb = {true}
        address = {[place.address_1, place.address_2]} />
    )
  })
  return cards
}

export const unloadedMap = (props, styles) => {
  const containerStyle = { 
    width: '51%',
    height: '90%',
    minWidth: '600px',
    minHeight: '450px',
    marginLeft: '20px'
  }
  return (
      <Map
        google = {props.google}
        containerStyle={containerStyle}
        style={{
          width: "100%", 
          height: "100%", 
          border: "1px solid black",
          borderRadius: '5px'
        }}
        zoom = {11}
        styles = {styles} >
      </Map>
     )
}

//load the google map after being given the appropriate gym location markers and props, such as the user's coords
export const loadMap = (props = {}, styles = {}, markers = []) => {
  const containerStyle = { 
    width: '51%',
    height: '90%',
    minWidth: '600px',
    minHeight: '450px',
    marginLeft: '20px'
  }
  return (
      <Map
        google = {props.google}
        containerStyle={containerStyle}
        initialCenter={props.userLocation.coords}
        center={props.userLocation.coords}
        style={{
          width: "100%", 
          height: "100%", 
          border: "1px solid lightgrey",
          borderRadius: '5px'
        }}
        zoom = {11}
        styles = {styles} >
          {markers}
      </Map>
     )
}

//the rows in the table for the Members section on a gym page, weightlifting specifically
export const makeWeightliftingMemberRows = (rows = []) => {
  let stats = [];
  rows.map(row => {
    stats.push(
      <WeightliftingTableRow
        email = {row.email}
        first_name = {row.first_name}
        last_name = {row.last_name}
        snatch = {row.snatch}
        clean_and_jerk = {row.clean_and_jerk}
      />
    )
  })
  return stats
}

//the rows in the table for the Members section on a gym page, powerlifting specifically
export const makePowerliftingMemberRows = (rows = []) => {
  let stats = [];
  rows.map(row => {
    stats.push(
      <PowerliftingTableRow
        email = {row.email}
        first_name = {row.first_name}
        last_name = {row.last_name}
        squat = {row.squat}
        bench = {row.bench}
        deadlift = {row.deadlift}
      />
    )
  })
  return stats
}

//markers for the gym locations
export const createMarkers = (gyms, props) => {
  let newMarkers = [];
  gyms.slice(0, 10).map(place => {
    newMarkers.push(
      <Marker 
         title = {place.name}
         key = {place.place_id}
         position =  {place.geometry.location}
         animation = {props.maps.Animation.DROP}
         id = {place.place_id}
      />
    )
  }
)
  return newMarkers
}

