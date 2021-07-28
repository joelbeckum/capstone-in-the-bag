import React, { useContext } from "react"
import { MessageContext } from "./MessageProvider"
import "../bags/Bags.css"

export const Message = ({ message }) => {
    const { removeMessage } = useContext(MessageContext)
    
    return (
        <div className="message">
            <div className="message__sender">
                {message.user.firstName} says:
            </div>
            <div className="message__body">
                {message.body}
            </div>
            <div className="message__delete" onClick={() => removeMessage(message.id)}>
                <img src="https://via.placeholder.com/25x25" alt="placeholder"/>
            </div>
        </div>
    )
}