import React from "react"
import "../bags/Bags.css"

export const Message = ({ message }) => {
    
    
    return (
        <div className="message">
            <div className="message__sender">
                {message.user.firstName} says:
            </div>
            <div className="message__body">
                {message.body}
            </div>
        </div>
    )
}