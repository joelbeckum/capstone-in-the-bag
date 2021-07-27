import React from "react"
import { Route } from "react-router-dom"
import { BagProvider } from "./bags/BagProvider"
import { BagDashboard } from "./bags/BagDashboard"
import { BagForm } from "./bags/BagForm"
import { BagDetail } from "./bags/BagDetail"
import { OtherBagList } from "./bags/OtherBagList"
import { OtherBagDetail } from "./bags/OtherBagDetail"
import { UserDiscProvider } from "./discs/UserDiscProvider"
import { DiscProvider } from "./discs/DiscProvider"
import { DiscForm } from "./discs/DiscForm"

export const ApplicationViews = () => {
    return (
        <>
            <BagProvider>
                <Route exact path="/">
                    <BagDashboard />
                </Route>
                <Route exact path="/otherBags">
                    <OtherBagList />
                </Route>
            </BagProvider>

            <BagProvider>
                <UserDiscProvider>
                    <Route exact path="/bags/:bagId(\d+)">
                        <BagDetail />
                    </Route>
                    <Route exact path="/otherBags/:bagId(\d+)">
                        <OtherBagDetail />
                    </Route>
                </UserDiscProvider>
            </BagProvider>

            <BagProvider>
                <Route exact path="/bags/create">
                    <BagForm />
                </Route>
                <Route exact path="/bags/edit/:bagId(\d+)">
                    <BagForm />
                </Route>
            </BagProvider>

            <BagProvider>
                <DiscProvider>
                    <UserDiscProvider>
                        <Route exact path="/discs/addTo/:bagId(\d+)">
                            <DiscForm />
                        </Route>
                        <Route exact path="/discs/edit/:userDiscId(\d+)">
                            <DiscForm />
                        </Route>
                    </UserDiscProvider>
                </DiscProvider>
            </BagProvider>
        </>
    )
}