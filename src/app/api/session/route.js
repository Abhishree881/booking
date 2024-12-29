import { getIronSession } from "iron-session/edge";
import { sessionOptions } from "@/lib/sessionOptions";
import { NextResponse } from "next/server";
import { stytchClient } from "@/lib/stytchClient";

export async function GET(req) {
  try{
    const session = await getIronSession(req, new Response(), sessionOptions);

    const token = session.token ?? null;
    const response = await stytchClient.sessions.authenticate({
        session_jwt: token,
    });
    

    const res = NextResponse.json({ message: 'Token verified successfully', session: response.user });
    return res;
  } catch (error) {
    return NextResponse.json({ message: error?.error_message ? error.error_message: error }, { status: error.status_code });
  }
}
