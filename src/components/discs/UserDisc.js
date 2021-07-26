import React from "react"
import "../bags/Bags.css"

export const UserDisc = ({ userDisc }) => {
    return (
        <div className="bagDisc">
            {console.log(userDisc.name)}
            <div className="bagDisc__name">{userDisc.name}</div>
        </div>
    )
}