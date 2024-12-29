'use client'

import React from 'react'
import Image from 'next/image'
import { Button, Tooltip } from 'antd'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { setShowPopup } from '@/redux/features/applicationSlice'
import toast from 'react-hot-toast'
import { setUser } from '@/redux/features/userSlice'
import { useRouter } from "next/navigation";

const DesktopHeader = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSignIn = () => {
        dispatch(setShowPopup({ type: "loginPopup", size: "sm" }))
    }

    const handleSignOutClick = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
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
                        {user ?
                            <Button onClick={handleSignOutClick} variant="filled" color='default' size='large'>LOGOUT</Button>
                            : <Button onClick={handleSignIn} variant='solid' color='default' size='large'>LOGIN</Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesktopHeader
