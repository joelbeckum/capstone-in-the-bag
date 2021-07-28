import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { DiscContext } from "./DiscProvider"
import { UserDiscContext } from "./UserDiscProvider"
import { BagContext } from "../bags/BagProvider"
import { FlightPathImage } from "./FlightPathImage"
import "./Discs.css"

export const OtherDiscDetail = () => {
    const { getDiscById } = useContext(DiscContext)
    const { getUserDiscById } = useContext(UserDiscContext)
    const { getBagById } = useContext(BagContext)
    const history = useHistory()
    const { otherDiscId } = useParams()
    
    const [ userDisc, setUserDisc ] = useState({})
    const [disc, setDisc ] = useState({})
    const [ bag, setBag ] = useState({})

    useEffect(() => {
        getUserDiscById(otherDiscId)
        .then(e => {
            setUserDisc(e)
        })
    }, [])

    useEffect (() => {
        getDiscById(userDisc.discId)
        .then(e => {
            setDisc(e)
        })
    }, [userDisc])

    useEffect(() => {
        getBagById(userDisc.bagId)
        .then(e => {
            setBag(e)
        })
    }, [userDisc])

    
    // const discOwner = bag?.user.firstName

    return (
        <>
            <section className="otherDiscDetail">
                <div className="otherDiscInfo__wrapper">
                    <div className="otherDisc__name">
                        {userDisc.name}
                    </div>
                    <div className="otherDisc__model">
                        {disc.name}
                    </div>
                    <div className="otherDisc__type">
                        {disc.discType}
                    </div>
                    <div className="otherDisc___speed">
                        Speed: {disc.speed}
                    </div>
                    <div className="otherDisc___glide">
                        Glide: {disc.glide}
                    </div>
                    <div className="otherDisc___turn">
                        Turn: {disc.turn}
                    </div>
                    <div className="otherDisc___fade">
                        Fade: {disc.fade}
                    </div>
                </div>
                <div className="otherDiscImage__wrapper">
                    <FlightPathImage key={disc.id} disc={disc} />
                </div>
                <div className="otherButtons__wrapper">
                <div className="otherDiscButton" onClick={() => history.push(`/otherBags/${bag.id}`)}>
                    <img src="https://via.placeholder.com/115x130" alt="placeholder"/>
                    Back to Bag
                </div>
                </div>
            </section>
        </>
    )
}