import React from "react"
import { useHistory } from "react-router-dom"
import "./Bags.css"

export const Bag = ({ bag }) => {
    const history = useHistory()

    return (
        <div className="bag" onClick={() => history.push(`/bags/${bag.id}`)}>
            <img src="https://via.placeholder.com/115x130" alt="placeholder"/>
            {bag.name}
        </div>
    )
}