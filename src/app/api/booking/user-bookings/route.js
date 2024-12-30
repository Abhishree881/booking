import { NextResponse } from 'next/server';
import { supabaseClient } from '@/lib/supabaseClient';

export async function POST(req) {
  try {
    // Get the user's ID from the request body
    const { userId } = await req.json();

    const { data, error } = await supabaseClient
      .from("tickets")
      .select("*")
      .eq("user_id", userId); // Filter by user ID

    if (error) throw new Error(error.message);
    
    return NextResponse.json({ tickets: data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
