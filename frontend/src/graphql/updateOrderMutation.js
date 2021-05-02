import { gql } from "@apollo/client"

export const UPDATE_ORDER_STATUS = gql`
    mutation updateOrderStatus($orderId: MongoID!, $status: EnumOrderStatus!) {
        updateOrder(filter: { _id: $orderId }, record: { status: $status }) {
            recordId
        }
    }
`
