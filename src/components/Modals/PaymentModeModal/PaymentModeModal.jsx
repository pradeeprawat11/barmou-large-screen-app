import React from 'react'
import { Modal, Row, Col, Image } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import masterCardLogo from '../../../assets/images/master-card-logo.png'
import visaCardLogo from '../../../assets/images/visa.png'
import applePayLogo from '../../../assets/images/apple-pay-logo.png'
import { IoClose } from "react-icons/io5";
import './PaymentModeModal.css'

const PaymentModeModal = (props) => {

  const navigate = useNavigate();
  const handleSelectedPaymentModeClick = (mode) => {
    if(mode==='1') 
      navigate("/payment");
    else
      navigate("/payment");
  }
  return (
    <>
    <Modal className="payment-option-modal" show={true} fullscreen={true}>
        <div className="d-flex justify-content-end p-2">
            <IoClose
              className="_close-icon _z-index-2 rounded-circle _cursor-pointer text-light"
              size={25}
              onClick={props.onClick}
            />
        </div>
        <Modal.Body className="d-flex justify-content-center align-items-center">
            <div className="payment-methods-container text-center">
                <h2 className="text-light">Select Payment Method</h2>
                <div onClick={() => handleSelectedPaymentModeClick('1')} className="rounded p-4 mt-4 cursor_pointer bg-light">
                    <Row className="align-items-center">
                        <Col>
                            <Image className="_obj-fit-cover w-100 p-1" src={masterCardLogo} />
                        </Col>
                        <Col>
                            <Image className="_obj-fit-cover w-100 p-1" src={visaCardLogo} />
                        </Col>
                        <Col>
                            <Image className="_obj-fit-cover w-100 p-1" src={applePayLogo} />
                        </Col>
                        <Col>
                            <Image className="_obj-fit-cover w-100 p-1" src={masterCardLogo} />
                        </Col>
                    </Row>
                    <h5 className="p-0 m-0">PAY VIA CREDIT Card</h5>
                    <h5 className="p-0 m-0">Pay with Cash or Credit Card</h5>
                </div>
                <div onClick={() => handleSelectedPaymentModeClick('2')} className="bg-light rounded p-4 mt-4 cursor_pointer">
                    <h5 className="p-0 m-0">PAY AT COUNTER</h5>
                    <h5 className="p-0 m-0">OR</h5>
                    <h5 className="p-0 m-0">YOUR WAITER</h5>
                </div>
            </div>
        </Modal.Body>
    </Modal>
    </>
  )
}

export default PaymentModeModal