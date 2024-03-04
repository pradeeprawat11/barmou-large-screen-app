import React, { useEffect, useState, Fragment } from "react";
import "../../assets/styles/Menu.css";
import { useNavigate } from "react-router-dom";
import { Image, Dropdown, Modal, Card, Row, Col } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { PiHandbagSimple } from "react-icons/pi";
import GrLogo from "../../assets/images/greece.png";
import EnLogo from "../../assets/images/united-kingdom.png";
import { IoChevronDownSharp } from "react-icons/io5";
import masterCardLogo from '../../assets/images/master-card-logo.png'
import applePayLogo from '../../assets/images/apple-pay-logo.png'
import visaCardLogo from '../../assets/images/visa.png'

import { useSelector, useDispatch } from "react-redux";
import {
  getMenu as onGetMenu,
  getCategories as onGetCategories,
  addNotification as onAddNotification,
  getAssetInfo as onGetAssetInfo,
} from "../../slices/thunks";
import { addToCart, decreaseFromCart } from "../../slices/Cart/reducer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Menu = () => {
  const { menu, menuAddUpdate, categories, categoriesAddUpdate, cartItems, asset } =
    useSelector((state) => ({
      menu: state.menus.menu,
      status: state.menus.status,
      menuMsgResponse: state.menus.menuMsgResponse,
      menuAddUpdate: state.menus.menuAddUpdate,
      categoriesAddUpdate: state.categories.categoriesAddUpdate,
      categories: state.categories.categories,
      cartItems: state.cart.cartItems,
      notification: state.notifications.notification,
      asset: state.assets.asset
    }));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [menuList, setMenuList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedLogo, setSelectedLogo] = useState(EnLogo);
  const [show, setShow] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [addBtnStyle, setAddBtnStyle] = useState("d-none");
  const [itemCaptionStyle, setItemCaptionStyle] = useState("d-block");
  const [modelItem, setModelItem] = useState({});
  const [modelSetting, setModelSetting] = useState(false);
  const [assetIds, setAssetIds] = useState("");
  const [filterTerm, setFilterTerm] = useState('');
  const [videoShow, setVideoShow] = useState(false);


  useEffect(() => {
    const currentUrl = window.location.href;
    const urlSearchParams = new URLSearchParams(new URL(currentUrl).search);
    const assetId = urlSearchParams.get("assetId");
    setAssetIds(assetId)
    if (assetId !== localStorage.getItem("assetId")) {
      localStorage.setItem("assetId", assetId);
    }
    dispatch(onGetMenu({ assetId: `${assetId}` }));
    if (!localStorage.getItem("assetInfoData"))
      dispatch(onGetAssetInfo({ assetId: `${assetId}` }));

    setTimeout(function () {
      if (localStorage.getItem("assetInfoData")) {
        let assetInfo = JSON.parse(localStorage.getItem("assetInfoData"));
        dispatch(onGetCategories({ venueId: assetInfo.venueId }));
      }
    }, 3000);

  }, [dispatch, menuAddUpdate, categoriesAddUpdate]);

  useEffect(() => {
    window.addEventListener("scroll", handlePaggination);
    return () => window.removeEventListener("scroll", handlePaggination);
  }, []);

  setTimeout(function () {
    if (asset.length > 0) {
      localStorage.setItem("assetInfoData", JSON.stringify(asset[0]));
      if (asset[0].venueInfo.setting !== undefined)
        setModelSetting(asset[0].venueInfo.setting.modelB)
    }
  }, 3000);

  useEffect(() => {
    if (page === 1) {
      setMenuList(menu);
    } else {
      if (menu && menu.length > 0 && menuList)
        setMenuList((prevItems) => [...prevItems, ...menu]);
    }
  }, [menu, page]);

  useEffect(() => {
    const assetId = localStorage.getItem("assetId");
    dispatch(
      onGetMenu({
        categoryId: selectedCategoryId,
        page: `${page}`,
        assetId: `${assetId}`,
      })
    );
  }, [page, dispatch, selectedCategoryId]);

  const handlePaggination = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

  }, []);

  const handleCategoryClick = (event) => {
    setSelectedCategoryId(event ? event._id : "");
    const assetId = localStorage.getItem("assetId");
    setPage(1);
    dispatch(
      onGetMenu({ categoryId: selectedCategoryId, assetId: `${assetId}` })
    );
  };

  const callWaiter = () => {
    if (asset.length > 0) {
      let payload = {
        assetId: asset[0]._id,
        venueAreasId: asset[0].venueAreasId,
        venueId: asset[0].venueId,
        title: `Call For Waiter`,
        message: `Hello KDS someone user call for a waiter on the venue ${asset[0].venueInfo['name']} asset table ${asset[0].assetName}`,
        type: "CallWaiter",
      }
      dispatch(onAddNotification(payload))
      toast.success("Successfully Called please wait for sometime.")
    }
  }

  const handleAddToCart = (item) => {
    if (!isInCart(item._id)) {
      setModelItem(item);
      setShow(true);
    }
    dispatch(addToCart(item));
  };

  const handleDecreseFromCart = (id) => {
    dispatch(decreaseFromCart(id));
  };

  const isInCart = (id) => {
    const itemIndex = cartItems.findIndex((item) => item.menuId === id);
    if (itemIndex >= 0) {
      return true;
    } else {
      return false;
    }
  };

  const getQuantity = (id) => {
    const itemIndex = cartItems.findIndex((item) => item.menuId === id);
    return cartItems[itemIndex].quantity;
  };

  const handleItemOver = () => {
    setItemCaptionStyle("d-none");
    setAddBtnStyle("d-block");
  };

  const handleItemOut = () => {
    setItemCaptionStyle("d-block");
    setAddBtnStyle("d-none");
  };

  const handleViewCartClick = () => {
    navigate("/payment");
  };

  // Filter the data based on filterTerm
  let filteredMenu = [];
  if (menuList){
     filteredMenu = menuList.filter((item) => {
      const matchesSearchTerm = item.name.toLowerCase().includes(filterTerm.toLowerCase());
      return matchesSearchTerm;
    });
  }

  const handleModalClose = () => {
    setVideoShow(false)
    setShow(false)
  }

  return (
    <>
      <div className="lg-screen-component h-100">
          <header className="d-flex justify-content-between p-1 px-4">
            <div className="d-flex align-items-center">
              <div className="nav-language-icon rounded-circle overflow-hidden  _cursor-pointer">
                <Image className="_obj-fit-cover h-100 w-100" src='https://source.unsplash.com/random/?flag' />
              </div>
              <IoChevronDownSharp className="header-gray mx-1" />
            </div>
            <div className="nav-info d-flex align-items-center position-relative">
              <div className="header-gray px-4  _cursor-pointer">
                <h4>COLONESL'S</h4>
                <h2>FEAST</h2>
              </div>
              <div className="d-flex text-light  _cursor-pointer">
                <h3>€</h3>
                <h1>5,00</h1>
              </div>
              <div className="nav-img rounded-circle overflow-hidden position-absolute  _cursor-pointer">
                <Image className="_obj-fit-cover h-100 w-100" src='https://source.unsplash.com/random/?food,plate' />
              </div>
            </div>
          </header>
          <main className="d-flex position-relative">
            <div className="left-category-container position-relative">
              <div className="categories-contaier m-4">
                {categories &&
                (categories.length === 0 ? (
                  <p>No Item</p>
                ) : (
                  categories.map((category, index) => (
                    <>
                      <div key={index} className="left-category-container-img rounded-circle overflow-hidden  _cursor-pointer">
                        <Image className="_obj-fit-cover h-100 w-100" src={category.image} />
                      </div>
                      <h6>{category.name}</h6>
                    </>
                  ))
                ))}
              </div>
              <div className="category-scroll-down-btn w-100 text-center py-2 position-sticky">
                <IoChevronDownSharp className="foot-bag-icon border-rounded rounded-circle p-2 text-light" size={50} />
              </div>
            </div>
            <Row className="menu-items-container justify-content-evenly m-0 w-100">
            {
              (filteredMenu.length === 0 ? (
                <p>No Item</p>
              ) : (
                filteredMenu.map((menu, index) => (
              <Col lg={3} md={4} sm={6}  key={index} className="menu-item-card m-2 py-2">
                <div className="menu-item-img rounded-5">
                  <Image className="_obj-fit-cover h-100 w-100 rounded-5" src='https://source.unsplash.com/random/?burger' />
                </div>
                <div className="d-flex justify-content-between">
                  <h3 className="m-0 p-0">Burger</h3>
                  <p className="m-0 p-0">€5,00</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="m-0 p-0">Single Patty Burger</p>
                  <CiEdit />
                </div>
                <div className="d-flex justify-content-between">
                  <div className="border border-dark d-flex justify-content-evenly align-items-center">
                    <span className="px-1">-</span>
                    <span className="px-3">1</span>
                    <span className="px-1">+</span>
                  </div>
                  <div className="buy-now-buttton rounded-3 p-1 d-flex align-items-center text-light">
                    <h5 className="p-0 m-0">Buy Now</h5>
                  </div>
                </div>
              </Col>
                ))
              ))}
            </Row>
          <footer className="d-flex justify-content-between align-items-center p-3 position-absolute bg-light">
            <h4>Back</h4>
            <div onClick={() => setShowPaymentModal(true)}  className="foot-payment-button p-2 rounded-pill text-light px-3"> <h4 className="p-0 m-0"> Continue To Payment </h4></div>
            <PiHandbagSimple className="foot-bag-icon border-rounded rounded-circle p-2 text-light" size={50} />
          </footer>
          </main>
          <Modal className="payment-option-modal" show={showPaymentModal} fullscreen={true} onHide={() => setShowPaymentModal(false)}>
            <div className="d-flex justify-content-end p-2">
              <IoClose
                className="_close-icon _z-index-2 rounded-circle bg-light _cursor-pointer"
                size={25}
                onClick={()=>setShowPaymentModal(false)}
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
      </div>
    </>
  );
};

export default Menu;
