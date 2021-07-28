import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router-dom"
import { BagContext } from "./BagProvider"
import { UserDiscContext } from "../discs/UserDiscProvider"
import { UserDisc } from "../discs/UserDisc"
import { MessageContext } from "../messages/MessageProvider"
import { MessageForm } from "../messages/MessageForm"
import { Message } from "../messages/Message"
import "./Bags.css"

export const OtherBagDetail = () => {
    const [ bag, setBag ] = useState({})
    const { userDiscs, getUserDiscs } = useContext(UserDiscContext)
    const { messages, getMessages } = useContext(MessageContext)
    const { getBagById } = useContext(BagContext)
    const history = useHistory()
    const {bagId} = useParams()
    const [ dialog, setDialog ] = useState(false)
    const [ messageId, setMessageId ] = useState(0)

    useEffect(() => {
        getBagById(bagId)
        .then(res => {
            setBag(res)
        })
        .then(getUserDiscs())
        .then(getMessages())
    }, [])

    const bagDiscs = userDiscs?.filter(userDisc => bag.id === userDisc.bagId)

    const filteredMessages = messages?.filter(message => message.bagId === parseInt(bagId))

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
            <div className="messages__wrapper">
                <button className="dialog__button" onClick={() => setDialog(true)}>Comment on this bag</button>
                <dialog className="dialog__box" open={dialog}>
                    <MessageForm key={bagId} 
                                 setDialog={setDialog} 
                                 messageId={messageId} 
                                 setMessageId={setMessageId} />
                </dialog>
                <div className="messages">
                    {
                        filteredMessages?.map(message => {
                            return <Message key={message.id} 
                                            message={message} 
                                            setDialog={setDialog} 
                                            setMessageId={setMessageId} />
                        })
                    }
                </div>
            </div>
        </section>
    )
}