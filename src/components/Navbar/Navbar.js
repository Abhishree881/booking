'use client';

import React, { useEffect, useState } from 'react'
import '@/styles/navbar.css'
import DesktopHeader from './DesktopHeader';
import { isMobile } from 'react-device-detect';
import MobileHeader from './MobileHeader';
import { useDispatch, useSelector } from 'react-redux';
import { setShowMobile } from '@/redux/features/applicationSlice';

const Navbar = () => {
  const { showMobile } = useSelector((state) => state.application);
  const dispacth = useDispatch();

  useEffect(()=>{
    const media = window.matchMedia("(max-width: 767px)")
    media.addEventListener("change", (e) => {
      dispacth(setShowMobile(e.matches));
    })
  })

  // showing navbar based on media

  return (
    isMobile || showMobile?
      <MobileHeader/>:
      <DesktopHeader/> 
  )
}

export default Navbar
