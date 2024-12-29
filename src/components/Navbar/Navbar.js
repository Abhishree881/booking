'use client';

import React from 'react'
import '@/styles/navbar.css'
import DesktopHeader from './DesktopHeader';
import { isMobile } from 'react-device-detect';
import MobileHeader from './MobileHeader';

const Navbar = () => {
  return (
    !isMobile?
        <DesktopHeader/> :
        <MobileHeader/>
  )
}

export default Navbar
