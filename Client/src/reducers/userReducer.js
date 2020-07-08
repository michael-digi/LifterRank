import { 
  SET_USER_INFO, SET_USER_TOKEN_STATUS } from '../actions/types';

const INITIAL_STATE = {
  user: {},
  token: ''
}

//the user's data and the status of their token
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {...state, user: action.payload};
    case SET_USER_TOKEN_STATUS:
      return {...state, token: action.payload};
    default:
      return state;
  }
}