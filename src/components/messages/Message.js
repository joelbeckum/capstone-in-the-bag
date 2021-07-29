import React, { useContext } from "react"
import { MessageContext } from "./MessageProvider"
import editIcon from "../../icons/edit-name-gray.png"
import "../bags/Bags.css"

export const Message = ({ message, setDialog, setMessageId }) => {
    const { removeMessage } = useContext(MessageContext)

    const handleEditClick = () => {
        setDialog(true)
        setMessageId(message.id)
    }
    
    return (
        <div className="message">
            <div className="message__sender">
                {message.user.firstName} says:
            </div>
            <div className="message__body">
                {message.body}
            </div>
            <div className="message__edit" onClick={handleEditClick}>
            <img src={editIcon} alt="edit icon"/>
            </div>
            <div className="message__delete" onClick={() => removeMessage(message.id)}>
                <img src="https://via.placeholder.com/25x25" alt="placeholder"/>
            </div>
        </div>
    )
}