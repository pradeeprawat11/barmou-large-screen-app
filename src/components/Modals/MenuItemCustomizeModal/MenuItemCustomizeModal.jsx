import {React, useEffect, useState} from 'react'
import { Modal, Card, Image } from 'react-bootstrap'

import { IoClose } from "react-icons/io5";
import { LuSquareDot } from "react-icons/lu";
import { FaRegDotCircle } from "react-icons/fa";
import { PiHandbagSimple } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
// import { FaMinus } from "react-icons/fa6";


import './MenuItemCustomizeModal.css'

const MenuItemCustomizeModal = (props) => {

  return (
    <Modal show={props.data ? true : false} fullscreen={true}>
    <div className="_model-img-container position-relative">
      <IoClose
        className="_close-icon _z-index-2 rounded-circle bg-light position-absolute p-0 _cursor-pointer"
        size={25}
        onClick={props.onClick}
      />
      <Image
        className="_obj-fit-cover h-100 w-100"
        src={props.data.image}
        fluid
      />
    </div>
    <Modal.Body className="d-flex justify-content-center">
      <div className='_model-content text-center'>
        <h1 classname=""> <strong>Classic Burger</strong></h1>
        <h6>Classic bread with pattie of two slices</h6>
        <div className='d-flex justify-content-between mt-3'>
          <div className='d-flex align-items-center'>
            <input className='rounded-circle mx-1' type="checkbox" />
            <h5 className="m-0">Original</h5>
          </div>
          <div className='d-flex align-items-center'>
            <input className='rounded-circle mx-1' type="checkbox" />
            <h5 className="m-0">Zinger</h5>
          </div>
        </div>
        <div>
          <h5 className='text-start fw-bold mt-3'>Condiments</h5>
          <div className='d-flex justify-content-between'>
            <div className='d-flex align-items-center'>
              <input className='rounded-circle mx-1' type="checkbox" />
              <h5 className="m-0">Mayonnaise</h5>
            </div>
            <div className='d-flex align-items-center'>
              <input className='rounded-circle mx-1' type="checkbox" />
              <h5 className="m-0">Oregano</h5>
            </div>
          </div>
          <p className='px-4 text-start'>0.5 </p>
        </div>
        <div>
          <h5 className='text-start fw-bold mt-3'>Add-ons</h5>
          <div className='d-flex justify-content-between'>
            <div className='d-flex align-items-center'>
              <input className='rounded-circle mx-1' type="checkbox" />
              <h5 className="m-0">Extra Cheese</h5>
            </div>
            <div className='d-flex align-items-center'>
              <input className='rounded-circle mx-1' type="checkbox" />
              <h5 className="m-0">Double Cheese</h5>
            </div>
          </div>
          <div className='d-flex justify-content-between'>
            <p className='px-4 text-start'>0.5 </p>
            <p className='px-4 text-start'>0.5 </p>
          </div>
        </div>
      </div>
      <footer className="d-flex justify-content-between align-items-center p-3 position-absolute bg-light">
        <h4>Back</h4>
        <div className="foot-payment-button p-2 rounded-pill text-light px-3"> <h4 className="p-0 m-0"> Continue To Payment </h4></div>
        <div className='d-flex align-items-center'>
          <FaMinus className='mx-2 bg_brown rounded-circle p-1 text-light cursor_pointer' size={20} />
          <p className='m-0 mx-2'>1</p>
          <FaPlus className='mx-2 bg_brown rounded-circle p-1 text-light cursor_pointer' size={20} />
          <p size={10} className='m-0 mx-2'>3.95</p>
        </div>
      </footer>
    </Modal.Body>
  </Modal>
  )
}

export default MenuItemCustomizeModal