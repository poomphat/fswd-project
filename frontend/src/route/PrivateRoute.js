import { useEffect } from "react"
import { Redirect, Route } from "react-router-dom"

import { useSession } from "../context/Sessioncontext"

const PrivateRoute = (props) => {
    const { children, ...rest } = props
    const { user } = useSession()
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (!user) {
                    {
                        console.log(user)
                    }
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location },
                            }}
                        />
                    )
                }
                return children
            }}
        />
    )
}

export default PrivateRoute
