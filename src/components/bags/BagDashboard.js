import React, { useContext, useEffect } from "react"
import { BagContext } from "./BagProvider"
import { Bag } from "./Bag"
import "./Bags.css"

export const BagDashboard = () => {
    const { bags, getBags } = useContext(BagContext)

    useEffect(() => {
        getBags()
    }, [])

    const currentUserId = parseInt(sessionStorage.getItem("itb_user"))

    const currentUserBags = bags?.filter(bag => bag.userId === currentUserId)

    return (
        <>
            <h1 className="title">Your Bags</h1>
            <section className="dashboard">
                <div className="bags__wrapper">
                    {
                        currentUserBags?.map(bag => {
                            return <Bag bag={bag} />
                        })
                    }
                </div>
                <div className="buttons__wrapper">

                </div>
            </section>
        </>
    )
}