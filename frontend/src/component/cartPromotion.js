import { CREATE_PROMOTION_CART_MUTATION } from "../graphql/createPromotionCartMutation"
import { CREATE_PRODUCT_CART_MUTATION } from "../graphql/createProductCartMutation"
import { useSession } from "../context/Sessioncontext"
import { useCallback, useEffect } from "react"
import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client"
import { notification, Button, Space } from "antd"
import { DELETE_CART_PROMOTION_ONE } from "../graphql/deleteCartPromotionOne"
const deleteNotification = {
    message: "Delete the item successfully",
    description: "This promotion was removed from cart",
    duration: 2,
}

const CartPromotion = (props) => {
    const item = props.item
    const getCart = props.getCart
    const user = props.user
    const dataCart = props.dataCart
    const [deletePromotion] = useMutation(DELETE_CART_PROMOTION_ONE)
    const deletePromotionHandler = (cartId, promotionId) => {
        console.log(promotionId)
        deletePromotion({
            variables: { cartId: cartId, promotionsId: promotionId },
        }).then(getCart({ variables: { Id: user?._id } }))
        notification.error(deleteNotification)
    }

    return (
        <div className="col-lg-12 row mainnaja pr-0 pl-0 ml-0 mb-4 mt-4">
            <div className="headborder bg-dark text-light col-4">
                <p className="mb-1 textsmall">promotion</p>
                <h6 className="boldhead text-light">
                    Discount {console.log(item)}
                </h6>
            </div>
            <div class="bg-light col-8 bodyborder">
                <div className="row flexbetween pl-3 pr-3">
                    <h5 className="boldhead mb-1">
                        {item?.forPromotion?.disProduct?.productName}
                    </h5>
                    <button
                        className="flexend btn bg-danger text-light positiondelete"
                        onClick={() =>
                            deletePromotionHandler(
                                dataCart?.cart?._id,
                                item.forPromotion?._id
                            )
                        }
                    >
                        -
                    </button>
                </div>
                <hr />

                <div className="flexbe row pr-3 pl-3">
                    <h5 className="boldhead mb-0 totaltext mt-2">
                        Quantity : {item.quantity}
                    </h5>
                    <h5 className="boldhead mb-0 totaltext mt-2">
                        Total :{" "}
                        {Math.floor(
                            item?.forPromotion?.disProduct?.price *
                                ((100 - item?.forPromotion?.discountInPercent) /
                                    100)
                        )}{" "}
                        USD
                    </h5>
                </div>
            </div>
        </div>
    )
}
export default CartPromotion
