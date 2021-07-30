import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { DiscContext } from "../discs/DiscProvider"
import { UserDiscContext } from "../discs/UserDiscProvider"
import { UserDisc } from "../discs/UserDisc"
import { BagContext } from "./BagProvider"
import { MessageContext } from "../messages/MessageProvider"
import { OtherMessage } from "../messages/OtherMessage"
import discIcon from "../../icons/disc-gray.png"
import removeIcon from "../../icons/remove-gray.png"
import editIcon from "../../icons/edit-name-gray.png"
import "./Bags.css"

export const BagDetail = () => {
    const [ bag, setBag ] = useState({})
    const { discs, getDiscs } = useContext(DiscContext)
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
        .then(getDiscs())
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
                                return <UserDisc key={userDisc.id} userDisc={userDisc} discs={discs} />
                            })
                        }
                    </div>
                </div>
                <div className="bagButtons__wrapper">
                    <div className="bagButton" onClick={() => history.push(`/discs/addTo/${bag?.id}`)}>
                        <div className="bagButton__content">
                            <img src={discIcon} alt="disc icon"/>
                            <div className="bagButton__text">Add Disc</div>
                        </div>
                    </div>
                    <div className="bagButton" onClick={() => history.push(`/bags/edit/${bag.id}`)}>
                        <div className="bagButton__content">
                            <img src={editIcon} alt="edit icon"/>
                            <div className="bagButton__text">Edit Disc Name</div>
                        </div>
                    </div>
                    <div className="bagButton">
                        <div className="bagButton__content">
                            <img src={removeIcon} alt="remove icon"/>
                            <div className="bagButton__text">Remove Disc</div>
                        </div>
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


