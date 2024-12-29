import { NextResponse } from 'next/server';
import { stytchClient } from '@/lib/stytchClient';
import { getIronSession } from 'iron-session/edge';
import { sessionOptions } from '@/lib/sessionOptions';
import { supabaseClient } from '@/lib/supabaseClient';

export async function POST(req) {
  try {
    console.log(sessionOptions)
    const { token } = await req.json();

    const response = await stytchClient.oauth.authenticate({ token });
    const id = response.user.user_id;
    const email = response.user.emails[0].email;
    const name = response.user.name.first_name;
    const { data, error } = await supabaseClient
      .from("users")
      .upsert({ id, email, name }, { onConflict: "id" });

    if (error) throw error;

    const res = NextResponse.json({ message: 'Google Token verified successfully', session: response });

    const session = await getIronSession(req, res, sessionOptions);
    session.id = id;
    session.email = email;
    session.name = name;

    await session.save();

    return res;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
