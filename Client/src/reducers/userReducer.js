import { 
  SET_USER_INFO, SET_USER_TOKEN_STATUS } from '../actions/types';

const INITIAL_STATE = {
  user: {},
  token: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      console.log(action.payload)
      return {...state, user: action.payload};
    case SET_USER_TOKEN_STATUS:
      console.log(action.payload)
      return {...state, token: action.payload};
    default:
      return state;
  }
}