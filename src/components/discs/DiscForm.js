import React, { useState, useEffect, useContext } from "react"
import { useHistory, useParams } from "react-router-dom"
import { DiscContext } from "./DiscProvider"
import { UserDiscContext } from "./UserDiscProvider"
import { FlightPathImage } from "./FlightPathImage"
import discIcon from "../../icons/disc-gray.png"
import removeIcon from "../../icons/remove-gray.png"
import "./Discs.css"

export const DiscForm = () => {
    const { discs, getDiscs } = useContext(DiscContext)
    const { getUserDiscById, addUserDisc, updateUserDisc, removeUserDisc } = useContext(UserDiscContext)
    const history = useHistory()
    const [ isLoading, setIsLoading ] = useState(true)
    const [ searchTerms, setSearchTerms ] = useState("")
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
            <div className="discButton" onClick={handleClickDeleteDisc}>
                    <div className="discButton__content">
                        <img src={removeIcon} alt="remove icon"/>
                        <div className="discButton__text">
                            Remove Disc from Bag
                        </div>
                    </div>
                </div>
        )
    } else {
        variableButton = (
            <div className="discButton" onClick={() => history.push("/")}>
                    <div className="discButton__content">
                        <img src={discIcon} alt="disc icon"/>
                        <div className="discButton__text">
                            Back to Bags
                        </div>
                    </div>
                </div>
        )
    }

    console.log("rendering")
    let suggestionList
    let filteredDiscs
    let flightPathImage
    
    if (searchTerms) {
        // filteredDiscs = discs.filter(disc => disc.name?.toLowerCase().includes(searchTerms))
        filteredDiscs = discs.filter(disc => disc.name?.match(new RegExp(searchTerms, "i")))
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
                <div className="discImage__statsWrapper">
                    <div className="discImage__stat"><strong>Mold: </strong>{pendingDisc?.name}</div>
                    <div className="discImage__stat"><strong>Type: </strong> {pendingDisc?.discType}</div>
                    <div className="discImage__stat">
                        <strong>Speed: </strong> {pendingDisc?.speed}
                    </div>
                    <div className="discImage__stat">
                        <strong>Glide: </strong> {pendingDisc?.glide}
                    </div>
                    <div className="discImage__stat">
                        <strong>Turn: </strong> {pendingDisc?.turn}
                    </div>
                    <div className="discImage__stat">
                        <strong>Fade: </strong> {pendingDisc?.fade}
                    </div>
                </div>
                <div className="discImage__imageWrapper">
                    <FlightPathImage key={pendingDisc?.id} disc={pendingDisc} />
                </div>
            </>
        )
    }

    return (
        <>
            <div className="discForm__wrapper">
                <div className="discForm__inputWrapper">
                    <div className="discForm">
                        <div className="discForm__title">{userDiscId ? "Edit Disc" : "New Disc"}</div>
                        <div className="discForm__search">
                            <div className="discForm__label">Disc Mold: </div>
                            <input type="text"
                                className="discForm__input"
                                id="discId"
                                autoComplete="off"
                                value={searchTerms}
                                placeholder={pendingDisc ? `${pendingDisc.name}` : ""}
                                onChange={handleEnteredSearchTerms} />
                            {suggestionList}                
                        </div>
                        <div className="discForm__label">Name for Disc: </div>
                        <div className="discForm__name">
                            <input type="text"
                                className="discForm__input"
                                autoComplete="off"
                                id="name"
                                value={userDisc.name}
                                onChange={handleInputChange} />
                        </div>
                    </div>
                </div>
                    {flightPathImage}
            </div>
            <div className="buttons__wrapper">
                <div className="discButton" onClick={handleClickSaveDisc}>
                    <div className="discButton__content">
                        <img src={discIcon} alt="disc icon"/>
                        <div className="discButton__text discButton__save">
                            {userDiscId ? "Save Changes" : "Add Disc"}
                        </div>
                    </div>
                </div>
                {variableButton}
            </div>
        </>
    )
}