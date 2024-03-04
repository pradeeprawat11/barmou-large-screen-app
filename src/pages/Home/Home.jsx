import React from 'react'
import { IoChevronDownSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Image } from 'react-bootstrap';
import '../../assets/styles/Home.css'
import BarmouLogo from '../../assets/images/barmou-logo.png'
import PlateLogo from '../../assets/images/plate-fastfood.png'

const Home = () => {
  const navigate = useNavigate();

  const handleDineInClick = () => {
    navigate("/menu");
  };

  const handleTakeAwayClick = () => {
    navigate("/menu");
  };

  return (
    <>
    <div className='home-main-container text-light p-5 position-relative'>
        <div className="d-flex align-items-center">
            <div className="select-language-icon rounded-circle overflow-hidden  _cursor-pointer">
                <Image className="_obj-fit-cover h-100 w-100" src='https://source.unsplash.com/random/?flag' />
            </div>
            <IoChevronDownSharp className="header-gray mx-1" />
        </div>
        <div className='barmou-logo-container text-center'>
            <Image className="h-100" src={BarmouLogo} />
        </div>
        <h1>€<strong>3,00</strong></h1>
        <h4><strong>EAT & COFFEE</strong></h4>
        <div className='d-flex my-4'>
            <button onClick={handleDineInClick} className='border-0 p-3 rounded-pill'><strong>Dine in</strong></button>
            <button onClick={handleTakeAwayClick} className='border-0 p-3 rounded-pill mx-3'><strong>Takeaway</strong></button>
        </div>
        <h4><strong>1 Freddo Espresso</strong></h4>
        <h4><strong>1 bagel</strong></h4>
        <Image className='home-bg-food-image position-absolute' src={PlateLogo} />
    </div>
    </>
  )
}

export default Home