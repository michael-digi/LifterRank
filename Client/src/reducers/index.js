import { combineReducers } from 'redux';
import userLocationReducer from './userLocationReducer';
import placesReducer from './placesReducer';
import userReducer from './userReducer';
import dashboardPaneReducer from './dashboardPaneReducer';
import gymModalReducer from './gymModalReducer';
import liftsModalReducer from './liftsModalReducer';
import gymInfoPageReducer from './gymInfoPageReducer';

export default combineReducers({
	currentLocationInfo: userLocationReducer,
	nearbyGymInfo: placesReducer,
	userInfo: userReducer,
	dashboardPane: dashboardPaneReducer,
	gymModal: gymModalReducer,
	liftsModal: liftsModalReducer,
	gymPageInfo: gymInfoPageReducer
})