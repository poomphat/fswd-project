import "./cartpages.css"
import Navbar from "../component/Navbar"
import { useState, useCallback, useMemo } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { FIND_ALL_PROMOTIONS } from "../graphql/findPromotionQuery"
import { CREATE_ORDER_MUTATION } from "../graphql/createOrderMutation"
import { DELETE_CART_PRODUCT_MANY } from "../graphql/deleteCartProductMany"
import { DELETE_CART_PROMOTION_MANY } from "../graphql/deleteCartPromotionMany"
import { UPDATE_STOCK_MUTATION } from "../graphql/updateStockMutation"
import { UPDATE_ORDER_STATUS } from "../graphql/updateOrderMutation"
import { useSession } from "../context/Sessioncontext"
import { useHistory } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { notification } from "antd"

function PaymentPage() {
    const { user, loading: userLoading } = useSession()
    const [userid, setuserid] = useState("")
    const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS)

    //from state
    const [cardNumber, setCardNumber] = useState("")
    const [holderName, setHolderName] = useState("")
    const [cvv, setCvv] = useState("")
    const [expireDate, setExpireDate] = useState("")
    const handleCardNumberChange = (e) => {
        setCardNumber(e.target.value)
    }
    const handleHolderNameChange = (e) => {
        setHolderName(e.target.value)
    }
    const handleCvvChange = (e) => {
        setCvv(e.target.value)
    }
    const handleExpireDate = (e) => {
        setExpireDate(e.target.value)
    }

    const location = useLocation()
    const history = useHistory()
    const goToIndex = useCallback(() => {
        history.push("/")
    }, [history])

    console.log(location.order)

    useMemo(() => {
        setuserid(user?._id)
    }, [user, userLoading])
    const order = location.order
    const sucessNotification = {
        message: "Payment Success",
        description: ":D",
        duration: 2,
    }
    const voidFormNotification = {
        message: "Please fill all form info",
        description: ":D",
        duration: 2,
    }
    const changeOrderStatus = () => {
        if (
            cardNumber != "" &&
            holderName != "" &&
            cvv != "" &&
            expireDate != ""
        ) {
            updateOrderStatus({
                variables: { orderId: order._id, status: "PAID" },
            })
            notification.success(sucessNotification)
            goToIndex()
        } else {
            notification.error(voidFormNotification)
        }
    }
    return (
        <div className="bg">
            <Navbar />
            <div className="container mt-5">
                <h2 className="Texttitle" data-aos="fade-right">
                    Payment
                </h2>
                <hr></hr>
                <div className="row">
                    <div className="col-lg-8 col-sm-12">
                        <div class="form-group mt-2">
                            <label class="form-label" for="customFile">
                                Card Number
                            </label>
                            <input
                                type="text"
                                class="form-control bg-light"
                                placeholder="Card Number"
                                id="customFile"
                                onChange={handleCardNumberChange}
                                required
                            />
                        </div>
                        <div class="form-group mt-2">
                            <label class="form-label" for="customFile">
                                Cardholder Name
                            </label>
                            <input
                                type="text"
                                class="form-control bg-light"
                                placeholder="Cardholder Name"
                                id="customFile"
                                onChange={handleHolderNameChange}
                                required
                            />
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-sm-12">
                                <div class="form-group mt-2">
                                    <label class="form-label" for="customFile">
                                        CVV
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control bg-light"
                                        placeholder="CVV"
                                        id="customFile"
                                        onChange={handleCvvChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-lg-8 col-sm-12">
                                <div class="form-group mt-2">
                                    <label class="form-label" for="customFile">
                                        Expire Date
                                    </label>
                                    <input
                                        type="date"
                                        class="form-control bg-light"
                                        placeholder="Expire Date"
                                        id="customFile"
                                        onChange={handleExpireDate}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <br />
                        <button
                            className="btn btn-primary"
                            onClick={() => changeOrderStatus()}
                        >
                            {" "}
                            Pay{" "}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentPage
