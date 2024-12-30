import { NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabaseClient
      .from("coach_seats")
      .select("seat_number")
      .eq("is_booked", false); // Filter seats that are not booked

    if (error) throw error;

    return NextResponse.json({ availableSeats: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch seats" }, { status: 400 });
  }
}
