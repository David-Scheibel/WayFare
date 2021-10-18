import ReactStars from "react-rating-stars-component";
import React, { Component } from 'react'


const RiderAPI = "http://localhost:3000/riders/"
const DriverAPI = "http://localhost:3000/drivers/"

class Stars extends Component {

    ratingChanged = (newRating) => {
        console.log(newRating)

        // Update rating
        this.props.updateRating(newRating, this.props.who)
        // Make rating hidden & Reset completeRide to false
        this.props.who == 'rider'? this.props.updateCompleteRide(false, this.props.who) : this.props.updateCompleteRide(false, this.props.who)

        // Turn showRideToggle button back on
        this.props.who == 'driver'? this.props.updateDriverSwitch(true) : this.props.updateRideToggle(true)

        // Potentially add a hard page refresh (temporary bug fix)
        // Change this so that only when both ratings are selected, we hard refresh

        // If startRideToggle is true && driverswitch is true THEN refresh
        // this.props.startRideToggle && this.props.driverSwitch? console.log(window.location.reload()) : console.log()

        // reset values, driver switch to false

        // Future patch request here to update our database
        // As well as all other info either Rider or Driver


        // create Route CRUD piece for Rider
        if (this.props.who == 'rider') {
        
            const riderID = this.props.riderObj.id
            const newRidesCompleted = this.props.riderObj.rides_completed + 1
            const newStateRating = (this.props.riderObj.rating * this.props.riderObj.rides_completed + newRating) / newRidesCompleted

            const patchObj = {
                rating: newStateRating,
                rides_completed: newRidesCompleted
                }
        
                fetch(RiderAPI+riderID, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(patchObj)
                })
                    .then(r => r.json())
                    .then(console.log("updated Rider rating"))
        } 

        // create Route CRUD piece for Driver
        if (this.props.who == 'driver') {
        
            const driverID = this.props.driverObj[0].id
            const newRidesCompleted = this.props.driverObj[0].rides_completed + 1
            const newStateRating = (this.props.driverObj[0].rating * this.props.driverObj[0].rides_completed + newRating) / newRidesCompleted

            const patchObj = {
                rating: newStateRating,
                rides_completed: newRidesCompleted
                }
        
                fetch(DriverAPI+driverID, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(patchObj)
                })
                    .then(r => r.json())
                    .then(console.log("updated Driver rating"))
        } 
    }


    render() {
        return (
            <React.Fragment>
                <ReactStars
                    emptyIcon={<img id='pixel' src="https://i.imgur.com/oiBJgWt.png" alt="Red car" width="25px" height="25px"/>}
                    filledIcon={<img id='pixel' src="https://i.imgur.com/RgjQOYM.png" alt="Red car" width="25px" height="25px"/>}
                    count={5}
                    onChange={this.ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                />
            </React.Fragment>
        )
    }
}
export default Stars