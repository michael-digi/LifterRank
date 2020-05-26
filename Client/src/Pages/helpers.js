import React, { useState, useEffect } from 'react';
import ResultCard from './Components/ResultCard';
import ModalResultCard from './Components/ModalResultCard';
import { Map, Marker } from 'google-maps-react';
import axios from 'axios';
import _ from 'lodash';
import haversine from 'haversine-distance'

export const searchNearby = async (lat, lng) => {
  let nearby = await axios.get('/search_nearby', {
    params: {
      lat: lat,
      lng: lng
    }
  })
  return nearby.data
}

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


export const makeCards = (gyms, coords) => {
  let cards = []
  let photoUrl;
  gyms.slice(0, 10).map(place => {
    console.log(typeof place.geometry.location.lat, ' this is jbjhbfjhebfkjebfkjebrfjkebrfjkb')
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
        img = {photoUrl} />
        // address = {place.formatted_address.split(',')} />
    )
  })
  return cards
}

export const makeDashboardCards = (gyms, coords) => {
  let cards = []
  let photoUrl;

  gyms.slice(0, 10).map(place => {
    let location = {lat: place.lat, lng: place.lng}
    console.log(location)
    console.log(coords)
    place.photo_url 
    ? photoUrl = place.photo_url
    : photoUrl = 'https://banner2.cleanpng.com/20180605/fia/kisspng-barbell-dumbbell-weight-training-physical-fitness-dumbbell-5b16616f58d006.4342646415281933913638.jpg'
    let distance = (haversine(coords, location) / 1609)
    console.log(distance)
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


export const makeModalCards = (gyms, coords) => {
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
          border: "1px solid black",
          borderRadius: '5px'
        }}
        zoom = {11}
        styles = {styles} >
          {markers}
      </Map>
     )
}

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
