import React, { Component } from 'react'
import GPSContainer from '../containers/GPSContainer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import RiderInfo from './RiderInfo'
import Stars from './Stars'

class Rider extends Component {

    render() {

        return (
            <div className='border border-dark rounded col bg-white' style={{margin: '2%', marginLeft: '10%', height: '100%', padding: '0'}}>

                <div className='row'>
                    {/* Title */}
                    <h1 className='col'>Rider</h1>
                    <div className='col' style={{margin: 'auto'}}>
                        {this.props.MCstate.riderObj.name ? this.props.MCstate.riderObj.name : "Billy Bob"} - {this.props.MCstate.riderObj.rating ? this.props.MCstate.riderObj.rating.toFixed(2) : console.log()}★
                    </div>
                </div>

                {/* GPS Container */}
                <GPSContainer 
                    who={this.props.who} 
                    updateResult={this.props.updateResult} 
                    MCstate={this.props.MCstate} 
                    updateActivateRide={this.props.updateActivateRide} 
                    updateCompleteRide={this.props.updateCompleteRide} 
                    updateRideToggle={this.props.updateRideToggle}
                />

                <div className='row'>
                    <div className='col'>Your Driver is: {this.props.MCstate.driverName} - {this.props.MCstate.driverObj[0] ? this.props.MCstate.driverObj[0].rating.toFixed(2) : console.log()}★</div>
                </div>
                
                {/* Destination form */}
                <Form onSubmit={(event)=> this.props.updateDestination(event)}>
                    <Form.Group>
                        <Form.Row>                    
                            {this.props.MCstate.startRideToggle ? 
                                <Form.Control 
                                    id='originInput' 
                                    type="text" 
                                    placeholder="Pick Up" 
                                    style={{ 
                                        width: '60%', 
                                        margin: 'auto', 
                                        marginRight: '0' 
                                    }}
                                /> : 
                                <Form.Control 
                                    disabled 
                                    id='originInput' 
                                    type="text" 
                                    placeholder="Pick Up" 
                                    style={{ 
                                        width: '60%', 
                                        margin: 'auto', 
                                        marginRight: '0' 
                                    }}
                                /> 
                            }
                            {this.props.MCstate.startRideToggle ? 
                                <Button 
                                    variant="dark" 
                                    type="submit" 
                                    style={{ 
                                        width: '20%', 
                                        margin: 'auto' 
                                    }}
                                >Submit</Button> : 
                                <Button 
                                    disabled 
                                    variant="dark" 
                                    type="submit" 
                                    style={{ 
                                        width: '20%', 
                                        margin: 'auto' 
                                    }}
                                >Submit</Button> 
                            }
                        </Form.Row>
                        <Form.Row>                    
                            {this.props.MCstate.startRideToggle ? 
                                <Form.Control 
                                    id='destinationInput' 
                                    type="text" 
                                    placeholder="Drop Off" 
                                    style={{
                                        width: '60%', 
                                        marginLeft: '6.65%', 
                                        marginTop: '0.5%'
                                    }}
                                /> : 
                                <Form.Control 
                                    disabled 
                                    id='destinationInput' 
                                    type="text" 
                                    placeholder="Drop Off" 
                                    style={{
                                        width: '60%', 
                                        marginLeft: '6.65%', 
                                        marginTop: '0.5%'
                                    }}
                                /> 
                            }
                        </Form.Row>
                    </Form.Group>
                </Form>
                
                <div className='row'>
                    <div name="ride_info" className='col' style={{margin: 'auto'}}>
                        <RiderInfo MCstate={this.props.MCstate}/>
                    </div>
                    <div className='col' style={{margin: 'auto'}}>
                        { this.props.MCstate.completeRide[0] ? 
                            <Stars 
                                updateRating={this.props.updateRating} 
                                who='rider' 
                                updateCompleteRide={this.props.updateCompleteRide} 
                                updateRideToggle={this.props.updateRideToggle} 
                                driverSwitch={this.props.MCstate.driverSwitch} 
                                startRideToggle={this.props.MCstate.startRideToggle} 
                                riderObj={this.props.MCstate.riderObj}
                            /> : 
                           this.props.MCstate.rating[0] == null ? console.log() : this.props.MCstate.rating[0] + " Star Rating, Thanks!"
                        }                  
                    </div>
                </div>
            </div>
        )
    }
}
export default Rider