import { useCallback, useEffect, useState, useMemo } from "react"
import notfound from "../asset/notfound.jpg"
import { Accordion, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { Radio, Input, Space, notification } from "antd"
import { useSession } from "../context/Sessioncontext"
import { useLazyQuery, useMutation } from "@apollo/client"
import { FILTER_CUSTOMER } from "../graphql/findCustomerQuery"

const OrderCheckoutCard = (props) => {
    const item = props.item
    const [checkedValue, setCheckedValue] = useState(1)
    const [userid, setuserid] = useState("")
    const { user, loading: userLoading } = useSession()
    const [
        filterCustomer,
        { loading, data: customerData },
    ] = useLazyQuery(FILTER_CUSTOMER, { fetchPolicy: "network-only" })

    const history = useHistory()
    const goToPayment = useCallback(
        (order) => {
            history.push({
                pathname: "/payment",
                order: order,
            })
        },
        [history]
    )

    useMemo(() => {
        setuserid(user?._id)
        filterCustomer({ variables: { userId: user?._id } })
    }, [user, userLoading])

    const setCheckedValueHandler = (e) => {
        setCheckedValue(e.target.value)
    }
    const goToCheckOut = useCallback(
        (order) => {
            history.push({
                pathname: "/checkout",
                order: order,
            })
        },
        [history]
    )
    const customerAddress = customerData?.customer?.address
    return (
        <>
            <div class="col-lg-12 col-sm-12 row cartlist boxorder bg-light ml-0 pl-3 mb-4">
                <div
                    className={
                        "boxstatus" +
                        (item?.status === "WAITING"
                            ? " bg-warning"
                            : " bg-success")
                    }
                ></div>
                <div className="col-12 pr-0">
                    <Accordion defaultActiveKey="0">
                        <div className="flexbetween row ml-1 mr-1">
                            <h4 class="card-title textbold mt-2">
                                Order : {item?._id}
                            </h4>
                            {item?.status === "WAITING" && !props.disablePay ? (
                                <>
                                    <button
                                        className="btn btn-light"
                                        onClick={() => goToCheckOut(item)}
                                    >
                                        Pay
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => goToCheckOut(item)}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                        <p>Status : {item?.status}</p>
                        <hr />
                        <h5>Total: {item?.totalPrice} USD</h5>
                        <Accordion.Toggle
                            as={Button}
                            variant="btn btn-dark mt-1"
                            eventKey="0798978"
                        >
                            Product List
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0798978">
                            <div class="mt-2 row">
                                {item?.products?.map((item, i) => {
                                    return (
                                        <div className="col-6 mt-2">
                                            <div
                                                className="bg-dark boxproduct text-lightml-3"
                                                style={{
                                                    backgroundImage:
                                                        "url(" +
                                                        item?.forProduct
                                                            ?.imgUrl +
                                                        ")",
                                                }}
                                            >
                                                <div className="filterbg">
                                                    <p className="text-light">
                                                        {
                                                            item?.forProduct
                                                                ?.productName
                                                        }
                                                    </p>
                                                    <p className="text-light">
                                                        Price:{" "}
                                                        {
                                                            item?.forProduct
                                                                ?.price
                                                        }{" "}
                                                        USD
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                {item?.promotions?.map((item, i) => {
                                    return (
                                        <div className="col-6 mt-2">
                                            <div className="bg-dark boxpromotion text-lightml-3">
                                                <p className="text-light">
                                                    {item.promotionId}
                                                </p>
                                                <p className="text-light">
                                                    Price:{" "}
                                                    {item?.forPromotion?.price}{" "}
                                                    US
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </Accordion.Collapse>
                    </Accordion>
                    <hr />
                    <h5> Shipping </h5>
                    <Radio.Group
                        onChange={setCheckedValueHandler}
                        value={checkedValue}
                    >
                        <Space direction="vertical">
                            <Radio value={1}>Kerry Express</Radio>
                            <Radio value={2}>ThailandPost</Radio>
                            <Radio value={3}>Flash Express</Radio>
                        </Space>
                    </Radio.Group>
                    <hr />
                    <h5> Address </h5>
                    {!loading ? (
                        <>
                            <p>
                                {customerAddress?.address +
                                    " " +
                                    customerAddress?.subDistrict +
                                    " " +
                                    customerAddress?.district +
                                    " " +
                                    customerAddress?.province +
                                    ", " +
                                    customerAddress?.country +
                                    " " +
                                    customerAddress?.zipcode}
                                <a href="" className="ml-2">
                                    (edit)
                                </a>
                            </p>
                        </>
                    ) : (
                        <p />
                    )}
                    <hr />
                    <button
                        className="btn btn-primary"
                        onClick={() => goToPayment(item)}
                    >
                        {" "}
                        Pay{" "}
                    </button>
                </div>
            </div>
        </>
    )
}

export default OrderCheckoutCard
