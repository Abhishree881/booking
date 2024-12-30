import { NextResponse } from 'next/server';
import { supabaseClient } from '@/lib/supabaseClient';

export async function POST(req) {
  try {
    const { userId } = await req.json();

    const { data, error } = await supabaseClient
      .from("tickets")
      .select("*")
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
    
    return NextResponse.json({ tickets: data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
