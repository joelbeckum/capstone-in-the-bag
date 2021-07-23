import React, { createContext, useState } from "react"

export const DiscContext = createContext()

export const DiscProvider = (props) => {
    const [ discs, setDiscs ] = useState()

    const getDiscs = () => {
        return fetch("http://localhost:5000/discs")
        .then(response => response.json())
        .then(setDiscs)
    }

    return (
        <DiscContext.Provider
            value={{
                discs,
                getDiscs
            }}
        >
            {props.children}
        </DiscContext.Provider>
    )
}