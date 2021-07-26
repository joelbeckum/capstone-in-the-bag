import React from "react"
import { Route } from "react-router-dom"
import { BagProvider } from "./bags/BagProvider"
import { BagDashboard } from "./bags/BagDashboard"
import { BagForm } from "./bags/BagForm"

export const ApplicationViews = () => {
    return (
        <>
            <BagProvider>
                <Route exact path="/">
                    <BagDashboard />
                </Route>
            </BagProvider>

            <BagProvider>
                <Route exact path="/bags/create">
                    <BagForm />
                </Route>
            </BagProvider>
        </>
    )
}