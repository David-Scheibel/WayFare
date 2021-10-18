import React, { Component } from 'react'
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom'
import Driver from '../components/Driver'
import Rider from '../components/Rider'
import Steps from '../components/Steps'

const RiderAPI = "http://localhost:3000/riders"
const DriverAPI = "http://localhost:3000/drivers"

class MainContainer extends Component {

    state = {
        driverObj: {},
        riderObj: {},

        steps: [],
        result: [],
        origin: '7101 Democracy Blvd, Bethesda MD',
        destination: '4866 Cordell Ave, Bethesda MD',
        driverName: "Shaquille O'Neal",
        riderName: 'Seth McLovin',

        // Show / hide
        modalShow: false,
        activateRide: false,
        completeRide: [false, false],                   // Displays rating for Rider & Driver
        startRideToggle: true,                          // True, button shows
        driverSwitch: false,

        rating: [null,null],                            // [rider, driver]
    }

    updateResult = (result, who) => {
        if(Object.keys(result).length > 0) {
            if(result.status == 'OK') {
                console.log(result.status)
            // update result in Direction Renderer
                const steps = result.routes[0].legs[0].steps
                let arr = []
                steps.map(elem => arr.push(elem.instructions))
                // who == 'rider'? console.log(arr) : console.log() // console.log(this.props.who, result.routes[0].legs[0].steps)

                this.setState({steps: arr})
                this.setState({ result })
            }
        }
    }

    updateDestination = (e) => {
        e.preventDefault()
        const inputDest = document.getElementById('destinationInput').value
        const inputOrigin = document.getElementById('originInput').value

        // Set destination
        inputDest.length > 0 ? this.setState({destination: inputDest}) : console.log('Please enter destination')

        // Set origin
        inputOrigin.length > 0 ? this.setState({origin: inputOrigin}) : console.log('Please enter a pickup')

        // Ask driver if they can take me home
        this.updateModalShow(true)
    }

    updateModalShow = (bool) => {
        this.setState({modalShow: bool})
    }

    updateActivateRide = (bool) => {
        console.log('updated Ride status')
        this.setState({activateRide: bool})
    }

    updateRating = (rating, id) => {
        id == 'rider' ? this.setState({
                           rating: [rating, this.state.rating[1]]
                        }) : 
                        this.setState({
                           rating: [this.state.rating[0], rating]
                        })
    }

    updateCompleteRide = (bool, who) => {
       who == 'rider' ? this.setState({
                            completeRide: [bool, this.state.completeRide[1]]
                        }) : 
                        this.setState({
                            completeRide: [this.state.completeRide[0], bool]
                        })
    }

    updateRideToggle = (bool) => {
        this.setState({startRideToggle: bool}, () => {
            this.state.startRideToggle && this.state.driverSwitch ? 
                console.log(window.location.reload()) : console.log()
        })
    }

    updateDriverSwitch = (bool) => {
        this.setState({driverSwitch: bool}, () => {
            this.state.startRideToggle && this.state.driverSwitch ? 
                console.log(window.location.reload()) : console.log()
        })
    }

    componentDidMount = () => {
        // Let's fetch logged in person's id
        fetch(RiderAPI, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(res => res.json())
            .then(res => {
              
                const riderIndex = res.map(elem => elem.id).findIndex(elem => elem == localStorage.riderID)
                const riderObj = res[riderIndex]

                console.log(riderIndex,riderObj)
                this.setState({ riderName: riderObj.name })
                this.setState({ riderObj: riderObj })
            })
           
        fetch(DriverAPI)
            .then(r => r.json())
            .then(r => {
                // console.log(r[0].name)
                this.setState({ driverObj: r })
                this.setState({ driverName: r[0].name })
            })
    }

    render() {

        return (
            <React.Fragment>
                <div className="bg-dark" style={{paddingTop: "5%"}}>
                    <img src="https://i.imgur.com/QC0Mduf.png"/>
                </div>
            
                <div className='row align-items-center bg-dark' style={{height: '800px', padding: '5%'}}>
                    <Rider 
                        who='rider' 
                        updateResult={this.updateResult} 
                        MCstate={this.state} 
                        updateDestination={this.updateDestination} 
                        riderName={this.state.riderName} 
                        updateActivateRide={this.updateActivateRide} 
                        updateRating={this.updateRating} 
                        updateCompleteRide={this.updateCompleteRide} 
                        updateRideToggle={this.updateRideToggle}
                    />
                    <Driver 
                        who='driver' 
                        updateResult={this.updateResult} 
                        MCstate={this.state} 
                        driverName={this.state.driverName} 
                        updateModalShow={this.updateModalShow} 
                        updateActivateRide={this.updateActivateRide} 
                        updateRating={this.updateRating} 
                        updateCompleteRide={this.updateCompleteRide} 
                        updateRideToggle={this.updateRideToggle} 
                        updateDriverSwitch={this.updateDriverSwitch}
                    /> 
                </div>
                
                <div className='bg-dark row align-items-center' style={{height: '500px', padding: '5%'}}>
                    {/* <Steps state={this.state}/> */}
                </div>
            </React.Fragment>
        )
    }
}
export default MainContainer