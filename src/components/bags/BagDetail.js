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

    const currentUserId = parseInt(sessionStorage.getItem("itb_user"))
    let ownedBag = false
    
    const bagDiscs = userDiscs?.filter(userDisc => bag.id === userDisc.bagId)
    if (bag.userId === currentUserId) {
        ownedBag = true
    }

    return (
        <>
            <section className="bagDetail">
                <div className="discs__wrapper">
                    {console.log(bag?.name)}
                    {
                        bagDiscs?.map(userDisc => {
                            return <UserDisc key={userDisc.id} userDisc={userDisc} />
                        })
                    }
                </div>
                <div className="bagButtons__wrapper">
                    <div className="bagButton">
                        <img src="https://via.placeholder.com/115x130" alt="placeholder"/>
                        Add Disc
                    </div>
                    <div className="bagButton">
                        <img src="https://via.placeholder.com/115x130" alt="placeholder"/>
                        Remove Bag
                    </div>
                    <div className="bagButton" onClick={() => history.push("/")}>
                        <img src="https://via.placeholder.com/115x130" alt="placeholder"/>
                        Back to Bags
                    </div> 
                </div>
            </section>
        </>
    )
}

