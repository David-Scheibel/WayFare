import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    maxWidth: "100%",
    maxHeight: "85%",
    // overflowX: "hidden",
    // overflowY: "hidden"
};

const coords = [
  {
    latitude: 39.02430624142053,
    longitude: -77.14601482112745
  },
  {
    latitude: 38.98961286309075,
    longitude: -77.09756172168736
  }
]

export class MapContainer extends Component {
  render() {
    return (
      <Map
        mapId='6cd23ae4cce7e4df'
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: 38.9847,
            lng: -77.0947
          }
        }
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyACHyvCE43RPhlIl8G4MvXhs5u1rJrvT_8'
})(MapContainer);