import React, { createContext, useState } from "react"

export const DiscContext = createContext()

export const DiscProvider = (props) => {
    const [ discs, setDiscs ] = useState()
    // const [ searchTerms, setSearchTerms ] = useState("")

    const getDiscs = () => {
        return fetch("http://localhost:5000/discs")
        .then(res => res.json())
        .then(setDiscs)
    }

    const getDiscById = id => {
        return fetch(`http://localhost:5000/discs/${id}`)
        .then(res => res.json())
    }

    return (
        <DiscContext.Provider
            value={{
                discs,
                getDiscs,
                getDiscById,
            }}
        >
            {props.children}
        </DiscContext.Provider>
    )
}