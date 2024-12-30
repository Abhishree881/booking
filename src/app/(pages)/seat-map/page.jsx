'use client'

import Loader from '@/components/Design/Loader'
import React, { useEffect, useState } from 'react'
import "@/styles/seatmap.css"
import ChairIcon from '@mui/icons-material/Chair';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import { Button, Tag } from 'antd';
import toast from 'react-hot-toast';

const page = () => {
  const [loading, setLoading] = useState(true)
  const [rows, setRowSeats] = useState([])
  const [availableSeats, setAvailableSeats] = useState([])

  const fetchApiData = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/seats") // fetching the seats
      const data = await response.json()
      const availableSeats = []
      data.availableSeats.forEach((seat) => {
        availableSeats.push(seat.seat_number)
      })
      setAvailableSeats(availableSeats.sort((a, b) => a - b))
      setLoading(false)
      const numbers = Array.from({ length: 80 }, (_, i) => i + 1); // Generate numbers from 1 to 80
      const rows = [];

      for (let i = 0; i < numbers.length; i += 7) {
        rows.push(numbers.slice(i, i + 7));
      }
      setRowSeats(rows) // this is generating the rows of seats to show the seats in the required format
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    fetchApiData()
  }, [])

  const handleReset = async () => {
    try {
      const response = await fetch("/api/tickets/reset") // reset the seats
      if (response.ok) {
        toast.success("Seats Reset Successfully")
      } else {
        toast.error("Something went wrong")
      }
      fetchApiData() // fetch the seats again
    } catch (error) {
      toast.error(error)
    }
  }

  // this page shows the available seats and booked seats
  return (
    loading ? <Loader /> :
      <div className='seat-map-container'>
        <div className='seat-map'>
          <div className='seat-map__left'>
            <h1>Available Seat Map</h1>
            <div className='seat-map__left__seats'>
              <Tag color="blue" style={{ margin: '4px' }}>Available: {availableSeats.length}</Tag>
              <Tag color="blue" style={{ margin: '4px' }}>Booked: {80 - availableSeats.length}</Tag>
              <Tag color="blue" style={{ margin: '4px' }}>Total: {80}</Tag>
              <Button onClick={handleReset} color="blue" style={{ margin: '4px' }} variant='solid' size='small'>Reset</Button>
            </div>
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className='seat-row'>
                {row.map((seatNumber) => (
                  <div key={seatNumber} className='seat'>
                    {availableSeats.includes(seatNumber) ? (
                      <ChairOutlinedIcon className='seat__icon' />
                    ) : (
                      <ChairIcon style={{ color: 'gray' }} className='seat__icon' />
                    )}
                    <div className='seat__number'>{seatNumber}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className='seat-map__right'>
            <h1>Available Seat Chart</h1>
            <div className='seat-chart'>
              {availableSeats.map((seat, index) => (
                <div key={index} className='seat'>
                  <div>Seat </div>
                  <div className='seat__number'>{seat}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}

export default page
