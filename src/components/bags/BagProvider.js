import React, { createContext, useState } from "react"

export const BagContext = createContext()

export const BagProvider = (props) => {
    const [ bags, setBags ] = useState()

    const getBags = () => {
        return fetch("http://localhost:8088/bags")
        .then(response => response.json())
        .then(setBags)
    }

    return (
        <BagContext.Provider
            value={{
                bags,
                getBags
            }}
        >
            {props.children}
        </BagContext.Provider>
    )
}