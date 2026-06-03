import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received webhook from Sociabuzz:", body);

    const transactionId = body.id || body.transaction_id || `txn_${Date.now()}`;
    const supporterName = body.name || body.supporter_name || body.sender || "Anonymous";
    const amount = body.amount || body.gross_amount || 0;
    const message = body.message || body.support_message || "";

    const { data, error } = await supabase
      .from('donations')
      .insert([
        {
          transaction_id: String(transactionId),
          supporter_name: String(supporterName),
          amount: Number(amount),
          message: String(message),
          raw_data: body 
        }
      ]);

    if (error) {
      console.error("Supabase Insert Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Webhook processed successfully" }, { status: 200 });

  } catch (error: any) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
