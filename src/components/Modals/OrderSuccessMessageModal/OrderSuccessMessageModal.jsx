import React from 'react'
import { Modal } from 'react-bootstrap'
import { IoBagCheckOutline } from "react-icons/io5";
import { ImCross } from "react-icons/im";

const OrderSuccessMessageModal = (props) => {
  console.log(props)
  return (
    <>
    <Modal show={true} fullscreen={true}>
        <Modal.Body className="d-flex align-items-center bg-light justify-content-center h-100">
          {props.isOrderAccepted ? (
            <div className="text-center">
              <IoBagCheckOutline size={150} className="_text-light-green" />
              <h3 className="mt-3">Thank You!</h3>
              <h4 className='text-muted'>Your order is referenced {props.orderInfo.orderNumber} please check your screen at front desk for pickup</h4>
              <h2 className='mt-5 fw-bold'>{props.orderInfo.orderNumber}</h2>
              <button className='p-2 px-4 rounded bg_brown border-0 shadow-lg'><h2 className='m-0'>Thank You</h2></button>
            </div>
          ) : (
            <div className="text-center">
              <ImCross
                size={40}
                className="text-light bg-danger rounded-circle p-2"
              />
              {<h4 className="text-muted p-0 m-0 py-3">{props.ordersMessage ? props.ordersMessage : 'Order Not Placed'}</h4>}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default OrderSuccessMessageModal