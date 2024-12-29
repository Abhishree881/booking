import { NextResponse } from 'next/server';
import { stytchClient } from '@/lib/stytchClient';
import { getIronSession } from 'iron-session/edge';
import { sessionOptions } from '@/lib/sessionOptions';

export async function POST(req) {
  try {
    const { token } = await req.json();

    const response = await stytchClient.magicLinks.authenticate( {
        token,
        session_duration_minutes: 60, 
    });

    const res = NextResponse.json({ message: 'Token verified successfully', session: response.user });

    const session = await getIronSession(req, res, sessionOptions);
    session.token = response.session_jwt
    await session.save();

    return res
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
