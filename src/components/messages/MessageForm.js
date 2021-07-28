import React, { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { MessageContext } from "./MessageProvider"
import "../bags/Bags.css"

export const MessageForm = ({ setDialog }) => {
    const { addMessage } = useContext(MessageContext)
    const { bagId } = useParams()

    const [ message, setMessage ] = useState({
        senderId: 0,
        bagId: 0,
        body: ""
    })

    const handleInputChange = e => {
        const newMessage = { ...message }
        newMessage[e.target.id] = e.target.value
        setMessage(newMessage)
    }

    const handleClickSubmit = e => {
        e.preventDefault()

        const currentUserId = parseInt(sessionStorage.getItem("itb_user"))

        if (message.body) {
            const newMessage = {
                senderId: currentUserId,
                bagId: parseInt(bagId),
                body: message.body
            }

            addMessage(newMessage)
            .then(setMessage({
                senderId: 0,
                bagId: 0,
                body: ""
            }))
            .then(setDialog(false))
        }
    }

    return (
        <>
            <form className="messageForm">
                <textarea type="text"
                          className="form-control" 
                          placeholder="Comment on this bag"
                          id="body" 
                          value={message.body} 
                          onChange={handleInputChange} />
                <button className="message__submit"
                        onClick={handleClickSubmit}>
                    Add Comment
                </button>
            </form>
        </>
    )
}