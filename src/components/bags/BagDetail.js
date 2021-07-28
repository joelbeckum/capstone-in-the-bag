import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { UserDiscContext } from "../discs/UserDiscProvider"
import { UserDisc } from "../discs/UserDisc"
import { BagContext } from "./BagProvider"
import "./Bags.css"

export const BagDetail = () => {
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
        <>
            <section className="bagDetail">
                <div className="discs__wrapper">
                    {
                        bagDiscs?.map(userDisc => {
                            return <UserDisc key={userDisc.id} userDisc={userDisc} />
                        })
                    }
                </div>
                <div className="bagButtons__wrapper">
                    <div className="bagButton" onClick={() => history.push(`/discs/addTo/${bag?.id}`)}>
                        <img src="https://via.placeholder.com/115x130" alt="placeholder"/>
                        Add Disc
                    </div>
                    <div className="bagButton" onClick={() => history.push(`/bags/edit/${bag.id}`)}>
                        <img src="https://via.placeholder.com/115x130" alt="placeholder"/>
                        Change Bag Name
                    </div>
                    <div className="bagButton">
                        <img src="https://via.placeholder.com/115x130" alt="placeholder"/>
                        Remove Bag
                    </div>
                </div>
            </section>
        </>
    )
}


