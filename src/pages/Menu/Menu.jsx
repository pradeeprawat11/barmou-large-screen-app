import React, { useEffect, useState, useRef } from "react";
import "./Menu.css";
import { useNavigate } from "react-router-dom";
import { Image, Row, Col, Spinner } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { PiHandbagSimple } from "react-icons/pi";
import { IoChevronDownSharp } from "react-icons/io5";
import MenuItemCustomizeModal from "../../components/Modals/MenuItemCustomizeModal/MenuItemCustomizeModal";
import { useSelector, useDispatch } from "react-redux";
import { IoMdDoneAll } from "react-icons/io";
import {
  getMenu as onGetMenu,
  getCategories as onGetCategories,
  addNotification as onAddNotification,
  getAssetInfo as onGetAssetInfo,
} from "../../slices/thunks";
import { addToCart, decreaseFromCart, getTotal } from "../../slices/Cart/reducer";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentModeModal from "../../components/Modals/PaymentModeModal/PaymentModeModal";
import Header from "../../components/Layout/Header";

const Menu = () => {
  const { menu, menuAddUpdate, menuStatusCode, categories, categoriesAddUpdate, cartItems, cartTotalAmout, asset } =
    useSelector((state) => ({
      menu: state.menus.menu,
      status: state.menus.status,
      menuMsgResponse: state.menus.menuMsgResponse,
      menuAddUpdate: state.menus.menuAddUpdate,
      menuStatusCode: state.menus.menuStatusCode,
      categoriesAddUpdate: state.categories.categoriesAddUpdate,
      categories: state.categories.categories,
      cartItems: state.cart.cartItems,
      cartTotalAmout: state.cart.cartTotalAmout,
      notification: state.notifications.notification,
      asset: state.assets.asset
    }));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [menuList, setMenuList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [modelSetting, setModelSetting] = useState(false);
  const [assetIds, setAssetIds] = useState("");
  const [filterTerm, setFilterTerm] = useState('');
  const [cutomizeModalData, setCutomizeModalData] = useState();
  const containerRef = useRef(null);
  const [scrollLoadig, setScrollLoadig] = useState(false)

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
      if (menu && menu.length > 0 && menuList) {
        setMenuList((prevItems) => [...prevItems, ...menu]);
        setScrollLoadig(false);
      }
    }
  }, [menu]);

  useEffect(() => {
    const assetId = localStorage.getItem("assetId");
    dispatch(
      onGetMenu({
        categoryId: selectedCategoryId,
        page: `${page}`,
        assetId: `${assetId}`,
      })
    );
  }, [page, dispatch]);

  useEffect(() => {
    dispatch(getTotal());
  }, [cartItems, dispatch]);

  const handlePaggination = async (containerRef) => {
    try {
      if (
        containerRef &&
        containerRef.current &&
        containerRef.current.scrollTop + containerRef.current.clientHeight + 1 >=
        containerRef.current.scrollHeight
      ) {
        setScrollLoadig(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => handlePaggination(containerRef);

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleCategoryClick = (event) => {
    setSelectedCategoryId(event ? event._id : "");
    if(page===1) {
      const assetId = localStorage.getItem("assetId");
      dispatch(
        onGetMenu({ categoryId: event ? event._id : "", assetId: `${assetId}` })
        );
      setMenuList(menu);
    }
    else {
      setPage(1);
    }
    
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
      setCutomizeModalData(item);
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

  const handleCartClick = () => {
    navigate("/payment");
  };

  const handleBackClick = () => {
    navigate(`/?assetId=${assetIds}`);
  };

  let filteredMenu = [];
  if (menuList){
     filteredMenu = menuList.filter((item) => {
      const matchesSearchTerm = item.name.toLowerCase().includes(filterTerm.toLowerCase());
      return matchesSearchTerm;
    });
  }

  const handleMenuItemClick = (menu) => {
    setCutomizeModalData(menu);
  }

  const handleCutomizeModalClose = () => {
    setCutomizeModalData();
  }

  const menuFunctionProps = {
    getQuantity: getQuantity,
    handleAddToCart: handleAddToCart,
    handleDecreseFromCart: handleDecreseFromCart,
    isInCart: isInCart,
  };

  return (
    <>
      <div className="h-100">
          <Header totalAmount={cartTotalAmout && cartTotalAmout} image={cartItems.length && cartItems[(cartItems.length)-1].image} />
          <main className="d-flex position-relative">
            <div className="left-category-container">
              <div className="categories-contaier h-100 m-4">
                {categories &&
                (categories.length === 0 ? (
                  <div className="h-100 d-flex justify-content-center align-items-center mx-5 px-2">
                    <Spinner animation="border" size="xl" variant="secondary" />
                  </div>
                ) : (
                  <>
                  <div className={`category-item-container`} onClick={()=>handleCategoryClick('')} >
                    <div className="left-category-container-img rounded-circle overflow-hidden _cursor-pointer">
                      <IoMdDoneAll className="_obj-fit-cover h-100 w-100" />
                    </div>
                    <h6 className="text-center">All</h6>
                  </div>
                  {categories.map((category, index) => (
                    <div key={index} className={`category-item-container ${(categories.length -1) === index ? 'pb_5' : ''}`} onClick={()=>handleCategoryClick(category)} >
                      <div className="left-category-container-img rounded-circle overflow-hidden _cursor-pointer">
                        <Image className="_obj-fit-cover h-100 w-100" src={category.image} />
                      </div>
                      <h6 className="text-center">{category.name}</h6>
                    </div>
                  ))}
                  </>
                ))}
              </div>
              <IoChevronDownSharp className="category-scroll-down-btn   foot-bag-icon border-rounded rounded-circle p-2 text-light position-absolute" size={50} />
            </div>
            <Row ref={containerRef} className="menu-items-container justify-content-evenly m-0 w-100">
            {
              (filteredMenu.length === 0 ? (
                <div className="h-100 d-flex justify-content-center align-items-center">
                  {(
                    (menuStatusCode && menuStatusCode===400) ?
                      <h2>No Items, In This Category</h2> :
                      <Spinner animation="border" size="xl" variant="secondary" />
                    )}
                    </div>
              ) : (
                filteredMenu.map((menu, index) => (
              <Col key={index} lg={3} md={4} sm={6} className="menu-item-card d-flex flex-column justify-content-between m-2 py-2">
                <div onClick={()=>handleMenuItemClick(menu)} className="menu-item-img rounded-5 cursor_pointer">
                  <Image className="_obj-fit-cover h-100 w-100 rounded-5" src={menu.image} />
                </div>
                  <div className="d-flex flex-column justify-content-between h-100">
                    <div>
                      <div onClick={()=>handleMenuItemClick(menu)} className="d-flex justify-content-between">
                        <h3 className="m-0 p-0">{menu.name}</h3>
                        <p className="m-0 p-0 text-nowrap mt-2">€ {menu.price}</p>
                      </div>
                      <div onClick={()=>handleMenuItemClick(menu)} className="d-flex justify-content-between align-items-center py-2">
                        <p className="m-0 p-0">{menu.description}</p>
                        <CiEdit />
                      </div>
                    </div>
                    <div className="cursor_pointer">
                      {isInCart(menu._id) ? 
                      <Row className="text-center text-light border_brown bg_brown m-0 p-0 rounded">
                        <Col onClick={() => handleDecreseFromCart(menu._id)}>-</Col>
                        <Col className="border">{getQuantity(menu._id)}</Col>
                        <Col onClick={() => handleAddToCart(menu)}>+</Col>
                      </Row>
                      :
                      <div onClick={() => handleAddToCart(menu)} className="buy-now-buttton w-100 rounded-3 p-1 d-flex align-items-center justify-content-center text-light">
                        <h5 className="p-0 m-0">Add</h5>
                      </div>}
                    </div>
                  </div>  
              </Col>
                ))
              ))}

              {(scrollLoadig && menu && page>1) && 
                <Spinner className="position-absolute top-50" animation="border" size="xl" variant="secondary" />
              }
            </Row>
          {cartItems.length>0 &&
          <footer className="d-flex justify-content-between align-items-center p-3 position-absolute bg-light">
            <h4 onClick={handleBackClick} className="cursor_pointer">Back</h4>
            <div onClick={() => setShowPaymentModal(true)}  className="foot-payment-button p-2 rounded-pill text-light px-3 cursor_pointer"> <h4 className="p-0 m-0"> Continue To Payment </h4></div>
            <PiHandbagSimple onClick={handleCartClick} className="foot-bag-icon border-rounded rounded-circle p-2 text-light cursor_pointer" size={50} />
          </footer>}
          </main>
         
          {showPaymentModal && 
            <PaymentModeModal onClick={()=>setShowPaymentModal(false)}/>
          }

          {cutomizeModalData && 
            <MenuItemCustomizeModal onClick={handleCutomizeModalClose} menuFunctionProps={menuFunctionProps} data={cutomizeModalData} />
          }
      </div>
    </>
  );
};

export default Menu;
