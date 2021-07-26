import React from "react"
import { Route } from "react-router-dom"
import { BagProvider } from "./bags/BagProvider"
import { BagDashboard } from "./bags/BagDashboard"
import { BagForm } from "./bags/BagForm"
import { BagDetail } from "./bags/BagDetail"
import { UserDiscProvider } from "./discs/UserDiscProvider"

export const ApplicationViews = () => {
    return (
        <>
            <BagProvider>
                <Route exact path="/">
                    <BagDashboard />
                </Route>
            </BagProvider>

            <BagProvider>
                <UserDiscProvider>
                    <Route exact path="/bags/:bagId(\d+)">
                        <BagDetail />
                    </Route>
                </UserDiscProvider>
            </BagProvider>

            <BagProvider>
                <Route exact path="/bags/create">
                    <BagForm />
                </Route>
            </BagProvider>
        </>
    )
}