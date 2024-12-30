
import React, { useState } from 'react';
import { Input, Button, Tag, Spin } from 'antd';
import toast from 'react-hot-toast';

const PnrEnquiryPopup = () => {
  const [pnr, setPnr] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePnrSubmit = async () => {
    if (!pnr || pnr.length < 6) {
      toast.error('Please enter a valid PNR number');
      return;
    }

    setLoading(true);
    try {
      await fetch(`/api/booking/pnr/${pnr}`).then((res) => res.json()) // pnr api
      .then((data) => {
        if(data.error){
            toast.error(data.error)
            return;
        }
        console.log(data.data[0].seats)
        setBookingDetails(data.data[0]);
      })
    } catch (error) {
      toast.error('Failed to fetch PNR details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // pnr enquiry popup
  return (
    <>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Input
          placeholder="Enter PNR Number"
          value={pnr}
          onChange={(e) => setPnr(e.target.value)}
          style={{ width: '70%' }}
        />
        <Button type="primary" onClick={handlePnrSubmit}>
          Search
        </Button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Spin size="large" />
        </div>
      )}
      {/* loading spinner */}
      {/* show booking details once pnr api is called */}
      {bookingDetails && !loading && (
        <div>
          <h3>Booking Details:</h3>
          <p>
            <strong>Seats:</strong>
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {bookingDetails.seats.map((seat, index) => (
              <Tag color="blue" key={index}>
                Seat {seat}
              </Tag>
            ))}
          </div>
        </div>
      )}
      </>
  );
};

export default PnrEnquiryPopup;
