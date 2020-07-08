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

//this reducer is concerned with toggling the visibility of the confirmLiftsModal and chooseLiftsModal, as well as the
//accompanying data about the lifts. NEW_PR_ADDED is a toggle to simply tell if a new PR has just been added to the user's lifts,
//which triggers a rerender, showing the gym now in the list
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