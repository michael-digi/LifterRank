import { 
  SHOW_MODAL_CONFIRM,
  SET_MODAL_DATA
   } from '../actions/types';

const INITIAL_STATE = {
  modal: false,
  data: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_MODAL_CONFIRM:
      console.log(action.payload)
      return {...state, modal: action.payload};
    case SET_MODAL_DATA:
      console.log(action.payload)
      return {...state, data: action.payload}
    default:
      return state;
  }
}