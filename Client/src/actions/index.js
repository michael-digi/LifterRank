import { 
  SET_CURRENT_USER_LOCATION, 
  SET_NEARBY_GYM_INFO, 
  SET_CARD_ARRAY,
  SET_MARKERS,
  SET_USER_INFO,
  SET_USER_TOKEN_STATUS,
  SET_DASHBOARD_PANE,
  SHOW_MODAL_CONFIRM,
  SET_MODAL_DATA } from './types';

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

export const showModalConfirm = show => {
  return {
    type: SHOW_MODAL_CONFIRM,
    payload: show
  }
}

export const setModalData = data => {
  return {
    type: SET_MODAL_DATA,
    payload: data
  }
}