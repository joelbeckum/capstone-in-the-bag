import React, { useState, useEffect, useContext } from "react"
import { useHistory, useParams } from "react-router-dom"
import { BagContext } from "./BagProvider"
import "./Bags.css"

export const BagForm = () => {
    const { addBag, updateBag, getBagById } = useContext(BagContext)
    const history = useHistory()
    const { bagId } = useParams()
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        if (bagId) {
            getBagById(bagId).then(e => {
                setBag(e)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [])

    const [ bag, setBag ] = useState({
        name: "",
        userId: 0
    })

    const handleInputChange = e => {
        const newBag = {...bag}
        newBag[e.target.id] = e.target.value

        setBag(newBag)
    }

    const handleClickSaveBag = e => {
        e.preventDefault()

        const currentUserId = parseInt(sessionStorage.getItem("itb_user"))

        setIsLoading(true)
        if (bagId) {
            updateBag({
                id: bag.id,
                name: bag.name,
                userId: currentUserId
            }).then(() => history.push("/"))
        } else {
            const newBag = {
                name: bag.name,
                userId: currentUserId
            }

            addBag(newBag)
            .then(() => history.push("/"))
        }
    }
    
    return (
        <form className="bagForm">
            <h3 className="bagForm__title">{bagId ? "Edit Bag" : "New Bag"}</h3>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Bag Name:</label>
                    <input type="text"
                           id="name"
                           required
                           autoFocus
                           className="form-control"
                           placeholder="Enter name here"
                           value={bag.name}
                           onChange={handleInputChange} />
                </div>
            </fieldset>
            <button onClick={handleClickSaveBag}>
                {bagId ? "Update Bag" : "Save Bag"}
            </button>
        </form>
    )
}