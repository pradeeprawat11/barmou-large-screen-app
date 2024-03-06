import {React, useState} from 'react'
// import { Image } from 'react-bootstrap';
import { RxCross2 } from "react-icons/rx";
import { IoIosStar } from "react-icons/io";

import '../../assets/styles/Review.css'

import { useNavigate } from "react-router-dom";

import reviewData from './demoData'

const Review = () => {
  const navigate = useNavigate();
  const [assetId, setAssetId] = useState("");


  const handleBackClick = () => {
    navigate("/menu")
  }
  return (
    <>
      <div className='text-center p-5'>
        <div className='d-flex justify-content-end'>
          <div onClick={handleBackClick} className='d-flex align-items-center bg_lightgray rounded-circle p-1 cursor_pointer'>
            <RxCross2 />
          </div>
        </div> 
        <div className='d-flex align-items-center'>
          <h2 className='m-0'>Rate us on</h2>
          <div className='d-flex align-items-center'>
            {Array.from({ length: 5 }, (_, i) => (
              <IoIosStar size={20} className='text-warning mx-1' />
            ))}
          </div>
        </div>
        {reviewData.map((review, index) => (
          <div key={index} className='d-flex justify-content-between align-items-center my-3'>
            <div className='brand_logo_img_container'>
              {/* <Image className='h-100' src={review.url} /> */}
              <h4 className='m-0'>{review.name}</h4>
            </div>
            <div>
              {Array.from({ length: review.review }, (_, i) => (
                <IoIosStar key={i} size={20} className='text-warning mx-1' />
              ))}
            </div>
          </div>
        ))}
        <h2 className='my-5'>We would love and appreciate your Feedback</h2>
        <button className='p-2 px-4 rounded bg_brown border-0 shadow-lg'><h2 className='m-0'>Generate Invoice</h2></button>
      </div>
    </>
  )
}

export default Review