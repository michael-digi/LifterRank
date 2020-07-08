import { 
  SET_NEARBY_GYM_INFO,
  SET_CARD_ARRAY,
  SET_MARKERS } from '../actions/types';

const INITIAL_STATE = {
  gyms: [],
  cards: [],
  markers: []
}

//sets the info for what is nearby the user, saving the gym info, their representation as cards in an array, and also
//a list of markers representing their location
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_NEARBY_GYM_INFO:
      return {...state, gyms: action.payload};
    case SET_CARD_ARRAY:
      return {...state, cards: action.payload}
      case SET_MARKERS:
        return {...state, markers: action.payload}
    default:
      return state;
  }
}