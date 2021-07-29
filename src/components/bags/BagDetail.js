import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { UserDiscContext } from "../discs/UserDiscProvider"
import { UserDisc } from "../discs/UserDisc"
import { BagContext } from "./BagProvider"
import { MessageContext } from "../messages/MessageProvider"
import { OtherMessage } from "../messages/OtherMessage"
import "./Bags.css"

export const BagDetail = () => {
    const [ bag, setBag ] = useState({})
    const { userDiscs, getUserDiscs } = useContext(UserDiscContext)
    const { getBagById } = useContext(BagContext)
    const { messages, getMessages } = useContext(MessageContext)
    const history = useHistory()
    const {bagId} = useParams()

    useEffect(() => {
        getBagById(bagId)
        .then(res => {
            setBag(res)
        })
        .then(getUserDiscs())
        .then(getMessages())
    }, [])

    const bagDiscs = userDiscs?.filter(userDisc => bag.id === userDisc.bagId)
    const bagMessages = messages?.filter(message => bag.id === message.bagId)

    return (
        <>
            <section className="bagDetail">
                <div className="discs">
                    <div className="discs__title">Your Discs:</div>
                    <div className="discs__wrapper">
                        {
                            bagDiscs?.map(userDisc => {
                                return <UserDisc key={userDisc.id} userDisc={userDisc} />
                            })
                        }
                    </div>
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
            <div className="otherMessages__wrapper">
                {
                    bagMessages?.map(message => {
                        return <OtherMessage key={message.id} message={message} />
                    })
                }
            </div>
        </>
    )
}


