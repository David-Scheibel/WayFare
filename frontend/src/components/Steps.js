import React, { Component } from 'react'

class Steps extends Component {

    displaySteps = (steps) => (
        steps.map(elem => (
            <ul>{elem}</ul>
        ))
    )

    render() {
        return (
            <div>
                <div className='border border-dark rounded col' style={{margin: '0 10% 3% 10%', height: '80%', width: '80%', padding: '5% 0 0 0'}}>
                    <h1>Steps</h1>
                    {this.displaySteps(this.props.state.steps)}
                </div>
            </div>
        )
    }
}
export default Steps