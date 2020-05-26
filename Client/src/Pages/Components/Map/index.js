import React from 'react';

import { GoogleApiWrapper } from 'google-maps-react';
import { loadMap, createMarkers } from '../../helpers';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './GoogleMapStyle';
import './Map.css';

class MapContainer extends React.Component {

  render() {
    console.log(process.env)
    if (this.props.gymInfo.cards.length === 0) 
      return 'LOADING'
    let markers = createMarkers(this.props.gymInfo.gyms, this.props.google)
    return loadMap(this.props, styles, markers)
  }
}

const mapStateToProps = state => ({
  userLocation: state.currentLocationInfo,
  gymInfo: state.nearbyGymInfo
});

const LoadingContainer = (props) => (
  <div id = "loadingContainer"></div>
)

const enhance = compose(
  connect(mapStateToProps),
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE,
    LoadingContainer: LoadingContainer
  }),
)

export default enhance(MapContainer);