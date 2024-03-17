import {React} from 'react'
import { Modal, Image } from 'react-bootstrap'
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import './MenuItemCustomizeModal.css'
import { useNavigate } from 'react-router-dom';

const MenuItemCustomizeModal = (props) => {

  const navigate = useNavigate();

  const handlePaymentClick = () => {
    navigate('/payment');
  }

  return (
    <>
    <Modal show={props.data ? true : false} fullscreen={true}>
    <div className="_model-img-container position-relative text-center">
      <IoClose
        className="_close-icon _z-index-2 rounded-circle bg-light position-absolute p-0 _cursor-pointer"
        size={25}
        onClick={props.onClick}
      />
      <Image
        className="_obj-fit-cover h-100"
        src={props.data.image}
        fluid
      />
    </div>
    <Modal.Body className="modal_body d-flex justify-content-center align-items-center">
      <div className='_model-content text-center'>
        <h1> <strong>{props.data.name}</strong></h1>
        <h6>{props.data.description}</h6>
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
        {props.menuFunctionProps.isInCart(props.data._id) &&
        <div onClick={handlePaymentClick} className="foot-payment-button p-2 rounded-pill text-light px-3 cursor_pointer"> <h4 className="p-0 m-0"> Continue To Payment </h4></div>}
        <h4 onClick={props.onClick} className='cursor_pointer'>Add More Items</h4>
        {props.menuFunctionProps.isInCart(props.data._id) ?
        <div className='d-flex align-items-center'>
          <FaMinus onClick={()=>props.menuFunctionProps.handleDecreseFromCart(props.data._id)} className='mx-2 bg_red rounded-circle p-1 text-light cursor_pointer' size={20} />
          <p className='m-0 mx-2'>{props.menuFunctionProps.getQuantity(props.data._id)}</p>
          <FaPlus onClick={()=>props.menuFunctionProps.handleAddToCart(props.data)} className='mx-2 bg_red rounded-circle p-1 text-light cursor_pointer' size={20} />
          <h5 size={10} className='m-0 mx-5'>€ 
            {(props.menuFunctionProps.getQuantity(props.data._id) * props.data.price % 1) !== 0
            ? (props.menuFunctionProps.getQuantity(props.data._id) * props.data.price).toFixed(2)
            : props.menuFunctionProps.getQuantity(props.data._id) * props.data.price}
          </h5>
        </div> 
        :
        <div className="buy-now-buttton rounded-3 p-1 d-flex align-items-center text-light">
          <h5 onClick={()=>props.menuFunctionProps.handleAddToCart(props.data)} className="p-0 m-0 cursor_pointer px-2">Add</h5>
        </div>}
      </footer>
    </Modal.Body>
  </Modal>
  </>
  )
}

export default MenuItemCustomizeModal