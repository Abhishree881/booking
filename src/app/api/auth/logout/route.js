import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session/edge';
import { sessionOptions } from '@/lib/sessionOptions';
import { stytchClient } from '@/lib/stytchClient';

export async function DELETE(req) {
  try {
    const session = await getIronSession(req, new Response(), sessionOptions);
    const token = session.token ?? null;
    const response = await stytchClient.sessions.revoke({
      session_jwt: token,
    });

    session.destroy();

    const res = NextResponse.json({ message: 'Logout successful' , res: response});
    res.cookies.set('user_access_token', '', { maxAge: 0, path: '/' });

    return res;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
