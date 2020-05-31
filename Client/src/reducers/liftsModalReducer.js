import { 
  SHOW_MODAL_CONFIRM_LIFT,
  SHOW_MODAL_CHOOSE_LIFT,
  SET_MODAL_LIFT_DATA,
  NEW_PR_ADDED } from '../actions/types';

const INITIAL_STATE = {
  confirmLiftsModal: false,
  chooseLiftsModal: false,
  data: {},
  newPr: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_MODAL_CONFIRM_LIFT:
      console.log(action.payload, ' this is confirm lift')
      return {...state, confirmLiftsModal: action.payload};
    case SHOW_MODAL_CHOOSE_LIFT:
      console.log(action.payload, ' this is choose lift')
      return {...state, chooseLiftsModal: action.payload}
    case SET_MODAL_LIFT_DATA:
      console.log(action.payload, ' this is lift data')
      return {...state, data: action.payload}
    case NEW_PR_ADDED:
      console.log(action.payload)
      return {...state, newPr: !state.newPr}
    default:
      return state;
  }
}