import React, { useContext } from "react"
import { MessageContext } from "./MessageProvider"
import editIcon from "../../icons/edit-name-gray.png"
import removeIcon from "../../icons/remove-gray.png"
import "../bags/Bags.css"

export const Message = ({ message, setDialog, setMessageId }) => {
    const { removeMessage } = useContext(MessageContext)
    const currentUserId = parseInt(sessionStorage.getItem("itb_user"))

    const handleEditClick = () => {
        setDialog(true)
        setMessageId(message.id)
    }

    let userButtons
    if (currentUserId === message.userId) {
        userButtons = (
            <>
               <div className="messageButtons">
                    <div className="messageButton__edit" onClick={handleEditClick}>
                        <img src={editIcon} alt="edit icon"/>
                    </div>
                    <div className="messageButton__delete" onClick={() => removeMessage(message.id)}>
                        <img src={removeIcon} alt="remove icon"/>
                    </div> 
               </div>
            </>
        )
    }
    
    return (
        <div className="message">
            <div className="message__content">
                {userButtons}
                <div className="message__sender">
                    {message.user.firstName} says:
                </div>
                <div className="message__body">
                    {message.body}
                </div>
            </div>
        </div>
    )
}