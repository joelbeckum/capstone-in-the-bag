import React, { useState, useEffect, useContext } from "react"
import { useHistory, useParams } from "react-router-dom"
import { DiscContext } from "./DiscProvider"
import { UserDiscContext } from "./UserDiscProvider"
import "./Discs.css"

export const DiscForm = () => {
    const { discs, getDiscs, getDiscById } = useContext(DiscContext)
    const { userDiscs, getUserDiscById, addUserDisc } = useContext(UserDiscContext)
    const [ searchTerms, setSearchTerms ] = useState("")
    const { bagId } = useParams()
    const currentUserId = parseInt(sessionStorage.getItem("itb_user"))

    useEffect(() => {
        getDiscs()
    }, [])

    const [ userDisc, setUserDisc ] = useState({
        name: "",
        discId: 0,
        userId: 0
    })
    
    const selectedDisc = discs?.find(disc => disc.id === userDisc.discId)

    const handleInputChange = e => {
        const newUserDisc = {...userDisc}
        newUserDisc[e.target.id] = e.target.value
        setUserDisc(newUserDisc)
    }

    const handleEnteredText = e => {
        setSearchTerms(e.target.value)
    }

    const handleDiscClick = e => {
        const newUserDisc = {...userDisc}
        newUserDisc.discId = e.target.id
        setUserDisc(newUserDisc)
        setSearchTerms("")
    }

    console.log("rendering")
    let suggestionList
    let filteredDiscs
    
    if (searchTerms) {
        filteredDiscs = discs.filter(disc => disc.name?.toLowerCase().includes(searchTerms))
        suggestionList = (
            <div className="suggestion__wrapper">
                <ul className="suggestions">
                    {console.log(filteredDiscs)}
                    {
                        filteredDiscs?.map(disc => {
                            return <li className="suggestion" key={disc.id} id={disc.id} onClick={handleDiscClick}>
                                    {disc.name}
                                </li>
                        })
                    }
                </ul>
            </div>
        )
    }

    return (
        <>
            <div className="discSearch">
                <input type="text"
                       className="search-box"
                       id="discId"
                       value={searchTerms}
                       placeholder={selectedDisc ? `${selectedDisc.name}` : ""}
                       onChange={handleEnteredText} />
                {suggestionList}                
            </div>
        </>
    )
}