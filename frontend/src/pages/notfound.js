import "./Loginpages.css"
import { useCallback, useState } from "react"
import { useHistory } from "react-router-dom"
import { useSession } from "../context/Sessioncontext"
import { gql, useMutation } from "@apollo/client"
import { Result, Button } from "antd"
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom"
function NotFound() {
    return (
        <>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Link to="/">
                        <Button type="primary">Back Home</Button>
                    </Link>
                }
            />
            ,
        </>
    )
}

export default NotFound
