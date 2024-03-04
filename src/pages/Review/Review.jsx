import React from 'react'
import { useEffect, useState } from 'react';
import { Button, Col, Image, Row } from 'react-bootstrap'
import { FaStar } from "react-icons/fa";

import {
  getAssetInfo as onGetAssetInfo
} from "../../slices/thunks";
import { useSelector, useDispatch } from "react-redux";
import BarmouLogo from '../../assets/images/barmou-logo.png'
import QRCode from '../../assets/images/qr.png'


const Review = () => {
  const { asset } =
    useSelector((state) => ({
      asset: state.assets.asset
    }));
  const dispatch = useDispatch();
  const [assetId, setAssetId] = useState();
  const [assetInfo, setAssetInfo] = useState("");

  useEffect(() => {
    setAssetId(localStorage.getItem("assetId"));
    if(assetId !== null) {
      dispatch(onGetAssetInfo({ assetId: assetId }));
    }
  }, [assetId, dispatch]);

  const handleReviewClick = (url) => {
    window.open(url, '_blank');
  }

  return (
    <> 
      <Row className='p-0 m-0 px-1' fluid>
      {(asset && asset.length > 0) &&
        (asset[0].venueInfo.review.map((review, index) => (
          <Col key={index} onClick={()=>handleReviewClick(review.link)} xs={12} sm={6} md={4} lg={3} xl={2} className='border m-2 p-3 rounded _cursor-pointer text-center'>
              <h6>If you enjoyed our place we would appreciate a 5 star review thanks 
                <div className='text-success'>{review.name}</div>
                </h6>
              <div className='d-flex justify-content-center'>
              {/* <div className='w-50 rounded d-flex justify-content-center align-items-center overflow-hidden' style={{ height: "4rem" }}>
                <Image className='_obj-fit-cover w-100 h-100' src={`https://source.unsplash.com/random/?${review.name},logo`} />
              </div> */}
              <div className='d-flex justify-content-center py-3'>
              {/* <div className='d-flex justify-content-center align-items-center overflow-hidden' style={{ height: "3rem" }}>
                <Image className='_obj-fit-cover w-100 h-100' src={(asset[0].floorPlanImage) ? asset[0].floorPlanImage : ""} />
              </div> */}
            </div> 
            <div className='w-75 rounded d-flex justify-content-center align-items-center overflow-hidden' 
           >
                <Image className='_obj-fit-cover w-100 h-100' src={QRCode } />
            </div>
              </div>
              <div className='py-2'><div> {review.rating}</div>
              {Array.from({ length: review.rating }, (_, index) => (
                <FaStar size={18} className='text-warning mx-1' />
              ))}
            </div>
            {/* <h5>TAP OR SCAN</h5> */}
            <div className='d-flex justify-content-center'>
            <div className='w-75 rounded d-flex justify-content-center align-items-center overflow-hidden' style={{ height:"6rem"}}>
               <Button className='p-2 bg-dark fw-bold border-0'>Rate Us</Button>
                {/* <Image className='_obj-fit-cover w-100 h-100' src={QRCode } /> */}
            </div>
            </div>
            {/* <div className='d-flex justify-content-center py-3'>
              <div className='w-25 rounded-circle d-flex justify-content-center align-items-center overflow-hidden' style={{ height: "3rem" }}>
                <Image className='_obj-fit-cover w-100 h-100' src={(asset[0].floorPlanImage) ? asset[0].floorPlanImage : ""} />
              </div>
            </div> */}
          </Col>
        )))}
      </Row>
    
    </>
  )
}

export default Review