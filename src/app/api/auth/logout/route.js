import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session/edge';
import { sessionOptions } from '@/lib/sessionOptions';
import { stytchClient } from '@/lib/stytchClient';

export async function DELETE(req) {
  try {
    const session = await getIronSession(req, new Response(), sessionOptions); // get the session from the cookies
    const email = session.email ?? null;
    const token = session.token ?? null;
    if(email){ // if email it mean the user is logged in with google
      session.destroy();
      const res = NextResponse.json({ message: 'Logout successful' });
      res.cookies.set('user_access_token', '', { maxAge: 0, path: '/' });
      return res
    }
    const response = await stytchClient.sessions.revoke({
      session_jwt: token,
    }); // if token is present then logout the user

    session.destroy(); // destroy the session

    const res = NextResponse.json({ message: 'Logout successful' , res: response});
    res.cookies.set('user_access_token', '', { maxAge: 0, path: '/' }); // remove the session from the cookies

    return res;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
