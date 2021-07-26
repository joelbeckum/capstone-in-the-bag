import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { BagContext } from "./BagProvider"
import { Bag } from "./Bag"
import "./Bags.css"

export const BagDashboard = () => {
    const { bags, getBags } = useContext(BagContext)
    const history = useHistory()

    useEffect(() => {
        getBags()
    }, [])

    const currentUserId = parseInt(sessionStorage.getItem("itb_user"))

    const currentUserBags = bags?.filter(bag => bag.userId === currentUserId)

    return (
        <>
            <h1 className="bags__title">Your Bags</h1>
            <section className="dashboard">
                <div className="bags__wrapper">
                    {
                        currentUserBags?.map(bag => {
                            return <Bag bag={bag} />
                        })
                    }
                </div>
                <div className="buttons__wrapper">
                    <div className="button bags__new" onClick={() => history.push("/bags/create")}>
                        <img src="https://via.placeholder.com/115x130" alt="placeholder image"/>
                        Create a Bag
                    </div>
                    <div className="button bags__friends">
                        <img src="https://via.placeholder.com/115x130" alt="placeholder image"/>
                        See Others' Bags
                    </div>
                </div>
            </section>
        </>
    )
}