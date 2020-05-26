import { 
  SET_CURRENT_USER_LOCATION, 
  SET_CURRENT_USER_MARKER } from '../actions/types';

const INITIAL_STATE = {
  coords: {lat: null, lng: null},
  userMarker: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER_LOCATION:
      return {...state, coords: action.payload};
     case SET_CURRENT_USER_MARKER:
     return {...state, userMarker: action.payload}
    default:
      return state;
  }
}