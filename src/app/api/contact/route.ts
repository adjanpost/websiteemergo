import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  try {
    const body = await req.json();
    const { naam, email, telefoon, ras, bericht } = body;

    if (!naam || !email || !bericht) {
      return NextResponse.json({ error: "Verplichte velden ontbreken" }, { status: 400 });
    }

    const { error } = await supabase.from("contact_aanvragen").insert({
      naam,
      email,
      telefoon: telefoon || null,
      hondenras: ras || null,
      bericht,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Database fout" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Onverwachte fout" }, { status: 500 });
  }
}
