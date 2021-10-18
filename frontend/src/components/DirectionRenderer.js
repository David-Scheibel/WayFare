import React, { Component } from 'react'
const { Marker, DirectionsRenderer } = require("react-google-maps");

const convertLatLngToObj = (lat, lng) => { return { lat, lng } }

class DirectionRenderer extends Component {

    state = {
        directions: null,
        wayPoints: null,
        currentLocation: null,
        result: null,
        counter: 0
    }

    componentDidMount() {
        const startLoc = this.props.MCstate.origin       //this.props.from.lat + ", " + this.props.from.lng;
        const destinationLoc = this.props.MCstate.destination   //this.props.to.lat + ", " + this.props.to.lng;

        // this part prints map instructions
        // const directionService = new window.google.maps.DirectionsService();
        // directionService.route(
        //   {
        //     origin: startLoc,
        //     destination: destinationLoc,
        //     // optimizeWaypoints: true,
        //     travelMode: window.google.maps.TravelMode.DRIVING
        //   },
        //   (result, status) => {
        //     this.props.updateResult(result, this.props.who)
        //     // const steps = result.routes[0].legs[0].steps
        //     // let arr = []
        //     // steps.map(elem => arr.push(elem.instructions))
        //     // this.props.who == 'rider'? console.log(arr) : console.log() // console.log(this.props.who, result.routes[0].legs[0].steps)
        //   }
        // )
    }

    componentDidUpdate() {
      if(this.props.MCstate.activateRide && this.state.counter == 0) {
        this.props.updateActivateRide(false)
        this.setState({counter: this.state.counter+1})

        // Ride in progress...
        this.getDirections(this.props.MCstate.origin , this.props.MCstate.destination) 
        this.setCurrentLocation()
      }
    }

    async getDirections(startLoc, destinationLoc, wayPoints = []) {
        const waypts = [];
        if (wayPoints.length > 0) {
          waypts.push({
            location: new window.google.maps.LatLng(
              wayPoints[0].lat,
              wayPoints[0].lng
            ),
            stopover: true
          });
        }
        const directionService = new window.google.maps.DirectionsService();
        directionService.route(
          {
            origin: startLoc,
            destination: destinationLoc,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: window.google.maps.TravelMode.DRIVING
          },
          (result, status) => {
            this.props.updateResult(result, this.props.who)
            // console.log("status", status);
            // console.log(result.routes[0].legs[0].steps[0].instructions)

            // const steps = result.routes[0].legs[0].steps
            // let arr = []
            // steps.map(elem => arr.push(elem.instructions))            
            // this.props.who == 'rider'? console.log(this.props.who, arr) : console.log()

            // This section retrieves information
            if (status === window.google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result,
                wayPoints: result.routes[0].overview_path.filter((elem, index) => {
                  return index % 30 === 0;
                })
              });
            } else if (
              status === window.google.maps.DirectionsStatus.OVER_QUERY_LIMIT
            ) {
              this.delayFactor += 0.2;
              // if (this.delayFactor <= 10) this.delayFactor = 0.2;
              setTimeout(() => {
                this.getDirections(startLoc, destinationLoc, wayPoints);
              }, this.delayFactor * 200);
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
    }

    setCurrentLocation = () => {
        let count = 0;
        let refreshIntervalId = setInterval(() => {
          const locations = this.state.wayPoints;
          if (locations) {
            if (count <= locations.length - 1) {
              const currentLocation = convertLatLngToObj(
                locations[count].lat(),
                locations[count].lng()
              );
              this.setState({ currentLocation });
    
              const wayPts = [];
              wayPts.push(currentLocation);
              const startLoc = this.props.MCstate.origin;
              const destinationLoc = this.props.MCstate.destination;
              this.delayFactor = 0;
              this.getDirections(startLoc, destinationLoc, wayPts);
              count++;
            } else {  // Clean up section
              clearInterval(refreshIntervalId);
              this.setState({counter: 0})
              // potentially move activate Ride false here

              // Ask Rider, and driver for rating upon completion of Route
              console.log('finished ride')
              // Display rating
              this.props.updateCompleteRide(true, 'rider')
              this.props.updateCompleteRide(true, 'driver')

              // Reset state
              // this.setState({currentLocation: null})
              // this.setState({directions: null})
              // this.setState({wayPoints: null})
            }
          }
        }, 1500);
    }

    render() {
        return (
            <div>
                <div>
                    {/* {originMarker} */}
                    {/* {destinationMarker} */}
                    {this.state.currentLocation && (
                    <Marker
                        // label={this.props.index.toString()}
                        position={{
                        lat: this.state.currentLocation.lat,
                        lng: this.state.currentLocation.lng
                        }}
                        icon='https://i.imgur.com/RgjQOYM.png'
                    />
                    )}
                    {this.state.directions && (
                    <DirectionsRenderer
                        directions={this.state.directions}
                        options={{
                        polylineOptions: {
                            strokeColor: this.props.strokeColor,
                            strokeOpacity: 0.8,
                            strokeWeight: 4,
                            // visible: false
                        },
                        // preserveViewport: true,
                        suppressMarkers: true,
                        icon: { scale: 1 }
                        }}
                    />
                    )}
                </div>
            </div>
        )
    }
}
export default  DirectionRenderer

// Originally appeard in render of this class component
// let originMarker = null;
// let destinationMarker = null;
// if (this.state.directions && this.props.index) {
//   originMarker = (
//     <Marker
//       defaultLabel={this.props.index.toString()}
//       defaultIcon={null}
//       position={{
//         lat: parseFloat(this.props.from.lat),
//         lng: parseFloat(this.props.from.lng)
//       }}
//     />
//   );
//   destinationMarker = (
//     <Marker
//       label={this.props.index.toString()}
//       defaultIcon={null}
//       position={{
//         lat: parseFloat(this.props.to.lat),
//         lng: parseFloat(this.props.to.lng)
//       }}
//     />
//   );
// }