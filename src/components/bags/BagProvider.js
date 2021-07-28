import React, { createContext, useState } from "react"

export const BagContext = createContext()

export const BagProvider = (props) => {
    const [ bags, setBags ] = useState()

    const getBags = () => {
        return fetch("http://localhost:8088/bags?_expand=user")
        .then(response => response.json())
        .then(setBags)
    }

    const getBagById = id => {
        return fetch(`http://localhost:8088/bags/${id}?_expand=user`)
        .then(res => res.json())
    }

    const addBag = bagObj => {
        return fetch("http://localhost:8088/bags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bagObj),
        }).then(getBags)
    }

    const updateBag = bag => {
        return fetch(`http://localhost:8088/bags/${bag.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bag),
        }).then(getBags)
    }

    const removeBag = id => {
        return fetch(`http://localhost:8088/bags/${id}`, {
            method: "DELETE"
        }).then(getBags)
    }

    return (
        <BagContext.Provider
            value={{
                bags,
                getBags,
                getBagById,
                addBag,
                updateBag,
                removeBag
            }}
        >
            {props.children}
        </BagContext.Provider>
    )
}