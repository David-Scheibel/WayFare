import { Redirect } from "react-router-dom"
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const SignUp = () => {

    const [valid, setValid] = useState(0)


    let signUp = (e) => {
        e.preventDefault()

        fetch("http://localhost:3000/riders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: e.target[0].value,
                name: e.target[1].value,
                password: e.target[2].value,
                rating: 0.000000001,
                rides_completed: 0
            })
        })
        .then(res => res.json())
        .then(res => {
            setValid(res)
            console.log(res)
        })
    }

    return(

        <div style={{height: '100vh', paddingTop: '5%'}}>
            {Object.keys(valid).length > 1 ? <Redirect to='/' /> : console.log('login didnt work')}
            <h2 className="" style={{paddingBottom: "5%", fontSize: '4em'}}>WayFare Signup</h2>
            <div className=''>
                <Form onSubmit={(e) =>  signUp(e)} style={{maxWidth: '300px', width: '50%', margin: 'auto'}}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    {/* <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
                    <Button variant="success" type="submit">
                        Sign Up
                    </Button>
                </Form>   
            </div>  
        </div>
    )
}

export default SignUp