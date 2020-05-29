import { 
  SET_CURRENT_USER_LOCATION, 
  SET_NEARBY_GYM_INFO, 
  SET_CARD_ARRAY,
  SET_MARKERS,
  SET_USER_INFO,
  SET_USER_TOKEN_STATUS,
  SET_DASHBOARD_PANE,
  SHOW_MODAL_CHOOSE_GYM,
  SHOW_MODAL_CONFIRM_GYM,
  SET_MODAL_GYM_DATA,
  SHOW_MODAL_CHOOSE_LIFT, 
  SHOW_MODAL_CONFIRM_LIFT,
  SET_MODAL_LIFT_DATA, 
  NEW_GYM_ADDED
  } from './types';

export const setCurrentUserLocation = coords => {
  return {
    type: SET_CURRENT_USER_LOCATION,
    payload: coords
  }
}

export const setGymInfo = places => {
  return {
    type: SET_NEARBY_GYM_INFO,
    payload: places
  }
}

export const setCardArray = cards => {
  return {
    type: SET_CARD_ARRAY,
    payload: cards
  }
}

export const setMarkers = markers => {
  return {
    type: SET_MARKERS,
    payload: markers
  }
}

export const setUserInfo = user => {
  return {
    type: SET_USER_INFO,
    payload: user
  }
}

export const setUserTokenStatus = token => {
  return {
    type: SET_USER_TOKEN_STATUS,
    payload: token
  }
}

export const setDashboardPane = pane => {
  return {
    type: SET_DASHBOARD_PANE,
    payload: pane
  }
}

export const showModalChooseGym = show => {
  return {
    type: SHOW_MODAL_CHOOSE_GYM, 
    payload: show
  }
}

export const showModalConfirmGym = show => {
  return {
    type: SHOW_MODAL_CONFIRM_GYM,
    payload: show
  }
}

export const setModalGymData = data => {
  return {
    type: SET_MODAL_GYM_DATA,
    payload: data
  }
}

export const newGymAdded = event => {
  return {
    type: NEW_GYM_ADDED,
    payload: event
  }
}

export const showModalChooseLift = show => {
  return {
    type: SHOW_MODAL_CHOOSE_LIFT,
    payload: show
  }
}

export const showModalConfirmLift = show => {
  return {
    type: SHOW_MODAL_CONFIRM_LIFT,
    payload: show
  }
}

export const setModalLiftData = data => {
  return {
    type: SET_MODAL_LIFT_DATA,
    payload: data
  }
}
