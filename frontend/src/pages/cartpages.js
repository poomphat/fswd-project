import "./cartpages.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    Link,
} from "react-router-dom"
import Navbar from "../component/Navbar"
import { useState, useEffect, useCallback, useMemo } from "react"
import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client"
import { FIND_ALL_PROMOTIONS } from "../graphql/findPromotionQuery"
import { FIND_CART_QUERY } from "../graphql/findCartQuery"
import { CREATE_ORDER_MUTATION } from "../graphql/createOrderMutation"
import { DELETE_CART_PRODUCT_MANY } from "../graphql/deleteCartProductMany"
import { DELETE_CART_PROMOTION_MANY } from "../graphql/deleteCartPromotionMany"
import { UPDATE_STOCK_MUTATION } from "../graphql/updateStockMutation"
import { useSession } from "../context/Sessioncontext"
import { useHistory } from "react-router-dom"
import { notification } from "antd"
import { Result, Button } from "antd"
import { SmileOutlined } from "@ant-design/icons"
import CartProduct from "../component/CartProduct"
import CartPromotion from "../component/cartPromotion"
import {
    SmileTwoTone,
    HeartTwoTone,
    CheckCircleTwoTone,
} from "@ant-design/icons"

function Cartpages() {
    const { user, loading: userLoading } = useSession()
    const [userid, setuserid] = useState("")
    const { data: promotions } = useQuery(FIND_ALL_PROMOTIONS)
    const [createOrder] = useMutation(CREATE_ORDER_MUTATION)
    const [wipeProductCart] = useMutation(DELETE_CART_PRODUCT_MANY)
    const [wipePromotionCart] = useMutation(DELETE_CART_PROMOTION_MANY)
    const [updateStock] = useMutation(UPDATE_STOCK_MUTATION)
    const [getCart, { loading, data: dataCart }] = useLazyQuery(
        FIND_CART_QUERY,
        {
            fetchPolicy: "network-only",
        }
    )

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

    useMemo(() => {
        setuserid(user?._id)
        getCart({
            variables: { Id: user?._id },
        })
        console.log(dataCart)
    }, [user, userLoading])
    /*
    const setProductHandler = useCallback( async (data) =>{
        setProduct(data);
      });

    useEffect(()=>{
        findManyProduct().then(result =>{
            setProductHandler(result.data)
        })
        
    }, [])
    */
    const sumOfPromotionPrice = (array) => {
        try {
            const sum = array
                .map(
                    (o) =>
                        Math.floor(
                            o.forPromotion?.disProduct?.price /
                                ((100 + o.forPromotion?.discountInPercent) /
                                    100)
                        ) * o.quantity
                )
                .reduce((a, c) => {
                    return a + c
                })
            return sum
        } catch (error) {
            return 0
        }
    }
    const sumOfProductPrice = (array) => {
        try {
            const sum = array
                .map((o) => o.forProduct?.price * o.quantity)
                .reduce((a, c) => {
                    return a + c
                })
            return sum
        } catch (error) {
            return 0
        }
    }
    const sumOfPrice = (products, promotions) => {
        return sumOfProductPrice(products) + sumOfPromotionPrice(promotions)
    }

    const checkOut = () => {
        // fatch cart data before deal with data
        getCart({ variables: { Id: user?._id } })
        if (loading) {
            console.log("load cart")
        } else {
            return dataHandler()
        }
    }

    const dataHandler = () => {
        const tempProducts = dataCart?.cart?.products
        const products = []
        const orderProduct = []
        const orderPromotion = []
        try {
            //prepare products data
            console.log(dataCart)
            tempProducts.map((item, i) => {
                const forProduct = item?.forProduct
                products.push({
                    quantity: item?.quantity,
                    productId: forProduct._id,
                    stock: forProduct.hasStock?.quantity,
                })
                //prepare OrderProduct data
                orderProduct.push({
                    quantity: item?.quantity,
                    productId: forProduct._id,
                    forProduct: {
                        productName: forProduct.productName,
                        productDesc: forProduct.productDesc,
                        price: forProduct.price,
                        imgUrl: forProduct.imgUrl,
                    },
                })
            })
            //merge promotion quantity with matching product data
            dataCart?.cart?.promotions?.map((item, i) => {
                const proProduct = products?.find(
                    (o) => o.productId === item?.forPromotion?.disProduct?._id
                )
                // prepare OrderPromotions data

                const forPromotion = item?.forPromotion
                console.log(forPromotion)
                console.log(forPromotion?.disProduct)

                const forPromotionObject = {
                    promotionName: forPromotion?.promotionName,
                    promotionDesc: forPromotion?.promotionDesc,
                    discountInPercent: forPromotion?.discountInPercent,
                    productId: forPromotion?.disProduct?._id,
                    disProduct: {
                        price: forPromotion?.disProduct?.price,
                        productName: forPromotion?.disProduct?.productName,
                        imgUrl: forPromotion?.disProduct?.imgUrl,
                    },
                }
                orderPromotion.push({
                    quantity: item?.quantity,
                    promotionId: forPromotion?._id,
                    forPromotion: forPromotionObject,
                })
                console.log("itaaaaem")
                console.log(orderPromotion)
                // matching promotion and product data
                if (proProduct) {
                    const productQuantity =
                        products[products.indexOf(proProduct)].quantity
                    const promotionQuantity = item?.quantity
                    products[products.indexOf(proProduct)].quantity =
                        productQuantity + promotionQuantity

                    if (
                        products[products.indexOf(proProduct)].quantity >
                        products[products.indexOf(proProduct)].stock
                    ) {
                        throw "Out of Stock BTW"
                    }
                }
            })
            const newOrderRecord = {
                userId: dataCart?.cart?.userId,
                status: "WAITING",
                products: orderProduct,
                promotions: orderPromotion,
                totalPrice: sumOfPrice(
                    dataCart?.cart?.products,
                    dataCart?.cart?.promotions
                ),
            }
            //create order
            createOrder({ variables: { record: newOrderRecord } }).then(
                (result) => {
                    //result.data?.createOrder
                    //update Stock
                    products.map((item, i) => {
                        const quantity = item.stock - item.quantity
                        if (quantity < 0) {
                            throw "Out of Stock BTW"
                        }
                        updateStock({
                            variables: {
                                productId: item.productId,
                                quantity: quantity,
                            },
                        })
                    })

                    //wipe cart
                    wipeProductCart({
                        variables: { cartId: dataCart?.cart?._id },
                    })
                    wipePromotionCart({
                        variables: { cartId: dataCart?.cart?._id },
                    })
                    goToCheckOut(result.data?.createOrder?.record)
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="bg">
            <Navbar />
            <div className="container mt-5">
                <h2 className="Texttitle" data-aos="fade-right">
                    Cart
                </h2>
                <hr></hr>

                {dataCart?.cart?.products?.length == 0 &&
                dataCart?.cart?.promotions?.length == 0 ? (
                    <div className="justifycenter">
                        <Result
                            icon={<HeartTwoTone twoToneColor="#eb2f96" />}
                            title="You don't have any item on this cart"
                            extra={
                                <button
                                    className="btn btn-light"
                                    onClick={() => history.push("/")}
                                >
                                    Go to shopping
                                </button>
                            }
                            centered={true}
                        />
                    </div>
                ) : (
                    <>
                        <div className="row">
                            <div className="col-lg-8 col-sm-12">
                                <div className="row flexbetween ml-2 mr-2">
                                    <h3 className="textbold">Item</h3>{" "}
                                    <h3 className="textbold">
                                        Amount :{" "}
                                        {dataCart?.cart?.products?.length +
                                            dataCart?.cart?.promotions?.length}
                                    </h3>
                                </div>

                                {dataCart?.cart?.products?.map((item, i) => {
                                    return (
                                        <CartProduct
                                            getCart={getCart}
                                            user={user}
                                            items={item}
                                            dataCart={dataCart}
                                        />
                                    )
                                })}

                                {dataCart?.cart?.promotions?.map((item, i) => {
                                    return (
                                        <CartPromotion
                                            item={item}
                                            getCart={getCart}
                                            user={user}
                                            dataCart={dataCart}
                                        />
                                    )
                                })}
                            </div>
                            <div className="col-lg-4 col-sm-12 mt-4">
                                <div className="bg-light Totallist">
                                    <h4 className="textbold">
                                        Total :{" "}
                                        {sumOfPrice(
                                            dataCart?.cart?.products,
                                            dataCart?.cart?.promotions
                                        )}{" "}
                                        USD
                                    </h4>
                                    <hr />
                                    <button
                                        class="btn btn-warning col control"
                                        onClick={() => {
                                            checkOut()
                                        }}
                                    >
                                        Check out
                                    </button>
                                    <button class="btn btn-secondary col control mt-2">
                                        cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Cartpages
