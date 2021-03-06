import React, { createContext, useState } from "react"

export const UserDiscContext = createContext()

export const UserDiscProvider = (props) => {
    const [ userDiscs, setUserDiscs ] = useState()

    const getUserDiscs = () => {
        return fetch("http://localhost:8088/userDiscs?_expand=bag")
        .then(res => res.json())
        .then(setUserDiscs)
    }

    const getUserDiscById = id => {
        return fetch(`http://localhost:8088/userDiscs/${id}`)
        .then(res => res.json())
    }

    const addUserDisc = userDiscObj => {
        return fetch("http://localhost:8088/userDiscs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDiscObj),
        }).then(getUserDiscs)
    }

    const updateUserDisc = userDisc => {
        return fetch(`http://localhost:8088/userDiscs/${userDisc.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDisc),
        }).then(getUserDiscs)
    }

    const removeUserDisc = id => {
        return fetch(`http://localhost:8088/userDiscs/${id}`, {
            method: "DELETE"
        }).then(getUserDiscs)
    }

    return (
        <UserDiscContext.Provider
            value={{
                userDiscs,
                getUserDiscs,
                getUserDiscById,
                addUserDisc,
                updateUserDisc,
                removeUserDisc
            }}
        >
            {props.children}
        </UserDiscContext.Provider>
    )
}