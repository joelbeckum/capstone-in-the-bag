import React from "react"
import "./Bags.css"

export const Bag = ({ bag }) => {
    return (
        <div className="bag">
            <img src="https://via.placeholder.com/115x130" alt="placeholder image"/>
            {bag.name}
        </div>
    )
}