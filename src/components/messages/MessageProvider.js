import React, { createContext, useState } from "react"

export const MessageContext = createContext()

export const MessageProvider = (props) => {
    const [ messages, setMessages ] = useState()

    const getMessages = () => {
        return fetch("http://localhost:8088/messages?_expand=user")
        .then(response => response.json())
        .then(setMessages)
    }

    const addMessage = messageObj => {
        return fetch("http://localhost:8088/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(messageObj),
        }).then(getMessages)
    }

    const removeMessage = id => {
        return fetch(`http://localhost:8088/messages/${id}`, {
            method: "DELETE"
        }).then(getMessages)
    }

    return (
        <MessageContext.Provider
            value={{
                messages,
                getMessages,
                addMessage,
                removeMessage
            }}
        >
            {props.children}
        </MessageContext.Provider>
    )
}