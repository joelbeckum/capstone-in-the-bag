import React, { useState, useEffect, useContext } from "react"
import { useHistory, useParams } from "react-router-dom"
import { DiscContext } from "./DiscProvider"
import { UserDiscContext } from "./UserDiscProvider"
import "./Discs.css"

export const DiscForm = () => {
    const { discs, getDiscs, getDiscById } = useContext(DiscContext)
    const { userDiscs, getUserDiscById, addUserDisc } = useContext(UserDiscContext)
    const [ filteredDiscs, setFilteredDiscs ] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")
    const [ enteredText, setEnteredText ] = useState("")
    const { bagId } = useParams()
    const currentUserId = parseInt(sessionStorage.getItem("itb_user"))

    useEffect(() => {
        getDiscs()
    }, [])

    useEffect(() => {
        if (searchTerms) {
            const subset = discs.filter(disc => disc.Name?.toLowerCase().includes(searchTerms))
            setFilteredDiscs(subset)
        } else {
            setFilteredDiscs(discs)
        }
    }, [searchTerms])

    const [ userDisc, setUserDisc ] = useState({
        name: "",
        discId: 0,
        userId: 0
    })
    
    const selectedDisc = discs?.find(disc => disc.Id === userDisc.discId)

    const handleInputChange = e => {
        const newUserDisc = {...userDisc}
        newUserDisc[e.target.id] = e.target.value
        setUserDisc(newUserDisc)
    }

    const handleEnteredText = e => {
        setEnteredText(e.target.value)
        setSearchTerms(e.target.value)
    }

    const handleDiscClick = e => {
        const newUserDisc = {...userDisc}
        newUserDisc.discId = e.target.id
        setUserDisc(newUserDisc)
        setSearchTerms("")
        setEnteredText("")
    }
    console.log("rendering")
    let suggestionList
    if (searchTerms) {
        suggestionList = (
            <ul className="suggestions">
                {console.log(filteredDiscs)}
                {
                    filteredDiscs?.map(disc => {
                        return <li className="suggestion" key={disc.Id} id={disc.Id} onClick={handleDiscClick}>
                                {disc.Name}
                            </li>
                    })
                }
            </ul>
        )
    }

    return (
        <>
            <div className="discSearch">
                <input type="text"
                       className="search-box"
                       id="discId"
                       value={enteredText}
                       placeholder={selectedDisc ? `${selectedDisc.Name}` : ""}
                       onChange={handleEnteredText} />
                {suggestionList}                
            </div>
        </>
    )
}