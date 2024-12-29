import { NextResponse } from 'next/server';
import { stytchClient } from '@/lib/stytchClient';
import { getIronSession } from 'iron-session/edge';
import { sessionOptions } from '@/lib/sessionOptions';

export async function POST(req) {
  try {
    console.log(sessionOptions)
    const { token } = await req.json(); 

    const response = await stytchClient.oauth.authenticate( {token});
    
    const res = NextResponse.json({ message: 'Google Token verified successfully', session: response });

    const session = await getIronSession(req, res, sessionOptions);
    session.token = response.session_jwt
    
    await session.save();

    return res;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
