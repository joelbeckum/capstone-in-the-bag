import React from "react"
import { Link, useHistory } from "react-router-dom"
import logo from "../../icons/logo.png"
import "./NavBar.css"

export const NavBar = (props) => {
    const history = useHistory()

    const handleClickLogout = e => {
        e.preventDefault()

        sessionStorage.removeItem("itb_user")
        history.push("/login")
    }

    return (
        <nav className="navbar">
            <div className="navbar__wrapper">
                <div className="logo" onClick={() => history.push("/")}>
                    <img src={logo} alt="placeholder"/>
                </div>
                <div className="logout">
                    <button className="logout__button" onClick={handleClickLogout}>
                        LOG OUT
                    </button>
                </div>
            </div>
        </nav>
    )
}

{/* <Link
                        className="nav-link"
                        to="/login"
                        onClick={() =>
                            sessionStorage.removeItem("itb_user")
                        }
                    >
                        Logout
                    </Link> */}