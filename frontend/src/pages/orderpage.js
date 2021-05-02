import "./orderpage.css"
import { useState, useEffect, useCallback, useMemo } from "react"
import Navbar from "../component/Navbar"
import { useLazyQuery } from "@apollo/client"
import { useSession } from "../context/Sessioncontext"
import { FIND_ORDER_BY_USER } from "../graphql/findorderByUser"
import OrderCard from "../component/OrderCard"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

import { useHistory } from "react-router-dom"
function OrderPage() {
    const { user } = useSession()
    const [id, setid] = useState(null)
    const [
        getOrder,
        { data: order, loading },
    ] = useLazyQuery(FIND_ORDER_BY_USER, {
        variables: { userId: user?._id },
        fetchPolicy: "network-only",
    })
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
    useEffect(async () => {
        setid(user?._id)
        getOrder()
    }, [])
    console.log(order)
    const history = useHistory()
    const goToCheckOut = useCallback(
        (order) => {
            history.push({
                pathname: "/checkout",
                order: order,
            })
        },
        [history]
    )
    const goTodetail = useCallback(
        (order) => {
            history.push({
                pathname: "/customer/order/" + order._id,
                order: order,
            })
        },
        [history]
    )
    return (
        <div className="bg">
            <Navbar />
            <div className="container">
                <h2 className="Texttitle mt-5" data-aos="fade-right">
                    Order
                </h2>
                <hr data-aos="fade-right"></hr>
                <div className="row">
                    <div className="row col-lg-12 col-xs-12 mb-5">
                        <div className="col-lg-12 row">
                            {!loading ? (
                                <>
                                    {order?.orders?.map((item, i) => {
                                        return (
                                            <div class="col-lg-12 col-sm-12 row cartlist boxorder bg-light ml-0 pl-3 mb-4">
                                                <div
                                                    className={
                                                        "boxstatus" +
                                                        (item?.status ===
                                                        "WAITING"
                                                            ? " bg-warning"
                                                            : " bg-success")
                                                    }
                                                ></div>
                                                <div className="col-12 pr-0">
                                                    <div className="flexbetween row ml-1 mr-1">
                                                        <h4 class="card-title textbold mt-2">
                                                            Order : {item?._id}
                                                        </h4>
                                                        <div>
                                                            <button
                                                                className="btn btn-light mr-1"
                                                                onClick={() =>
                                                                    goTodetail(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                Detail
                                                            </button>
                                                            {item?.status ===
                                                            "WAITING" ? (
                                                                <button
                                                                    className="btn btn-light"
                                                                    onClick={() =>
                                                                        goToCheckOut(
                                                                            item
                                                                        )
                                                                    }
                                                                >
                                                                    Pay
                                                                </button>
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <p>
                                                        Status : {item?.status}
                                                    </p>
                                                    <hr />
                                                    <h5>
                                                        Total:{" "}
                                                        {item?.totalPrice} USD
                                                    </h5>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            ) : (
                                <>
                                    <Spin
                                        indicator={antIcon}
                                        tip="Loading..."
                                        spinning={true}
                                    >
                                        <OrderCard item={null} />
                                    </Spin>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderPage
