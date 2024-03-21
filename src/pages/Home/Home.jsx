import React, { useEffect, useState } from 'react'
import { IoChevronDownSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Dropdown, Image } from "react-bootstrap";
import './Home.css'
import { useSelector, useDispatch } from "react-redux";
import GrLogo from "../../assets/images/greece.png";
import {
  getAssetInfo as onGetAssetInfo,
  getMenu as onGetMenu,
} from "../../slices/thunks";

const Home = () => {
  const { menu, asset } =
    useSelector((state) => ({
      menu: state.menus.menu,
      asset: state.assets.asset
  }));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [assetId, setAssetId] = useState();
  const [assetInfo, setAssetInfo] = useState({});
  const [menuItem, setMenuItem] = useState()

  useEffect(() => {
    const currentUrl = window.location.href;
    const urlSearchParams = new URLSearchParams(new URL(currentUrl).search);
    const assetId = urlSearchParams.get("assetId");
    setAssetId(assetId);
    if (assetId !== localStorage.getItem("assetId")) {
      localStorage.setItem("assetId", assetId);
    }
    if (assetId)
      dispatch(onGetAssetInfo({ assetId: `${assetId}` }));
      dispatch(onGetMenu({ assetId: `${assetId}` }));
  }, [dispatch])

  useEffect(()=> {
    if (menu)
      setMenuItem(menu[0]);
  }, [menu])

  setTimeout(function () {
    if (asset.length > 0) {
      setAssetInfo(asset[0]);
      localStorage.setItem("assetInfoData", JSON.stringify(asset[0]));
    }
    if(!assetInfo){
      setAssetInfo(JSON.parse(assetInfo));
    }
  }, 2000);

  const handleTakeAwayClick = () => {
    navigate(`/menu?assetId=${assetId}`);
  };

  return (
    <>
      <div className='home-main-container text-light p-5 position-relative'>
        <Dropdown>
          <Dropdown.Toggle className='bg-transparent border-0 d-flex align-items-center' id="dropdown-basic">
            <div className="select-language-icon rounded-circle overflow-hidden  _cursor-pointer">
              <Image className="_obj-fit-cover h-100 w-100" src={GrLogo} />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>English</Dropdown.Item>
            <Dropdown.Item>Greek</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className='barmou-logo-container text-center'>
          <Image className="h-100 cursor_pointer" src={assetInfo.floorPlanImage} />
        </div>
        <div className='barmou-logo-container text-center'>
          {assetInfo.name}
        </div>
        <div className='d-flex justify-content-center align-items-center'>
          <div className='info_contaier w-100'>
            <h1>€ {menuItem ? menuItem.price : '0'}</h1>
            <h4>{menuItem ? menuItem.name : ''}</h4>
            <div className='d-flex my-4'>
              <button onClick={handleTakeAwayClick} className='border-0 p-3 rounded-pill mx-3'><h4>Takeaway</h4></button>
            </div>
            <div className='video-container' onClick={handleTakeAwayClick} >
              <video loop autoPlay muted className='home-bg-food-video cursor_pointer'>
                <source src={menuItem ? menuItem.video : 'https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/rnIdPf4Piqlaar11/videoblocks-crispy-rustic-potatoes-with-cuts-burger-and-red-sauce-on-wooden-board-close-up-fast-food-concept-with-no-people_bpzotaclvu__9e1caf9baccd7c330aa32475c6cad199__P360.mp4'} type='video/mp4' />
                Your browser does not support the video.
              </video>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home