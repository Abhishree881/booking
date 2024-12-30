"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Design/Loader';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function verifyToken() {
      const params = new URLSearchParams(window.location.search); // Get the query parameters
      const tokenType = params.get('stytch_token_type'); // Get the token type
      const token = params.get('token'); // Get the token
      if (!token) {
        alert('Invalid token');
        return;
      }
      // checking the token type to use different verification methods
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
  // this page accepts the token from the magic link and oauth
  // stytch will redirect to this page with the token whenever a request is made

  return <div><Loader/></div>;
}
