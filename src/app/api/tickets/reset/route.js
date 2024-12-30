import { NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabaseClient";

export async function GET() {
  try {

    const { error: deleteError } = await supabaseClient
      .from("tickets")
      .delete()
      .neq('id', 0);

    if (deleteError) throw deleteError;

    const { error: seatUpdateError } = await supabaseClient
      .from("coach_seats")
      .update({ is_booked: false })
      .eq("is_booked", true);

    if (seatUpdateError) throw seatUpdateError;

    return NextResponse.json({ message: "Successfully reset" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to cancel tickets" }, { status: 400 });
  }
}