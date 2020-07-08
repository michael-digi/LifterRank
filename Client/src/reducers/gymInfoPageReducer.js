import { 
  SET_GYM_PAGE_INFO,
  SET_CURRENT_NAV_CARD,
  SET_GYM_PAGE_ID } from '../actions/types';

const INITIAL_STATE = {
  pageInfo: {},
  place_id: '',
  currentNavCard: ''
}

//this reducer saves the current gym info card selected (Members, Overview etc) as well as the gym's place_id and info
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_GYM_PAGE_INFO:
      console.log(action.payload)
      return {...state, pageInfo: action.payload}
    case SET_CURRENT_NAV_CARD:
      return {...state, currentNavCard: action.payload}
      case SET_GYM_PAGE_ID:
        return {...state, place_id: action.payload}
    default:
      return state;
  }
}