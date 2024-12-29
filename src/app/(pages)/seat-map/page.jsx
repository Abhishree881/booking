'use client'

import Loader from '@/components/Design/Loader'
import React, { useEffect, useState } from 'react'
import "@/styles/seatmap.css"
import ChairIcon from '@mui/icons-material/Chair';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';

const page = () => {
  const [loading, setLoading] = useState(true)
  const [seats, setSeats] = useState([])
  const [rows, setRowSeats] = useState([])
  const [availableSeats, setAvailableSeats] = useState([])

  useEffect(() => {
    const fetchApiData = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/seats")
        const data = await response.json()
        setSeats(data.availableSeats)
        data.availableSeats.forEach((seat) => {
          setAvailableSeats((prevSeats) => [...prevSeats, seat.seat_number])
        })
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    const numbers = Array.from({ length: 80 }, (_, i) => i + 1); // Generate numbers from 1 to 80
    const rows = [];

    for (let i = 0; i < numbers.length; i += 7) {
      rows.push(numbers.slice(i, i + 7));
    }
    setRowSeats(rows)
    fetchApiData()
  }, [])


  return (
    loading ? <Loader /> :
      <div className='seat-map-container'>
        <div className='seat-map'>
          <div className='seat-map__left'>
            <h1>Available Seat Map</h1>
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
              {seats.map((seat, index) => (
                <div key={index} className='seat'>
                  <div>Seat </div>
                  <div className='seat__number'>{seat.seat_number}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}

export default page
