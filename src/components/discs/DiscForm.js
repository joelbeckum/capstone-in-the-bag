import React, { useState, useEffect, useContext } from "react"
import { useHistory, useParams } from "react-router-dom"
import { DiscContext } from "./DiscProvider"
import { UserDiscContext } from "./UserDiscProvider"
import { FlightPathImage } from "./FlightPathImage"
import "./Discs.css"

export const DiscForm = () => {
    const { discs, getDiscs, getDiscById } = useContext(DiscContext)
    const { userDiscs, getUserDiscById, addUserDisc, updateUserDisc, removeUserDisc } = useContext(UserDiscContext)
    const history = useHistory()
    const [ isLoading, setIsLoading ] = useState(true)
    const [ searchTerms, setSearchTerms ] = useState("")
    // const [ pendingDisc, setPendingDisc ] = useState({})
    const { bagId } = useParams()
    const { userDiscId } = useParams()

    useEffect(() => {
        getDiscs()
    }, [])

    useEffect(() => {
        if (userDiscId) {
            getUserDiscById(userDiscId).then(e => {
                setUserDisc(e)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [])

    const [ userDisc, setUserDisc ] = useState({
        name: "",
        discId: 0,
        userId: 0
    })

    let pendingDisc = discs?.find(disc => disc.id === userDisc.discId)
    
    const handleInputChange = e => {
        const newUserDisc = {...userDisc}
        newUserDisc[e.target.id] = e.target.value
        setUserDisc(newUserDisc)
    }

    const handleEnteredSearchTerms = e => {
        setSearchTerms(e.target.value)
    }

    const handleDiscClick = e => {
        const newUserDisc = {...userDisc}
        pendingDisc = discs?.find(disc => disc.id === e.target.id)
        
        newUserDisc.discId = e.target.id
        setUserDisc(newUserDisc)

        setSearchTerms("")
    }

    const handleClickSaveDisc = e => {
        e.preventDefault()

        const currentBagId = parseInt(bagId)

        setIsLoading(true)
        if (userDiscId) {
            console.log(bagId)
            updateUserDisc({
                id: userDisc.id,
                name: userDisc.name,
                bagId: userDisc.bagId,
                discId: userDisc.discId
            }).then(() => history.push(`/bags/${userDisc.bagId}`))
        } else {
            const newUserDisc = {
                name: userDisc.name,
                bagId: currentBagId,
                discId: userDisc.discId
            }

            addUserDisc(newUserDisc)
            .then(() => history.push(`/bags/${bagId}`))
        }
    }

    const handleClickDeleteDisc = e => {
        e.preventDefault()
        removeUserDisc(userDiscId)
        .then(history.push(`/bags/${userDisc.bagId}`))
    }

    let variableButton
    if (userDiscId) {
        variableButton = (
            <div className="button disc__delete" onClick={handleClickDeleteDisc}>
                    <img src="https://via.placeholder.com/115x130" alt="placeholder"/>
                    Remove Disc from Bag
                </div>
        )
    } else {
        variableButton = (
            <div className="button disc__return" onClick={() => history.push("/")}>
                    <img src="https://via.placeholder.com/115x130" alt="placeholder"/>
                    Back to Bags
                </div>
        )
    }

    console.log("rendering")
    let suggestionList
    let filteredDiscs
    let flightPathImage
    
    if (searchTerms) {
        filteredDiscs = discs.filter(disc => disc.name?.toLowerCase().includes(searchTerms))
        suggestionList = (
            <div className="suggestion__wrapper">
                <ul className="suggestions">
                    {console.log(filteredDiscs)}
                    {
                        filteredDiscs?.map(disc => {
                            return <li className="suggestion" 
                                       key={disc.id} 
                                       id={disc.id} 
                                       onClick={handleDiscClick}>
                                    {disc.name}
                                </li>
                        })
                    }
                </ul>
            </div>
        )
    }

    if (pendingDisc?.id) {
        flightPathImage = (
            <>
                <h3 className="discImage__title">{pendingDisc?.name}</h3>
                <div className="discImage__type">Type: {pendingDisc?.discType}</div>
                <div className="discImage">
                    <FlightPathImage key={pendingDisc?.id} disc={pendingDisc} />
                </div>
            </>
        )
    }

    return (
        <>
            <div className="discForm__wrapper">
                <div className="discForm__inputWrapper">
                    <form className="discForm">
                        <h3 className="discForm__title">{userDiscId ? "Edit Disc" : "New Disc"}</h3>
                        <div className="discForm__search">
                            <input type="text"
                                className="search-box"
                                id="discId"
                                autoComplete="off"
                                value={searchTerms}
                                placeholder={pendingDisc ? `${pendingDisc.name}` : ""}
                                onChange={handleEnteredSearchTerms} />
                            {suggestionList}                
                        </div>
                        <div className="discForm__name">
                            <input type="text"
                                autoComplete="off"
                                id="name"
                                value={userDisc.name}
                                placeholder="Enter a name for your disc"
                                onChange={handleInputChange} />
                        </div>
                    </form>
                </div>
                <div className="discForm__imageWrapper">
                    {flightPathImage}
                </div>
            </div>
            <div className="buttons__wrapper">
                <div className="button disc__save" onClick={handleClickSaveDisc}>
                    <img src="https://via.placeholder.com/115x130" alt="placeholder"/>
                    {userDiscId ? "Save Changes" : "Add Disc"}
                </div>
                {variableButton}
            </div>
        </>
    )
}