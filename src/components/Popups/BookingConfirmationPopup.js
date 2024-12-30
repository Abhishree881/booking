import React from 'react'
import { Tag } from 'antd'
import { useSelector } from 'react-redux';
import "@/styles/confirmation.css"

const BookingConfirmationPopup = () => {
    const {popupData} = useSelector((state) => state.application);
  return (
    <div className="confirmation-popup">
      <h2>Booking Confirmation</h2>
      <div className="selected-seats">
        <p>Selected Seats:</p>
        {popupData?.map((seat) => (
          <Tag key={seat} color="blue" style={{ margin: '4px' }}>
            Seat {seat}
          </Tag>
        ))}
      </div>
      <div className="confirmation-message">
        <p>Your seats have been successfully booked!, you can view or cancel them in profile section</p>
      </div>
    </div>
  )
}

export default BookingConfirmationPopup