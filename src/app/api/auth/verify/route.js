import { NextResponse } from 'next/server';
import { stytchClient } from '@/lib/stytchClient';
import { getIronSession } from 'iron-session/edge';
import { sessionOptions } from '@/lib/sessionOptions';
import { supabaseClient } from '@/lib/supabaseClient';

export async function POST(req) {
  try {
    const { token } = await req.json();

    const response = await stytchClient.magicLinks.authenticate({
      token,
      session_duration_minutes: 60,
    });

    const id = response.user.user_id;
    const email = response.user.emails[0].email;
    const name = response.user.name.first_name;
    const { data, error } = await supabaseClient
      .from("users")
      .upsert({ id, email, name }, { onConflict: "id" });

    if (error) throw error;

    const res = NextResponse.json({ message: 'Token verified successfully', session: response.user });

    const session = await getIronSession(req, res, sessionOptions);
    session.token = response.session_jwt
    await session.save();

    return res
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
