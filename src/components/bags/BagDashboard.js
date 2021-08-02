import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { BagContext } from "./BagProvider"
import { Bag } from "./Bag"
import emptyBagIcon from "../../icons/empty-bag-gray.png"
import discIcon from "../../icons/disc-gray.png"
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
            <div className="bags__title">Your Bags</div>
            <section className="dashboard">
                <div className="bags__wrapper">
                    {
                        currentUserBags?.map(bag => {
                            return <Bag key={bag.id} bag={bag} />
                        })
                    }
                </div>
                <div className="buttons__wrapper">
                    <div className="button bags__new" onClick={() => history.push("/bags/create")}>
                        <div className="button__content">
                            <img src={emptyBagIcon} alt="empty bag icon"/>
                            <div className="button__text">
                                Create a Bag
                            </div>
                        </div>
                    </div>
                    <div className="button bags__otherBags" onClick={() => history.push("/otherBags")}>
                        <div className="button__content">
                            <img src={discIcon} alt="disc icon"/>
                            <div className="button__text">
                                See Others' Bags
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}