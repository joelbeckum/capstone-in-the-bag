import React from "react"
import { useHistory } from "react-router-dom"
import "../bags/Bags.css"

export const UserDisc = ({ userDisc }) => {
    const history = useHistory()
    const currentUserId = parseInt(sessionStorage.getItem("itb_user"))

    const handleClickDisc = () => {
        if (currentUserId === userDisc.bag.userId) {
            history.push(`/discs/edit/${userDisc.id}`)
        } else {
            history.push(`/otherDiscs/${userDisc.id}`)
        }
    }

    return (
        <div className="bagDisc" onClick={handleClickDisc}>
            <div className="bagDisc__name">{userDisc.name}</div>
        </div>
    )
}