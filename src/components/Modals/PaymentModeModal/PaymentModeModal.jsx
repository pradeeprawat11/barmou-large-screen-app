import React from 'react'
import { Modal, Row, Col, Image } from 'react-bootstrap'
import masterCardLogo from '../../../assets/images/master-card-logo.png'
import visaCardLogo from '../../../assets/images/master-card-logo.png'
import applePayLogo from '../../../assets/images/master-card-logo.png'
import { IoClose } from "react-icons/io5";


const PaymentModeModal = () => {
  return (
    <>
        {/* <Modal className="payment-option-modal" show={showPaymentModal} fullscreen={true} onHide={() => setShowPaymentModal(false)}> */}
        <Modal className="payment-option-modal" fullscreen={true} >
            <div className="d-flex justify-content-end p-2">
              <IoClose
                className="_close-icon _z-index-2 rounded-circle bg-light _cursor-pointer"
                size={25}
                // onClick={()=>setShowPaymentModal(false)}
              />
            </div>
            <Modal.Body className="bg-dark d-flex justify-content-center align-items-center">
              <div className="payment-methods-container text-center">
                <h2 className="text-light">Select Payment Method</h2>
                <div className="bg-light rounded p-4 mt-4">
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
                <div className="bg-light rounded p-4 mt-4">
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