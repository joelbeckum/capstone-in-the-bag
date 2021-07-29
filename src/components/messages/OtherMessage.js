import React from "react"
import "../bags/Bags.css"

export const OtherMessage = ({ message }) => {
    return (
        <div className="otherMessage">
            <div className="otherMessage__sender">
                {message.user.firstName} says:
            </div>
            <div className="otherMessage__body">
                {message.body}
            </div>
        </div>
    )
}