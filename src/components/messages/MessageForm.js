import React, { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { MessageContext } from "./MessageProvider"
import "../bags/Bags.css"

export const MessageForm = ({ setDialog, messageId, setMessageId }) => {
    const { addMessage, updateMessage, getMessageById } = useContext(MessageContext)
    const { bagId } = useParams()

    const [ message, setMessage ] = useState({
        userId: 0,
        bagId: 0,
        body: ""
    })

    useEffect(() => {
        if (messageId) {
            getMessageById(messageId)
            .then(e => {
                setMessage(e)
            })
        }
    }, [messageId])

    const handleInputChange = e => {
        const newMessage = { ...message }
        newMessage[e.target.id] = e.target.value
        setMessage(newMessage)
    }

    const handleClickSubmit = e => {
        e.preventDefault()

        const currentUserId = parseInt(sessionStorage.getItem("itb_user"))

        if (messageId) {
            updateMessage({
                id: message.id,
                userId: currentUserId,
                bagId: message.bagId,
                body: message.body
            })
            .then(setMessage({
                userId: 0,
                bagId: 0,
                body: ""
            }))
            .then(() => {
                setDialog(false)
                setMessageId(0)
            })
        } else {
            addMessage({
                userId: currentUserId,
                bagId: parseInt(bagId),
                body: message.body
            })
            .then(setMessage({
                userId: 0,
                bagId: 0,
                body: ""
            }))
            .then(() => {
                setDialog(false)
            })
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
                    {messageId ? "Update comment" : "Add comment"}
                </button>
            </form>
        </>
    )
}