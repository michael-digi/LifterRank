import { 
  SET_DASHBOARD_PANE } from '../actions/types';

const INITIAL_STATE = {
  pane: 'personalInfo'
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DASHBOARD_PANE:
      return {...state, pane: action.payload}
    default:
      return state;
  }
}