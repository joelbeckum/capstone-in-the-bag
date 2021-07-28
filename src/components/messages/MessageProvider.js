import React, { createContext, useState } from "react"

export const MessageContext = createContext()

export const MessageProvider = (props) => {
    const [ messages, setMessages ] = useState()

    const getMessages = () => {
        return fetch("http://localhost:8088/messages?_expand=user")
        .then(response => response.json())
        .then(setMessages)
    }

    const getMessageById = id => {
        return fetch(`http://localhost:8088/messages/${id}`)
        .then(res => res.json())
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

    const updateMessage = message => {
        return fetch(`http://localhost:8088/messages/${message.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
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
                removeMessage,
                updateMessage,
                getMessageById
            }}
        >
            {props.children}
        </MessageContext.Provider>
    )
}