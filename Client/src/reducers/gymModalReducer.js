import { 
  SHOW_MODAL_CONFIRM_GYM,
  SHOW_MODAL_CHOOSE_GYM,
  SET_MODAL_GYM_DATA,
  NEW_GYM_ADDED
   } from '../actions/types';

const INITIAL_STATE = {
  confirmGymModal: false,
  chooseGymModal: false,
  data: {},
  newGym: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_MODAL_CONFIRM_GYM:
      console.log(action.payload, ' this is confirm')
      return {...state, confirmGymModal: action.payload};
    case SHOW_MODAL_CHOOSE_GYM:
      console.log(action.payload, ' this is choose')
      return {...state, chooseGymModal: action.payload}
    case SET_MODAL_GYM_DATA:
      console.log(action.payload)
      return {...state, data: action.payload}
    case NEW_GYM_ADDED:
      console.log(action.payload)
      return {...state, newGym: !state.newGym}
    default:
      return state;
  }
}