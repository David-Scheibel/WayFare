import React, { Component } from 'react'
import GPSContainer from '../containers/GPSContainer'
import DriverModal from './DriverModal'
import Stars from './Stars'

class Driver extends Component {

    state = {
        activateRide: false
    }

    render() {
        return (
            <div id="driver_component" className='border border-dark rounded col bg-white' style={{margin: '2%', marginRight: '10%', height: '100%', padding: '0'}}>

                <div className='row'>
                    {/* Title */}
                    <h1 className='col'>Driver</h1>
                    <div className='col' style={{margin: 'auto'}}>
                        {this.props.driverName} - {this.props.MCstate.driverObj[0] ? this.props.MCstate.driverObj[0].rating.toFixed(2) : console.log()}★
                    </div>
                </div>

                <GPSContainer 
                    who={this.props.who} 
                    updateResult={this.props.updateResult} 
                    MCstate={this.props.MCstate} 
                    updateActivateRide={this.props.updateActivateRide} 
                    updateCompleteRide={this.props.updateCompleteRide} 
                    updat
                    eRideToggle={this.props.updateRideToggle}
                />
                 <div className='row'>
                    <div className='col'>Your Rider is: {this.props.MCstate.riderName} - {this.props.MCstate.riderObj.rating ? this.props.MCstate.riderObj.rating.toFixed(2) : console.log()}★</div>
                </div>

                <div name="info" style={{textAlign: 'left', paddingLeft: '2%'}}>
                    <h6>Directions:</h6>
                </div>

                <div class="row">
                    <div class="col">
                        {this.props.MCstate.steps.map(elem => (<ul style={{fontSize: '0.5em', margin: '0'}}>{elem}</ul>))}
                    </div>
                    <div class="col">
                        { this.props.MCstate.completeRide[1] ? 
                            <Stars 
                                updateRating={this.props.updateRating} 
                                who='driver' 
                                updateCompleteRide={this.props.updateCompleteRide} 
                                updateRideToggle={this.props.updateRideToggle} 
                                updateDriverSwitch={this.props.updateDriverSwitch} 
                                driverSwitch={this.props.MCstate.driverSwitch} 
                                startRideToggle={this.props.MCstate.startRideToggle} 
                                driverObj={this.props.MCstate.driverObj}
                            /> : 
                                this.props.MCstate.rating[0] == null ? console.log() : this.props.MCstate.rating[1] + " Star Rating, Thanks!" 
                        }                  
                    </div>
                </div>

                <DriverModal 
                    show={this.props.MCstate.modalShow} 
                    onHide={() => this.props.updateModalShow(false)} 
                    MCstate={this.props.MCstate} 
                    updateActivateRide={this.props.updateActivateRide} 
                    updateRideToggle={this.props.updateRideToggle}
                />

            </div>
        )
    }
}
export default Driver