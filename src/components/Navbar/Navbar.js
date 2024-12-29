'use client';

import React, { useEffect, useState } from 'react'
import '@/styles/navbar.css'
import DesktopHeader from './DesktopHeader';
import { isMobile } from 'react-device-detect';
import MobileHeader from './MobileHeader';

const Navbar = () => {
  const [showMobile, setShowMobile] = useState(false);

  useEffect(()=>{
    const media = window.matchMedia("(max-width: 767px)")
    media.addEventListener("change", (e) => {
      setShowMobile(e.matches);
    })
  })

  return (
    !isMobile && !showMobile?
        <DesktopHeader/> :
        <MobileHeader/>
  )
}

export default Navbar
