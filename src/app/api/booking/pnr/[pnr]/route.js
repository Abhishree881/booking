import { supabaseClient } from '@/lib/supabaseClient'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    const { pnr } = params

    const { data: tickets, error } = await supabaseClient
      .from('tickets')
      .select('seats')
      .eq('id', pnr)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!tickets || tickets.length === 0) {
      return NextResponse.json({ error: 'PNR not found' }, { status: 404 })
    }

    return NextResponse.json({data: tickets})
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
