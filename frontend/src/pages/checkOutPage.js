import "./orderpage.css"

import { useMemo, useState, useCallback } from "react"
import Navbar from "../component/Navbar"
import OrderCheckoutCard from "../component/orderCheckoutCard"
import { useHistory } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { FILTER_CUSTOMER } from "../graphql/findCustomerQuery"
import { gql, useMutation } from "@apollo/client"
import { notification, Button, Space } from "antd"

const CheckOutPage = () => {
    const location = useLocation()
    const order = location.order
    const [checkedValue, setCheckedValue] = useState(1)
    const history = useHistory()
    const goToHome = useCallback(() => {
        history.push("/")
    }, [history])

    if (typeof order === "undefined") {
        goToHome()
    }
    return (
        <div className="bg">
            <Navbar />
            <div className="container">
                <h2 className="Texttitle mt-5" data-aos="fade-right">
                    Check Out
                </h2>
                <hr data-aos="fade-right"></hr>
                <div className="row">
                    <div className="row col-lg-12 col-xs-12 mb-5">
                        <OrderCheckoutCard item={order} disablePay={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOutPage
