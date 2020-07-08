import { 
  SET_SPORT_MEMBERSHIP_TABLE,
  SET_MEMBERSHIP_DATA } from '../actions/types';

const INITIAL_STATE = {
  sport: '',
  sportData: []
}

//this reducer toggles which sport is visible in the members table, as well as the data from those members (their lifts)
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SPORT_MEMBERSHIP_TABLE:
      console.log(action.payload, ' sport membership')
      return {...state, sport: action.payload};
    case SET_MEMBERSHIP_DATA:
      console.log(action.payload, ' sport data')
      return {...state, sportData: action.payload};
    default:
      return state;
  }
}