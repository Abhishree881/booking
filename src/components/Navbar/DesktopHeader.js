'use client'

import React from 'react'
import Image from 'next/image'
import { Button, Tooltip } from 'antd'
import Link from 'next/link'

const DesktopHeader = () => {
  return (
    <div className='nav-container'>
      <div className='navbar'>
        <div className='nav-left'>
            <div className='nav-logo'>
                <Image src={'/logo.png'} alt='logo' width={50} height={50} />
                <div className='nav-title'>
                    <h1>Booking App</h1>
                </div>
            </div>
            <div className='nav-links'>
                <Link className='nav-link' href="/">
                    Home
                </Link>
                <Link href="/profile" className='nav-link'>
                    Profile
                </Link>
            </div>
        </div>
        <div className='nav-right'>
            <Link href='/seat-map'>
                <Tooltip title="See all the available and vacant seats">
                    SeatMap (Available seats)
                </Tooltip>
            </Link>
            <div>
                <Button type='primary' size='large'>LOGIN</Button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default DesktopHeader
