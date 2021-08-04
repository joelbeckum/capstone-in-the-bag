import React from "react"
import { useHistory } from "react-router-dom"
import discIcon from "../../icons/disc-icon-gray.png"
import "../bags/Bags.css"

export const UserDisc = ({ userDisc, discs }) => {
    const history = useHistory()
    const currentUserId = parseInt(sessionStorage.getItem("itb_user"))
    const disc = discs?.find(disc => disc.id === userDisc.discId)

    const handleClickDisc = () => {
        if (currentUserId === userDisc.bag.userId) {
            history.push(`/discs/edit/${userDisc.id}`)
        } else {
            history.push(`/otherDiscs/${userDisc.id}`)
        }
    }

    return (
        <div className="bagDisc" onClick={handleClickDisc}>
            <img src={discIcon} alt="disc icon"/>
            <div className="bagDisc__text">
                <div className="bagDisc__type"><strong>Mold: </strong>{disc?.name}</div>
                <div className="bagDisc__name"><strong>Name: </strong>{userDisc.name}</div>
            </div>
        </div>
    )
}