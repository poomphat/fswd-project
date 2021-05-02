import "./detailpages.css"
import { useMemo } from "react"
import Navbar from "../component/Navbar"
import { useQuery, useLazyQuery } from "@apollo/client"
import OrderCardAdmin from "../component/OrderCardAdmin"
import { BrowserRouter as Router, useParams } from "react-router-dom"

import { FIND_ORDER_BY_ID } from "../graphql/findOrderById"

function Detailsproduct() {
    const name = useParams()
    const [fetchOrder, { data: items, loading: orderLoading }] = useLazyQuery(
        FIND_ORDER_BY_ID,
        {
            fetchPolicy: "network-only",
        }
    )
    const item = items?.orders[0]
    console.log(name)
    useMemo(() => {
        fetchOrder({ variables: { _id: name.string } })
    }, [])

    return (
        <div className="bg">
            {!orderLoading ? (
                <div className="container">
                    <h2 className="Texttitle mt-5" data-aos="fade-right">
                        Order : {item?._id}{" "}
                    </h2>
                    <hr />
                    <OrderCardAdmin item={item} />
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default Detailsproduct
