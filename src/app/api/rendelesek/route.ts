import connectMongoDB from "@/lib/mongodb";
import Rendelesek from "@/modals/rendelesek"
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    await connectMongoDB();
    const rendelesek = await Rendelesek.find();
    return NextResponse.json({ data: { Rendelesek: rendelesek } })
}