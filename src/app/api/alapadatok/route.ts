import connectMongoDB from "@/lib/mongodb";
import Alapadatok from "@/modals/alapadatok"
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    await connectMongoDB();
    const alapadatok = await Alapadatok.find();
    console.log({ data: { Alapadatok: alapadatok } })
    return NextResponse.json({ data: { Alapadatok: alapadatok } })
}