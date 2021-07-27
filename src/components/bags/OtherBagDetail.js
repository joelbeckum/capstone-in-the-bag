import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router-dom"
import { BagContext } from "./BagProvider"
import { UserDiscContext } from "../discs/UserDiscProvider"
import { UserDisc } from "../discs/UserDisc"
import "./Bags.css"

export const OtherBagDetail = () => {
    const [ bag, setBag ] = useState({})
    const { userDiscs, getUserDiscs } = useContext(UserDiscContext)
    const { getBagById } = useContext(BagContext)
    const history = useHistory()
    const {bagId} = useParams()

    useEffect(() => {
        getBagById(bagId)
        .then(res => {
            setBag(res)
        })
        .then(getUserDiscs())
    }, [])

    const bagDiscs = userDiscs?.filter(userDisc => bag.id === userDisc.bagId)

    return (
        <section className="otherDiscs">
            <div className="otherDiscs__wrapper">
                {
                    bagDiscs?.map(userDisc => {
                        return <UserDisc key={userDisc.id} userDisc={userDisc} />
                    })
                }
            </div>
            <div className="otherButtons__wrapper">
                <div className="otherButton" onClick={() => history.push("/otherBags")}>
                    <img src="https://via.placeholder.com/115x130" alt="placeholder"/>
                    Back to Other Bags
                </div>
            </div>
        </section>
    )
}