import React, { useEffect, useState } from 'react'
import { IoChevronDownSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Image, Row, Col, Dropdown } from "react-bootstrap";
import './Home.css'
import BarmouLogo from '../../assets/images/barmou-logo.png'
import PlateLogo from '../../assets/images/plate-fastfood.png'
import { useSelector, useDispatch } from "react-redux";
import GrLogo from "../../assets/images/greece.png";
import EnLogo from "../../assets/images/united-kingdom.png";
import {
  getAssetInfo as onGetAssetInfo,
} from "../../slices/thunks";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [assetId, setAssetId] = useState();
  const [assetInfo, setAssetInfo] = useState({});
  const [selectedLogo, setSelectedLogo] = useState(EnLogo);

  const { asset } =
    useSelector((state) => ({
      asset: state.assets.asset
    }));

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
  }, [dispatch])

  setTimeout(function () {
    if (asset.length > 0) {
      setAssetInfo(asset[0]);
      localStorage.setItem("assetInfoData", JSON.stringify(asset[0]));
    }
    if(!assetInfo){
      setAssetInfo(JSON.parse(assetInfo));
    }
  }, 2000);

  const handleDineInClick = () => {
    navigate(`/menu?assetId=${assetId}`);
  };

  const handleTakeAwayClick = () => {
    navigate(`/menu?assetId=${assetId}`);
  };

  return (
    <>
      <div className='home-main-container text-light p-5 position-relative'>
        <div className="d-flex align-items-center">
          <div className="select-language-icon rounded-circle overflow-hidden  _cursor-pointer">
          <Image className="_obj-fit-cover h-100 w-100" src={GrLogo} />
           
          </div>
          <IoChevronDownSharp className="header-gray mx-1" />
        </div>
        <div className='barmou-logo-container text-center'>
          <Image className="h-100 cursor_pointer" src={assetInfo.floorPlanImage} />
        </div>
        <div className='barmou-logo-container text-center'>
        {assetInfo.name}
        </div>
        <h1>€<strong>3,00</strong></h1>
        <h4><strong>EAT & COFFEE</strong></h4>
        <div className='d-flex my-4'>
          {/* <button onClick={handleDineInClick} className='border-0 p-3 rounded-pill'><strong>Dine in</strong></button> */}
          <button onClick={handleTakeAwayClick} className='border-0 p-3 rounded-pill mx-3'><strong>Takeaway</strong></button>
        </div>
        <h4>
          <strong>1 Freddo Espresso</strong>
        </h4>
        <h4>
          <strong>1 bagel</strong>
        </h4>
        <Image onClick={handleDineInClick} className='home-bg-food-image position-absolute cursor_pointer' src={PlateLogo} />
      </div>
    </>
  )
}

export default Home