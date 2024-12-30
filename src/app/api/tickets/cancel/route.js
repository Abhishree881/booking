import { NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabaseClient";

export async function POST(req) {
  try {
    // Parse request payload
    const {pnr,  userId, seatNumbers } = await req.json();

    const { error: deleteError } = await supabaseClient
      .from("tickets")
      .delete()
      .eq("id", pnr)
      .eq("user_id", userId); // delete the ticket where pnr and user_id match

    if (deleteError) throw deleteError;

    const { error: seatUpdateError } = await supabaseClient
      .from("coach_seats")
      .update({ is_booked: false })
      .in("seat_number", seatNumbers); // update the coach_seats table to mark the seats as available

    if (seatUpdateError) throw seatUpdateError;

    return NextResponse.json({ message: "Successfully canceled tickets", seatNumbers });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to cancel tickets" }, { status: 400 });
  }
}
