import { useCallback, useEffect, useState, useMemo } from "react";
import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { notification, Space, Radio } from "antd";
import notfound from "../asset/notfound.jpg";
import { Accordion, Button } from "react-bootstrap";
import { UPDATE_ORDER_STATUS } from "../graphql/updateOrderMutation";

const OrderCardAdmin = (props) => {
  const item = props?.item;
  const [status, setStatus] = useState(item?.status);
  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS, {
    onCompleted: () => {
      notification.success(sucessNotification);
    },
  });
  const sucessNotification = {
    message: "Update status Success",
    description: "update status in order",
    duration: 2,
  };
  const updateOrder = (item) => {
    updateOrderStatus({ variables: { orderId: item?._id, status: status } });
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  return (
    <>
      <div class="col-lg-12 col-sm-12 row cartlist boxorder bg-light ml-0 pl-3 mb-4">
        <div
          className={
            "boxstatus" +
            (status === "WAITING"
              ? " bg-warning"
              : status === "CANCEL"
              ? " bg-secondary"
              : " bg-success")
          }
        ></div>
        <div className="col-12 pr-0">
          <Accordion defaultActiveKey="0">
            <div className="flexbetween row ml-1 mr-1">
              <h4 class="card-title textbold mt-2">Order : {item?._id}</h4>
            </div>
            <p>Status : </p>
            <Radio.Group value={status} onChange={handleStatusChange}>
              <Radio.Button value="WAITING">WAITING</Radio.Button>
              <Radio.Button value="PAID">PAID</Radio.Button>
              <Radio.Button value="CANCEL">CANCEL</Radio.Button>
            </Radio.Group>
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
                            "url(" + item?.forProduct?.imgUrl + ")",
                        }}
                      >
                        <div className="filterbg">
                          <p className="text-light">
                            {item?.forProduct?.productName}
                          </p>
                          <p className="text-light">
                            Price: {item?.forProduct?.price} USD
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {item?.promotions?.map((item, i) => {
                  return (
                    <div className="col-6 mt-2">
                      <div className="bg-dark boxpromotion text-lightml-3">
                        <p className="text-light">{item.promotionId}</p>
                        <p className="text-light">
                          Price: {item?.forPromotion?.price} US
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Accordion.Collapse>
          </Accordion>
          <hr />
        </div>
        <button
          className="btn btn-primary ml-3"
          onClick={() => updateOrder(item)}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default OrderCardAdmin;
