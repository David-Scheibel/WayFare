import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


const RouteAPI = "http://localhost:3000/routes"

export default function DriverModal(props) {

    const handleClick = () => {
        props.onHide()
        // activate ride:
        props.updateActivateRide(true)
        // Showbutton false, or turn off button
        props.updateRideToggle(false)


        // create Route CRUD piece
        const postObj = {
            pickup: props.MCstate.origin,
            drop_off: props.MCstate.destination,
            rider_id: props.MCstate.riderObj.id,      //make these dynamic at some point
            driver_id: props.MCstate.driverObj[0].id
        }

        fetch(RouteAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(postObj)
        })
            .then(r => r.json())
            .then(console.log("posted new obj"))
    }
    
    const handleClose = () => {
        props.onHide()
    }


    return (
        <div>
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered backdrop="static" parentSelector={()=> document.getElementById('driver_component')}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                       
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{textAlign: 'center'}}>
                        <h4>{`Take ${props.MCstate.riderName} to ${props.MCstate.destination}`}</h4>
                        <p>
                            This is your mission, should you choose to accept it.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClick}>Accept</Button>
                    <Button variant="danger" onClick={handleClose}>Decline</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
