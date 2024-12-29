"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Design/Loader';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function verifyToken() {
      const params = new URLSearchParams(window.location.search);
      const tokenType = params.get('stytch_token_type');
      const token = params.get('token');
      if (!token) {
        alert('Invalid token');
        return;
      }

      const apiUrl = tokenType === 'oauth' ? '/api/auth/google' : '/api/auth/verify';

      try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });

        console.log('User authenticated:', response);
        router.push('/'); 
      } catch (error) {
        console.error('Error verifying Magic Link:', error);
        alert('Failed to authenticate');
      }
    }

    verifyToken();
  }, [router]);
  

  return <div><Loader/></div>;
}
