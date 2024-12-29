'use client'

import React from 'react'
import "@/styles/home.css"
import SearchContainer from './SearchContainer'
import { withAuth } from '@/utils/withAuth'

const HomePage = () => {
  return (
    <div className='home-page-container'>
      <div className='landing-component'>
        <div className='landing-page__left'>
          <SearchContainer />
        </div>
        <div className='landing-page__right'>
          <div className='first'>BOOKING RAILWAYS</div>
          <div className='second'>Fast | Secure | Reliable</div>
        </div>
        <div className='landing-left-fade'></div>
      </div>
      <div className='about-developer'>
        Know more about the developer,&nbsp;<a href='https://abhishree-portfolio.web.app/' target='_blank'>here</a>
      </div>
    </div>
  )
}

export default withAuth(HomePage)
