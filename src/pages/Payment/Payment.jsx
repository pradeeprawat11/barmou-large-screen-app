import React from "react";
import { useEffect, useState } from "react";
import { Image, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decreaseFromCart,
  clearCart,
  getTotal,
} from "../../slices/Cart/reducer";
import {
  addOrder as onAddOrder,
  resetOrderApiResponseFlag as onResetOrderApiResponseFlag,
  addNotification as onAddNotification,
} from "../../slices/thunks";
import { MdOutlineAddBox } from "react-icons/md";
import { TbPointFilled } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import "../../assets/styles/Payment.css";
import "../../assets/styles/Global.css";
import QRCode from "../../assets/images/qr.png";
import Star from "../../assets/images/star.png";
import BarmouLogo from "../../assets/images/barmou-logo.png";
import { IoIosArrowDown } from "react-icons/io";
import RevoultIcon from "../../assets/images/revoult-icon.png";
import { FaCheckCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Visa from "../../assets/images/visa.png";

const Payment = () => {
  const { cartItems, cartTotalAmout, orderStatusCode, cart } = useSelector(
    (state) => ({
      cart: state.cart,
      cartItems: state.cart.cartItems,
      cartTotalAmout: state.cart.cartTotalAmout,
      orderStatusCode: state.orders.orderStatusCode,
    })
  );

  const [assetId, setAssetId] = useState("");
  // const [orderStatus, setOrderStatus] = useState(false);
  const [isOrderAccepted, setIsOrderAccepted] = useState(false);
  const [show, setShow] = useState(false);
  const [assetInfo, setAssetInfo] = useState('');
  // const [spin, setSpin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for handling the form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    dispatch(getTotal());
  }, [cartItems, dispatch]);

  useEffect(() => {
    setAssetId(localStorage.getItem("assetId"));
  }, []);

  useEffect(() => {
    let assetInfo = localStorage.getItem("assetInfoData");
    if(assetInfo){
      setAssetInfo(JSON.parse(assetInfo));
      assetInfo = JSON.parse(assetInfo);
      if (assetInfo.venueInfo.setting !== undefined)
      if(!assetInfo.venueInfo.setting.modelB){
        navigate(`/menu?assetId=${localStorage.getItem("assetId")}`);
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (orderStatusCode != null) {
      setShow(true);
      if (orderStatusCode === 200) {
        // setOrderStatus(true);
        setIsOrderAccepted(true);
        dispatch(clearCart());
        const timeoutId = setTimeout(() => {
          dispatch(onResetOrderApiResponseFlag());
          // navigate(`/menu?assetId=${assetId}`)
          navigate(`/review`);
        }, 2000);
        // Cleanup the timeout to avoid memory leaks
        return () => clearTimeout(timeoutId);
      } else {
        const timeoutId = setTimeout(() => {
          dispatch(onResetOrderApiResponseFlag());
          navigate(`/menu?assetId=${assetId}`);
        }, 2000);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [orderStatusCode, dispatch, assetId, navigate]);

  // Handle Add To Cart
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  // Handle Remove From Cart
  const handleDecreseFromCart = (id) => {
    dispatch(decreaseFromCart(id));
  };

  const handleBackClick = () => {
    navigate(`/menu?assetId=${assetId}`);
  };

  const handleAddOrder = (paymentMethod) => {
    // setSpin(true);
    const orderData = {
      assetId: assetId,
      menu: cartItems,
      paymentMethod: paymentMethod,
    };
    dispatch(onAddOrder(orderData));
    let payload = {
      assetId: assetInfo._id,
      venueAreasId: assetInfo.venueAreasId,
      venueId: assetInfo.venueId,
      title: `New Reservation Order`,
      message: `Hello KDS new order arrived on ${assetInfo.venueInfo.name} asset table ${assetInfo.assetName}`,
      type: "NewOrder",
    }
    dispatch(onAddNotification(payload))
  };

  return (
    <>
      <div className="d-flex justify-content-center p-4 px-lg-5">
        <div className="_payment-container">
          {/* Navigation */}
          <div className="d-flex align-items-center">
            <FaArrowLeft
              onClick={handleBackClick}
              size={20}
              className="text-muted _cursor-pointer"
            />
            <h6 className="_font-l p-0 m-0 px-3">{(assetInfo.name) ? assetInfo.name : "BARMOU"}</h6>
          </div>
          {/* items */}
          <div className="_bottom-shadow border _rounded-medium mt-4">
            <div className="p-2">
              {cartItems.map((item, index) => (
                <div key={index} className="py-1">
                  <div className="d-flex justify-content-between ">
                    <div className="d-flex align-items-center">
                      <TbPointFilled className="text-success" />
                      <h6 className="p-0 m-0">{item.name}</h6>
                    </div>
                    <div className="_font-m d-flex">
                      <div
                        className="border mx-2 text-center d-flex _cursor-pointer"
                        style={{ height: "20px" }}
                      >
                        <span
                          onClick={() => handleDecreseFromCart(item._id)}
                          className="px-1 cursor-pointer"
                        >
                          -
                        </span>
                        <div style={{ width: "1rem" }}>{item.quantity}</div>
                        <span
                          onClick={() => handleAddToCart(item)}
                          className="px-1 cursor-pointer"
                        >
                          +
                        </span>
                      </div>
                      <p className="fw-bold p-0 m-0" style={{ width: "4rem" }}>
                        &#8364;{" "}
                        {(item.quantity * item.price) % 1 !== 0
                          ? (item.quantity * item.price).toFixed(2)
                          : item.quantity * item.price}
                      </p>
                    </div>
                  </div>
                  <p className="_font-s p-0 px-3 m-0 text-muted w-75">
                    {item.description}
                  </p>
                  <div className="d-inline align-items-center px-3 _cursor-pointer">
                    <span className="_font-s p-0 m-0 w-75">Customize</span>
                    <IoIosArrowDown className="mx-1" size={10} />
                  </div>
                </div>
              ))}
            </div>
            <div
              onClick={handleBackClick}
              className="d-flex justify-content-between p-2 border-top text-muted cursor-pointer _cursor-pointer"
            >
              <div className="px-3">
                <span className="_font-m">Add More Items</span>
              </div>
              <div>
                <MdOutlineAddBox />
              </div>
            </div>
            <div className="d-flex justify-content-between p-2 border-top text-muted cursor-pointer _cursor-pointer">
              <div className="px-3">
                <span className="_font-m">Add Instructions</span>
              </div>
              <div>
                <MdOutlineAddBox />
              </div>
            </div>
          </div>

          {/* Bill Details */}
          <h6 className="py-2 _font-l">Bill Details</h6>
          <div className="_bottom-shadow border _rounded-medium">
            <div className="d-flex justify-content-between p-2 px-4">
              <h6 className="p-0 m-0 text-muted">Items Total</h6>
              <h6 className="p-0 m-0">
                &#8364;{" "}
                {cartTotalAmout % 1 !== 0
                  ? cartTotalAmout.toFixed(2)
                  : cartTotalAmout}
              </h6>
            </div>
            <div className="d-flex justify-content-between p-2 px-4">
              <h6 className="p-0 m-0 text-muted">
                Taxes and Restaurant Charges
              </h6>
              <h6 className="p-0 m-0">&#8364; 0</h6>
            </div>
            <div className="d-flex justify-content-between p-2 border-top px-4">
              <h6>To Pay</h6>
              <h6>
                &#8364;{" "}
                {cartTotalAmout % 1 !== 0
                  ? cartTotalAmout.toFixed(2)
                  : cartTotalAmout}
              </h6>
            </div>
          </div>

          {/* Online Payment */}
          <h6 className="_font-l py-2">Online Payment</h6>
          <div className="_bottom-shadow border _rounded-medium my-1">
            <div
              onClick={() => handleAddOrder("RevolutPay")}
              className="py-1 p-2 _cursor-pointer"
            >
              <div className="d-flex cursor-pointer">
                <div
                  className="border p-1 d-flex justify-content-center align-items-center"
                  style={{ width: "2rem", height: "2rem" }}
                >
                  <Image className="" src={RevoultIcon} fluid />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <h5 className="p-0 m-0 px-2 text-muted">Revoult</h5>
                </div>
              </div>
            </div>
            <div className="border-top py-1 p-2">
              <div className="d-flex cursor-pointer">
                <div
                  className="border p-1 d-flex justify-content-center align-items-center"
                  style={{ width: "2rem", height: "2rem" }}
                >
                  <MdOutlineAddBox />
                </div>
                <div className="px-2">
                  <h5 className="p-0 m-0 _font-m">Add New</h5>
                  <p className="p-0 m-0 _font-s">
                    You need to have a registered Payment Method
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Credit Card */}
          <h6 className="_font-l py-2">Card Payment</h6>
          <div className="_bottom-shadow border _rounded-medium my-1">
            <div className="d-flex p-2 cursor-pointer">
              <div
                className="border d-flex justify-content-center align-items-center overflow-hidden"
                style={{ width: "2rem", height: "2rem" }}
              >
                <Image className="h-100" src={Visa} />
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <h5 className="p-0 m-0 px-2 text-muted">Visa Payment</h5>
              </div>
            </div>
            <div className="p-2 ">
              <Form className="" onSubmit={handleSubmit}>
                <Form.Group controlId="cardNumber">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="cardHolder">
                  <Form.Label>Cardholder Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="expirationDate">
                  <Form.Label>Expiration Date</Form.Label>
                  <Form.Control
                    type="text"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="cvv">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    required
                  />
                </Form.Group>
              </Form>
              <div className="d-flex justify-content-center mt-2">
                <button
                  className="_bg-col-voilet text-light rounded border-0 py-1"
                  onClick={() => handleAddOrder("CashPay")}
                >
                  Pay Now
                </button>
              </div>
            </div>
            {/* <div className="py-1 p-2">
              <div className="d-flex cursor-pointer">
                <div
                  className="border p-1 d-flex justify-content-center align-items-center"
                  style={{ width: "2rem", height: "2rem" }}
                >
                  <MdOutlineAddBox />
                </div>
                <div className="px-2">
                  <h5 className="p-0 m-0 text-muted">Add New Card</h5>
                  <p className="p-0 m-0 text-muted extra-small-text">
                    Save and Pay Via Cards
                  </p>
                </div>
              </div>
            </div> */}
          </div>

          <h6 className="_font-l py-2">Review</h6>
          <div className="_bottom-shadow border _rounded-medium my-1 mt-2">
            <div className="py-1 p-2">
              <div className="d-flex justify-content-between align-items-center ">
                <div className="">
                  <h6 className="p-0 m-0">Review Us On Google</h6>
                  <div className="d-flex">
                    <div style={{ height: "8px", width: "8px" }}>
                      <Image className="w-100" src={Star} fluid />
                    </div>
                    <div style={{ height: "8px", width: "8px" }}>
                      <Image className="w-100" src={Star} fluid />
                    </div>
                    <div style={{ height: "8px", width: "8px" }}>
                      <Image className="w-100" src={Star} fluid />
                    </div>
                    <div style={{ height: "8px", width: "8px" }}>
                      <Image className="w-100" src={Star} fluid />
                    </div>
                    <div style={{ height: "8px", width: "8px" }}>
                      <Image className="w-100" src={Star} fluid />
                    </div>
                  </div>
                </div>
                <div style={{ width: "35px" }}>
                  <Image className="w-100" src={BarmouLogo} />
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div>
                  <div className="" style={{ height: "6rem", width: "6rem" }}>
                    <Image className="w-100" src={QRCode} />
                  </div>
                  <h6 className="text-center">Tap or Scan</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} fullscreen={true}>
        <Modal.Body className="d-flex align-items-center justify-content-center h-100">
          {isOrderAccepted ? (
            <div className="text-center">
              <FaCheckCircle size={40} className="_text-light-green" />
              <h4 className="text-muted p-0 m-0 py-3">
                Order Placed Successfully
              </h4>
            </div>
          ) : (
            <div className="text-center">
              <ImCross
                size={40}
                className="text-light bg-danger rounded-circle p-2"
              />
              <h4 className="text-muted p-0 m-0 py-3">Order Rejected</h4>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Payment;
