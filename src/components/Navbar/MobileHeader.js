'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button, Tooltip } from 'antd'
import Link from 'next/link'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const MobileHeader = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
    
  return (
    <div className='nav-container'>
      <div className='navbar'>
        {openSidebar? <MobileDropdown/> : null}
        <div className='nav-left'>
            <div className='nav-logo'>
                <Image src={'/logo.png'} alt='logo' width={50} height={50} />
                <div className='nav-title'>
                    <h1>Booking App</h1>
                </div>
            </div>
        </div>
        <div className='nav-right'>
            <div className='nav-button' onClick={() => setOpenSidebar(!openSidebar)}>
                {!openSidebar?
                    <GiHamburgerMenu /> :
                    <IoClose />
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default MobileHeader

const MobileDropdown = () => {
    return (
        <div className='mobile-nav'>
            <div className='mobile-tiles'>
                <Link className='mobile-tile' href="/">
                    Home
                </Link>
                <Link className='mobile-tile' href="/profile">
                    Profile
                </Link>
                <Link className='mobile-tile' href='/seat-map'>
                    SeatMap (Available seats)
                </Link>
                <Button type='primary' size='large'>LOGIN</Button>
            </div>
        </div>
    )
}
