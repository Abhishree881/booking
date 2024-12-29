import React, { useState } from 'react'
import "@/styles/login.css"
import { Button, Input } from 'antd'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { closePopup } from '@/redux/features/applicationSlice';

const LoginPopup = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleLogin = async () => {
      setLoading(true);
        const response = await fetch('/api/auth/magic-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        if (response.ok) {
          toast.success('Magic Link sent to your email successfully!');
          setLoading(false);
          dispatch(closePopup());
        } else {
          toast.error('Please use gmail account only.');
          setLoading(false);
          dispatch(closePopup());
        }
      };

  return (
    <div className='login-popup'>
      <div className='login-popup-content'>
        <div className='login-header'>Login</div>
        <div className='login-section'>
            <Input value={email} onChange={(e) =>  setEmail(e.target.value)} type='email' size='large' placeholder='Email'  />
            <Button loading={loading} onClick={handleLogin} type='primary'>Login</Button>
        </div>
      </div>
    </div>
  )
}

export default LoginPopup
