import React from "react"
import { useHistory } from "react-router-dom"
import bagIcon from "../../icons/full-bag-gray.png"
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

    let otherUserNameString
    if (currentUserId !== bag.userId) {
        otherUserNameString = `${bag.user.firstName}'s bag`
    }



    return (
        <div className="bag" onClick={handleClickBag}>
            <div className="bag__content">
                <img src={bagIcon} alt="bag icon"/>
                <div className="bag__text">
                    {bag.name}
                    {otherUserNameString}
                </div>
            </div>
        </div>
    )
}