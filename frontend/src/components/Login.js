import { Redirect, Link } from "react-router-dom"
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
 
const LogIn = ({ updateRiderID }) => {

    const [valid, setValid] = useState(0)

    let logIn = (e) => {
        e.preventDefault()

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: e.target[0].value,
                password: e.target[1].value
            })
        })
        .then(res => res.json())
        .then(userInfo => {
            setValid(userInfo)
            localStorage.token = userInfo.token
            localStorage.riderID = userInfo.rider_id
            console.log(userInfo)
        })
    } 

    return(
        <div style={{height: '100vh', paddingTop: '5%'}}>
        
            <h2 className="" style={{paddingBottom: "5%", fontSize: '4em'}}>WayFare</h2>
            { Object.keys(valid).length > 1 ? <Redirect to='/wayfarer' /> : console.log('login didnt work') }
            <div className=''>
                <Form onSubmit={(e) =>  logIn(e)} style={{maxWidth: '300px', width: '50%', margin: 'auto'}}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    {/* <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
                    <Button variant="secondary" type="submit">
                        Log In
                    </Button>
                </Form>   
            </div>   
            
            <div style={{marginTop: '1%'}}>
                Don't have an account? 
                <Link to='/signup'><Button variant="secondary">Sign up</Button></Link>
            </div>

        </div>
    )

}

export default LogIn