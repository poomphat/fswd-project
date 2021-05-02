import notfound from "../asset/notfound.jpg"
import { useLocation, Link } from "react-router-dom"
import { LoadingOutlined } from "@ant-design/icons"
import { CREATE_PRODUCT_CART_MUTATION } from "../graphql/createProductCartMutation"
import { FIND_CART_QUERY } from "../graphql/findCartQuery"
import { useSession } from "../context/Sessioncontext"
import { useMutation, useLazyQuery } from "@apollo/client"
import { useCallback, useEffect, useState, useMemo } from "react"
import { updateProductCartHandler } from "./updateCartHandler"
import { DELETE_PRODUCT_BY_ID } from "../graphql/deleteProductByIdMutation"
import { DELETE_PROMOTION_BY_PRODUCT } from "../graphql/deletePromotionByProduct"
import { DELETE_STOCK_BY_PRODUCT } from "../graphql/deleteStockByProduct"
import { Spin, Alert } from "antd"
import { notification, Space, Radio } from "antd";
import { Modal, Button } from "antd"
const sucessNotification = {
    message: "Delete Success",
    description: "Susccess to delete product",
    duration: 2.5,
}
const ShoesCard = (props) => {
    const location = useLocation()
    const item = props.item
    const [userid, setuserid] = useState("")
    const { user, loading: userLoading } = useSession()
    const [createProductCart] = useMutation(CREATE_PRODUCT_CART_MUTATION)
    const [deleteStock] = useMutation(DELETE_STOCK_BY_PRODUCT)
    const [getCart, { loading, data: datacart }] = useLazyQuery(
        FIND_CART_QUERY,
        {
            fetchPolicy: "network-only",
        }
    )
    const [deletePromotion] = useMutation(DELETE_PROMOTION_BY_PRODUCT, {
        onCompleted:() => {
            deleteStock({ variables: { productId: item?._id } })
            props.fatchAll()
            notification.success(sucessNotification)
        }
    })
    const [deleteProduct] = useMutation(DELETE_PRODUCT_BY_ID, {
        onCompleted:() =>{
            deletePromotion({ variables: { productId: item?._id } })
        },
        onError:() =>[

        ]
    })
    //console.log(user?._id)

    useMemo(() => {
        setuserid(user?._id)
        getCart({
            variables: { Id: user?._id },
        })
    }, [user, userLoading])
    const Addbutton = () => {
        const productCartData = {
            productId: item?._id,
            cartId: datacart?.cart?._id,
            products: datacart?.cart?.products,
            quantity: 1,
            createProductCart: createProductCart,
        }
        return (
            <button
                class="btn btn-dark col"
                onClick={() => {
                    getCart({
                        variables: { Id: user?._id },
                    })
                    updateProductCartHandler(productCartData)
                }}
            >
                Add
            </button>
        )
    }
    const deleteProductHandler = () => {
        deleteProduct({ variables: { productId: item?._id } })
    }
    const ShoesDetail = () => {
        const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
        return (
            <Spin
                indicator={antIcon}
                tip="Loading..."
                spinning={loading}
                delay={200}
            >
                <div class="card bg-light text-dark shadow shoecard">
                    <img
                        class="card-img-top imgs"
                        src={
                            item?.imgUrl == null || !item?.imgUrl
                                ? notfound
                                : item?.imgUrl
                        }
                        alt="Card image cap"
                        crossOrigin="anonymous"
                    />
                    <div class="card-body">
                        <h5 class="card-title">{item?.productName}</h5>
                        <p class="card-text">{item?.productDesc}</p>
                    </div>
                    <div class="card-footer text-dark flexbe ">
                        <h6 className="boldhead mb-0 totaltext mt-2 ml-1">
                            {item?.price} USD
                        </h6>
                        <div className="row mt-2">
                            {user?.role === "Admin" &&
                            location.pathname == "/admin/product" ? (
                                <>
                                    <div className="col-6 my-2">
                                        <Link
                                            to={"/admin/product/" + item?._id}
                                        >
                                            <button class="btn btn-dark col">
                                                Edit
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="col-6 mt-2">
                                        <button
                                            class="btn btn-danger col"
                                            onClick={() =>
                                                deleteProductHandler()
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="col-6 ">
                                        <Link to={"/product/" + item?._id}>
                                            <a
                                                href="#"
                                                class="btn btn-light col"
                                            >
                                                more
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="col-6">
                                        <Addbutton />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Spin>
        )
    }
    return (
        <div class="col-lg-4 col-sm-12 mb-3 pr-0">
            <ShoesDetail />
        </div>
    )
}

export default ShoesCard
