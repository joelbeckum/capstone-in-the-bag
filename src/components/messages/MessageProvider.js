import React, { createContext, useState } from "react"

export const MessageContext = createContext()

export const MessageProvider = (props) => {
    const [ messages, setMessages ] = useState()

    const getMessages = () => {
        return fetch("http://localhost:8088/messages")
        .then(response => response.json())
        .then(setMessages)
    }

    return (
        <MessageContext.Provider
            value={{
                messages,
                getMessages
            }}
        >
            {props.children}
        </MessageContext.Provider>
    )
}