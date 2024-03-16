import React from "react";
import { useEffect, useState } from "react";
import { Image, Form, Button, InputGroup } from "react-bootstrap";
import Collapse from 'react-bootstrap/Collapse';
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
import { MdOutlineAddBox,MdDelete } from "react-icons/md";
import { TbPointFilled } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import "../../assets/styles/Payment.css";
import "../../assets/styles/Global.css";
import { IoIosArrowDown } from "react-icons/io";
import RevoultIcon from "../../assets/images/revoult-icon.png";
import AppleIcon from "../../assets/images/apple-pay.png";
import GoogleIcon from "../../assets/images/google-pay.png";
import CashIcon from "../../assets/images/wallet.png";
import TipIcon from "../../assets/images/tip.png";
import OrderSuccessMessageModal from '../../components/Modals/OrderSuccessMessageModal/OrderSuccessMessageModal'

const Payment = () => {
  const { cartItems, cartTotalAmout, orderStatusCode, cart, cartTotalVat, cardNetAmount,orderMessage,orderInfo } = useSelector(
    (state) => ({
      cart: state.cart,
      cartItems: state.cart.cartItems,
      cartTotalAmout: state.cart.cartTotalAmout,
      cardNetAmount: state.cart.cardNetAmount,
      cartTotalVat: state.cart.cartTotalVat,
      orderStatusCode: state.orders.orderStatusCode,
      orderMessage: state.orders.orderMessage,
      orderInfo:state.orders.orderInfo
    })
  );

  const [assetId, setAssetId] = useState("");
  const [isOrderAccepted, setIsOrderAccepted] = useState(false);
  const [show, setShow] = useState(false);
  const [assetInfo, setAssetInfo] = useState('');
  const [ordersMessage, setOrderMessage] = useState('');
  const [orderData, setOrderData] = useState({});
  const [instruction, setInstruction] = useState('');
  const [tipsData, setTipAmount] = useState({});
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getInstructions = (e) => {
    setInstruction(e)
  };

  const addTip = (tip,totaAmount) => {
    let tipAmount = (totaAmount*tip)/100;
    setTipAmount({tip:tip,tipAmount:tipAmount,totaAmount:totaAmount+tipAmount})
  };

  const removeTip = (tip,totaAmount) => {
    setTipAmount({})
  };

  useEffect(() => {
    dispatch(getTotal());
  }, [cartItems, dispatch]);

  useEffect(() => {
    setAssetId(localStorage.getItem("assetId"));
  }, []);

  useEffect(() => {
    let assetInfo = localStorage.getItem("assetInfoData");
    if (assetInfo) {
      setAssetInfo(JSON.parse(assetInfo));
      assetInfo = JSON.parse(assetInfo);
      if (assetInfo.venueInfo.setting !== undefined)
        if (!assetInfo.venueInfo.setting.modelB) {
          navigate(`/menu?assetId=${localStorage.getItem("assetId")}`);
        }
    }
  }, [navigate]);

  useEffect(() => {
    if (orderStatusCode != null) {
      setShow(true);
      if (orderStatusCode === 200) {
        setOrderMessage(orderMessage);
        setOrderData(orderInfo);
        setIsOrderAccepted(true);
        dispatch(clearCart());
        const timeoutId = setTimeout(() => {
          dispatch(onResetOrderApiResponseFlag());
          navigate(`/review`);
        }, 2000);
        // Cleanup the timeout to avoid memory leaks
        return () => clearTimeout(timeoutId);
      } else {
        setOrderMessage(orderMessage);
        const timeoutId = setTimeout(() => {
          dispatch(onResetOrderApiResponseFlag());
          navigate(`/menu?assetId=${assetId}`);
        }, 3000);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [orderStatusCode, dispatch, assetId, navigate]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecreseFromCart = (id) => {
    dispatch(decreaseFromCart(id));
  };

  const handleBackClick = () => {
    navigate(`/menu?assetId=${assetId}`);
  };

  const handleAddOrder = (paymentMethod) => {
    const orderData = {
      assetId: assetId,
      menu: cartItems,
      paymentMethod: paymentMethod,
      tip:(!isNaN(tipsData.tip)) ? tipsData.tip : 0,
      instruction:instruction
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
            <h6 className="_font-l p-0 m-0 px-3">{(assetInfo.name) ? assetInfo.name : "AwinSoft"}</h6>
          </div>
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
                <span className="_font-m" onClick={() => setOpen(!open)}  aria-expanded={open}>Add Instructions</span>
              </div>
              <Collapse in={open}>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-default">
                  Instructions
                  </InputGroup.Text>
                  <Form.Control  as="textarea" onChange={(event) => getInstructions(event.target.value)}
                    aria-label="Default"
                    placeholder="Leave a instructions here"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </InputGroup>
            </Collapse>
              <div>
                <MdOutlineAddBox  onClick={() => setOpen(!open)}  aria-expanded={open} />
              </div>
            </div>
            <div className="d-flex justify-content-between p-2 border-top text-muted cursor-pointer _cursor-pointer">
              <div
                className="border p-1 d-flex justify-content-center align-items-center"
                style={{ width: "2rem", height: "2rem" }}
              >
                <Image className="" src={TipIcon} fluid />
              </div>
              <div className="px-3">
                <span className="_font-m">Say thanks with a Tip</span>
                <div className="_font-m"> <Button onClick={() => addTip(2,cartTotalAmout)}
                  variant="success"
                  size="sm"
                >
                  2 %
                </Button>{' '}
                  <Button onClick={() => addTip(5,cartTotalAmout)}
                    variant="success"
                    size="sm"
                  >
                    5 %
                  </Button>{' '}
                  <Button onClick={() => addTip(10,cartTotalAmout)}
                    variant="success"
                    size="sm"
                  >
                    10 %
                  </Button>{' '}<Button onClick={() => addTip(15,cartTotalAmout)}
                    variant="success"
                    size="sm"
                  >
                    15 %
                  </Button></div>
              </div>
              <div>
                <MdOutlineAddBox />
              </div>
            </div>
          </div>
          <h6 className="py-2 _font-l">Bill Details</h6>
          <div className="_bottom-shadow border _rounded-medium">
            <div className="d-flex justify-content-between p-2 px-4">
              <h6 className="p-0 m-0 text-muted">Items Net Value</h6>
              <h6 className="p-0 m-0">
                &#8364;{" "}
                {cardNetAmount}
              </h6>
            </div>
            <div className="d-flex justify-content-between p-2 px-4">
              <h6 className="p-0 m-0 text-muted">
                Vat and Restaurant Charges
              </h6>
              <h6 className="p-0 m-0">&#8364; {cartTotalVat}</h6>
            </div>
            <div className="d-flex justify-content-between p-2 px-4">
              <h6 className="p-0 m-0 text-muted">
                Tip {tipsData.tip}%
                {(!isNaN(tipsData.tip)) ? 
                    <Button onClick={() => removeTip(tipsData.tip,(Math.floor(tipsData.tipAmount * 100) / 100))}
                    variant="danger"
                    size="sm"
                  >
                    <MdDelete />
                  </Button>
                  : ""}
              </h6>
              <h6 className="p-0 m-0">&#8364; {(!isNaN(tipsData.tipAmount)) ? (Math.floor(tipsData.tipAmount * 100) / 100): 0}</h6>
            </div>
            <div className="d-flex justify-content-between p-2 border-top px-4">
              <h6>To Pay</h6>
              <h6 className="fw-bold">
                &#8364;{" "}
                {(!isNaN(tipsData.tipAmount))
                  ? (Math.floor(tipsData.totaAmount * 100) / 100) 
                  : cartTotalAmout.toFixed(2)}
              </h6>
            </div>

          </div>
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
                  <p className="p-0 m-0 _font-s">
                    Click here to pay
                  </p>
                </div>
              </div>
            </div>
          </div>
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
                  <Image className="" src={AppleIcon} fluid />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <h5 className="p-0 m-0 px-2 text-muted">Apple</h5>
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
                  <p className="p-0 m-0 _font-s">
                    Click here to pay
                  </p>
                </div>
              </div>
            </div>
          </div>
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
                  <Image className="" src={GoogleIcon} fluid />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <h5 className="p-0 m-0 px-2 text-muted">Google</h5>
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
                  <p className="p-0 m-0 _font-s">
                    Click here to pay
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="_bottom-shadow border _rounded-medium my-1">
            <div
              onClick={() => handleAddOrder("CashPay")}
              className="py-1 p-2 _cursor-pointer"
            >
              <div className="d-flex cursor-pointer">
                <div
                  className="border p-1 d-flex justify-content-center align-items-center"
                  style={{ width: "2rem", height: "2rem" }}
                >
                  <Image className="" src={CashIcon} fluid />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <h5 className="p-0 m-0 px-2 text-muted">Cash</h5>
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
                  <p className="p-0 m-0 _font-s">Pay cash to delivery partner or waiter.</p>
                  <p className="p-0 m-0 _font-s">
                    <button
                      className="_bg-col-voilet text-light rounded border-0 py-1"
                      onClick={() => handleAddOrder("CashPay")}
                    >
                      Pay with Cash
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {show && <OrderSuccessMessageModal ordersMessage={ordersMessage} isOrderAccepted={isOrderAccepted} />}
    </>
  );
};

export default Payment;