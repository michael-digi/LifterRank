import React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import { loadMap, createMarkers } from '../../helpers';
import { setGymInfo, setCurrentUserLocation, setCardArray } from '../../../actions'
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './GoogleMapStyle';
import './Map.css';

class MapContainer extends React.Component {

  componentWillUnmount() {
    this.props.setCurrentUserLocation({})
    this.props.setCardArray([])
    this.props.setGymInfo([])
  }

  render() {
    if (this.props.gymInfo.cards.length === 0 || this.props.userLocation === undefined) 
      return 'LOADING'
    let markers = createMarkers(this.props.gymInfo.gyms, this.props.google)
    return loadMap(this.props, styles, markers)
  }
}

const mapStateToProps = state => ({
  userLocation: state.currentLocationInfo,
  gymInfo: state.nearbyGymInfo
});

const dispatch = {
  setGymInfo,
  setCurrentUserLocation,
  setCardArray
}

const LoadingContainer = (props) => (
  <div id = "loadingContainer"></div>
)

const enhance = compose(
  connect(mapStateToProps, dispatch),
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE,
    LoadingContainer: LoadingContainer
  }),
)

export default enhance(MapContainer);