import React, { createContext, useState } from "react"

export const BagContext = createContext()

export const BagProvider = (props) => {
    const [ bags, setBags ] = useState()

    const getBags = () => {
        return fetch("http://localhost:8088/bags")
        .then(response => response.json())
        .then(setBags)
    }

    const getBagById = id => {
        return fetch(`http://localhost:8088/bags/${id}`)
        .then(res => res.json())
    }

    return (
        <BagContext.Provider
            value={{
                bags,
                getBags,
                getBagById
            }}
        >
            {props.children}
        </BagContext.Provider>
    )
}