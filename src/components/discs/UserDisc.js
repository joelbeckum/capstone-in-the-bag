import React from "react"
import { useHistory } from "react-router-dom"
import "../bags/Bags.css"

export const UserDisc = ({ userDisc }) => {
    const history = useHistory()

    return (
        <div className="bagDisc" onClick={() => history.push(`/discs/${userDisc.id}`)}>
            <div className="bagDisc__name">{userDisc.name}</div>
        </div>
    )
}