import { getIronSession } from "iron-session/edge";
import { sessionOptions } from "@/lib/sessionOptions";
import { NextResponse } from "next/server";
import { stytchClient } from "@/lib/stytchClient";

export async function GET(req) {
  try{
    const session = await getIronSession(req, new Response(), sessionOptions);
    const email = session.email ?? null;
    const name = session.name ?? null;
    const id = session.id ?? null;
    const token = session.token ?? null; // fetch all the data from the session
    if(email && name && id){ /// if the user is logged in and email exist, it means that is oauth login as it does not provide jwt
      const session ={
        user_id: id,
        emails: [{email}],
        name: {
          first_name: name
        }
      }
      return NextResponse.json({ message:'Token verified successfully', session }); // return the session from cookie
    }

    const response = await stytchClient.sessions.authenticate({ // authenticate the session for magicLink
        session_jwt: token,
    });

    const res = NextResponse.json({ message: 'Token verified successfully', session: response.user }); // return the session from jwt
    return res;
  } catch (error) {
    return NextResponse.json({ message: error?.error_message ? error.error_message: error }, { status: error.status_code });
  }
}
