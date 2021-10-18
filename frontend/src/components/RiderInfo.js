import React from 'react'

export default function RiderInfo({ MCstate }) {
    return (
        <div>
            {Object.keys(MCstate.result).length>0? 
                    <div name="info" style={{textAlign: 'left', paddingLeft: '2%'}}>
                        <h6>Distance left: {(MCstate.result.routes[0].legs[0].distance.text)}</h6>
                        <h6>Arrival time: {(MCstate.result.routes[0].legs[0].duration.text)}</h6>
                        <h6>Fare: ${((5.5+ +(MCstate.result.routes[0].legs[0].distance.text.split(" ")[0])*1.5)*1.06).toFixed(2)}</h6>
                    </div> :
                    console.log()}
        </div>
    )
}
