import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router-dom"
import { BagContext } from "./BagProvider"
import { UserDiscContext } from "../discs/UserDiscProvider"
import { UserDisc } from "../discs/UserDisc"
import { MessageContext } from "../messages/MessageProvider"
import { MessageForm } from "../messages/MessageForm"
import { Message } from "../messages/Message"
import discIcon from "../../icons/disc-gray.png"
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
        <>
            <section className="bagDetail">
                <div className="discs">
                    <div className="discs__title">Discs:</div>
                    <div className="discs__wrapper">
                        {
                            bagDiscs?.map(userDisc => {
                                return <UserDisc key={userDisc.id} userDisc={userDisc} />
                            })
                        }
                    </div>
                </div>
                <div className="bagButtons__wrapper otherButtons__wrapper">
                    <div className="bagButton otherButton" onClick={() => history.push("/otherBags")}>
                        <div className="bagButton__content">
                            <img src={discIcon} alt="disc icon"/>
                            <div className="bagButton__text">
                                Back to Other Bags
                            </div>
                        </div>
                    </div>
                </div>
                        
            </section>
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
        </>
    )
}