import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    const history = useHistory()

    return (
        <nav className="navbar">
            <div className="logo" onClick={() => history.push("/")}>
                <img src="https://via.placeholder.com/75x75" alt="placeholder"/>
            </div>
            <div className="logout">
                <Link
                    className="nav-link"
                    to="/login"
                    onClick={() =>
                        sessionStorage.removeItem("itb_user")
                    }
                >
                    Logout
                </Link>
            </div>
        </nav>
    )
}