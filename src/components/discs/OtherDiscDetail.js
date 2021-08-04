import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { DiscContext } from "./DiscProvider"
import { UserDiscContext } from "./UserDiscProvider"
import { BagContext } from "../bags/BagProvider"
import { FlightPathImage } from "./FlightPathImage"
import discIcon from "../../icons/disc-gray.png"
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
                <div className="otherDisc__wrapper">
                    <div className="otherDiscInfo__wrapper">
                        <div className="otherDisc__text">
                            <strong>Name:  </strong>{userDisc.name}
                        </div>
                        <div className="otherDisc__text">
                            <strong>Mold:  </strong>{disc.name}
                        </div>
                        <div className="otherDisc__text">
                            <strong>Type:  </strong>{disc.discType}
                        </div>
                        <div className="otherDisc__text">
                            <strong>Speed:  </strong> {disc.speed}
                        </div>
                        <div className="otherDisc__text">
                            <strong>Glide:  </strong> {disc.glide}
                        </div>
                        <div className="otherDisc__text">
                            <strong>Turn:  </strong> {disc.turn}
                        </div>
                        <div className="otherDisc__text">
                            <strong>Fade:  </strong> {disc.fade}
                        </div>
                    </div>
                    <div className="otherDiscImage__wrapper">
                        <FlightPathImage key={disc.id} disc={disc} />
                    </div>
                </div>
                <div className="buttons__wrapper">
                <div className="discButton" onClick={() => history.push(`/otherBags/${bag.id}`)}>
                    <div className="discButton__content">
                        <img src={discIcon} alt="disc icon"/>
                        <div className="discButton__text">
                            Back to Bag
                        </div>
                    </div>
                </div>
                </div>
            </section>
        </>
    )
}