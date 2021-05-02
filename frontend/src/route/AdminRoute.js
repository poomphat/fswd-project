import { useEffect, useState } from "react"
import { Redirect, Route } from "react-router-dom"

import { useSession } from "../context/Sessioncontext"

const AdminRoute = (props) => {
    const { children, ...rest } = props
    const { user } = useSession()
    console.log(user?.role)
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (!user) {
                    return (
                        <Redirect
                            to={{ pathname: "/", state: { from: location } }}
                        />
                    )
                }
                return children
            }}
        />
    )
}

export default AdminRoute
