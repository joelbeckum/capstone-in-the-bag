import React, { useContext, useEffect } from "react"
import { BagContext } from "./BagProvider"
import { Bag } from "./Bag"
import "./Bags.css"

export const OtherBagList = () => {
    const { bags, getBags } = useContext(BagContext)

    useEffect(() => {
        getBags()
    }, [])

    const currentUserId = parseInt(sessionStorage.getItem("itb_user"))

    const otherBags = bags?.filter(bag => bag.id !== currentUserId)

    return (
        <>
            <h1 className="otherBags__title">Other Users' Bags</h1>
            <section className="otherBags">
                <div className="bags__wrapper">
                    {
                        otherBags?.map(bag => {
                            return <Bag key={bag.id} bag={bag} />
                        })
                    }
                </div>
            </section>
        </>
    )
}