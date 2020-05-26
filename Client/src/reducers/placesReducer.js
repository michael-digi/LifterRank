import { 
  SET_NEARBY_GYM_INFO,
  SET_CARD_ARRAY,
  SET_MARKERS } from '../actions/types';

const INITIAL_STATE = {
  gyms: [],
  cards: [],
  markers: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_NEARBY_GYM_INFO:
      return {...state, gyms: action.payload};
    case SET_CARD_ARRAY:
      return {...state, cards: action.payload}
      case SET_MARKERS:
        console.log(action.payload, 'markers')
        return {...state, markers: action.payload}
    default:
      return state;
  }
}