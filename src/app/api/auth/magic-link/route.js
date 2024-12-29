import { stytchClient } from '@/lib/stytchClient';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;
    const response = await stytchClient.magicLinks.email.loginOrCreate({
      email,
      login_magic_link_url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      signup_magic_link_url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    });

    return NextResponse.json({
      message: 'Magic Link sent successfully!',
      details: response,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
