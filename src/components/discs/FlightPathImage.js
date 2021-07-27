import React from "react"
import "./Discs.css"

export const FlightPathImage = ({ disc }) => {
    return (
        <img src={disc.flightPathURL} alt={`flight path for ${disc.name}`}/>
    )
}