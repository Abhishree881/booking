'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button, Tooltip } from 'antd'
import Link from 'next/link'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'
import { setShowPopup } from '@/redux/features/applicationSlice'
import toast from 'react-hot-toast'
import { setUser } from '@/redux/features/userSlice'
import { useRouter } from "next/navigation";
// navbar for mobile
const MobileHeader = () => {
    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <div className='nav-container'>
            <div className='navbar'>
                {openSidebar ? <MobileDropdown /> : null} 
                {/* open dropdown with options */}
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
                        {!openSidebar ?
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
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user);
    const router = useRouter();

    const handleLoginClick = () => {
        dispatch(setShowPopup({ type: 'loginPopup', size: 'sm' })) // show login popup
    }

    const handleSignOutClick = async () => {
        try {
            const response = await fetch('/api/auth/logout', { //  sign out
                method: 'DELETE',
            })
            if (response.ok) {
                toast.success('Logout successful');
                dispatch(setUser(null))
                router.push('/')
            } else {
                toast.error('Something went wrong. Please try again later.');
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again later.');
        }
    }

    const handleProfileClick = () => {
        if (!user) {
            dispatch(setShowPopup({ type: "loginPopup", size: "sm" })) // don't allow if not logged in
        } else {
            router.push('/profile')
        }
    }

    return (
        <div className='mobile-nav'>
            <div className='mobile-tiles'>
                <Link className='mobile-tile' href="/">
                    Home
                </Link>
                <div className='mobile-tile' onClick={handleProfileClick}>
                    Profile
                </div>
                <Link className='mobile-tile' href='/seat-map'>
                    SeatMap (Available seats)
                </Link>
                {user ? (
                    <Button onClick={handleSignOutClick} color='default' size='large' variant='filled'>LOGOUT</Button>
                ) : (
                    <Button onClick={handleLoginClick} color='default' size='large' variant='solid'>LOGIN</Button>
                )}
            </div>
        </div>
    )
}
