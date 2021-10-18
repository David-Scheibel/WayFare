import React, { Component } from 'react'
import DirectionRenderer from '../components/DirectionRenderer'

import { compose, withProps } from "recompose";
const { withScriptjs, withGoogleMap, GoogleMap } = require("react-google-maps");

const key = 'AIzaSyACHyvCE43RPhlIl8G4MvXhs5u1rJrvT_8'
const G_API_URL = `https://maps.googleapis.com/maps/api/js?key=${key}&&v=3.exp&libraries=geometry,drawing,places`

// Example route
const from = { 
  latLng: "39.02430624142053, -77.14601482112745", 
  title: "Westfield Mall"
              }
const to = { 
  latLng: "38.98961286309075, -77.09756172168736", 
  title: "Brickside Bar"
}
const ourTrip = {
  from: from,
  to: to,
  strokeColor: '#58CCED'
}

const createLocationObject = (
  from,
  fromTitle,
  to,
  toTitle,
  strokeColor = "#f68f54"
) => {
  return {
    from: { ...createLatLngObject(from), fromTitle },
    to: { ...createLatLngObject(to), toTitle },
    strokeColor: strokeColor
  }
}

const createLatLngObject = latLng => {
  const latLngArray = latLng.split(",");
  return {
    lat: latLngArray[0],
    lng: latLngArray[1]
  }
}

const locationObject = createLocationObject(
  ourTrip.from.latLng,
  ourTrip.from.title,
  ourTrip.to.latLng,
  ourTrip.to.title,
  ourTrip.strokeColor
)



class DirectionsContainer extends Component {
  
  state = {
    defaultZoom: 11,
    map: null,
    center: {
      lat: 39.0069596,
      lng: -77.1217883
    }
  };

  render() {
    return (
      <React.Fragment>
        
        <GoogleMap
          defaultZoom={this.state.defaultZoom}
          center={this.state.center}
          defaultCenter={new window.google.maps.LatLng(39.0069596, -77.1217883)}
          style={{maxWidth: "100%", maxHeight: "50%"}}
        />

        <DirectionRenderer
          key={0}
          index={1}
          strokeColor={locationObject.strokeColor}
          from={locationObject.from}
          to={locationObject.to}
          who={this.props.who}
          updateResult={this.props.updateResult}
          MCstate={this.props.MCstate}
          updateActivateRide={this.props.updateActivateRide}
          updateCompleteRide={this.props.updateCompleteRide}
          updateRideToggle={this.props.updateRideToggle}
        />

      </React.Fragment>
    )
  }
}

export default compose(
  withProps({
    googleMapURL: G_API_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px` }} />,
    mapElement: <div className='border border-dark' style={{ height: `100%`, width: '80%', margin: 'auto' }} />
  }),
  withScriptjs,
  withGoogleMap
)(DirectionsContainer);