import React from 'react'
import { IoChevronDownSharp } from "react-icons/io5";
import { Image } from 'react-bootstrap';
import GrLogo from "../../assets/images/greece.png";
import './Header.css'
// import EnLogo from "../../assets/images/united-kingdom.png";

const Header = (props) => {

  function getValue(totalAmount) {
    if (totalAmount % 1 !== 0) {
      return totalAmount.toFixed(2);
    } else {
      return totalAmount;
    }
  }

  return (
    <>
    <header className="d-flex justify-content-between p-1 px-4">
            <div className="d-flex align-items-center">
                <div className="nav-language-icon rounded-circle overflow-hidden  _cursor-pointer">
                <Image className="_obj-fit-cover h-100 w-100" src={GrLogo} />
                </div>
                <IoChevronDownSharp className="header-gray mx-1" />
            </div>
            <div className="nav-info d-flex align-items-center position-relative">
                {props.totalAmount ?
                <div className="d-flex text-light  _cursor-pointer">
                  <h3>€</h3>
                  <h1>{getValue(props.totalAmount)}</h1>
                </div> : ''}
                {props.image ?
                <div className="bg_lightgray nav-img rounded-circle overflow-hidden position-absolute  _cursor-pointer">
                  <Image className="_obj-fit-cover h-100 w-100" src={props.image} />
                </div> : ''}
            </div>
        </header>
    </>
  )
}

export default Header