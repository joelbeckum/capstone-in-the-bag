import React from "react"
import { useHistory } from "react-router-dom"
import "./Bags.css"

export const Bag = ({ bag }) => {
    const history = useHistory()
    const currentUserId = parseInt(sessionStorage.getItem("itb_user"))

    const handleClickBag = () => {
        if (currentUserId === bag.userId) {
            history.push(`/bags/${bag.id}`)
        } else {
            history.push(`/otherBags/${bag.id}`)
        }
    }

    return (
        <div className="bag" onClick={handleClickBag}>
            <img src="https://via.placeholder.com/115x130" alt="placeholder"/>
            {bag.name}
        </div>
    )
}