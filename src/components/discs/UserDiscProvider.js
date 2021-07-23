import React, { createContext, useState } from "react"

export const UserDiscContext = createContext()

export const UserDiscProvider = (props) => {
    const [ userDiscs, setUserDiscs ] = useState()

    const getUserDiscs = () => {
        return fetch("http://localhost:8088/userDiscs")
        .then(response => response.json())
        .then(setUserDiscs)
    }

    return (
        <UserDiscContext.Provider
            value={{
                userDiscs,
                getUserDiscs
            }}
        >
            {props.children}
        </UserDiscContext.Provider>
    )
}