import React from "react"
import { Route } from "react-router-dom"
import { BagProvider } from "./bags/BagProvider"
import { BagDashboard } from "./bags/BagDashboard"

export const ApplicationViews = () => {
    return (
        <>
            <BagProvider>
                <Route exact path="/">
                    <BagDashboard />
                </Route>
            </BagProvider>
        </>
    )
}