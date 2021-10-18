import React, { Component } from 'react'
import MapContainer from './MapContainer'
import DirectionsContainer from './DirectionsContainer'

// https://maps.googleapis.com/maps/api/directions/json?
// origin=Chicago,IL&destination=Los+Angeles,CA
// &waypoints=Joplin,MO|Oklahoma+City,OK
// &key=AIzaSyACHyvCE43RPhlIl8G4MvXhs5u1rJrvT_8

class GPSContainer extends Component {
    render() {
        return (
            <div className='border-dark rounded' style={{height: '50%'}}>
                {/* <MapContainer/> */}
                <DirectionsContainer 
                    who={this.props.who} 
                    updateResult={this.props.updateResult} 
                    MCstate={this.props.MCstate} 
                    updateActivateRide={this.props.updateActivateRide} 
                    updateCompleteRide={this.props.updateCompleteRide} 
                    updateRideToggle={this.props.updateRideToggle}
                />
            </div>
        )
    }
}
export default GPSContainer