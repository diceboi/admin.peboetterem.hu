import connectMongoDB from "@/lib/mongodb";
import Napimenuadatok from "@/modals/napimenuadatok"
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    await connectMongoDB();
    const napimenuadatok = await Napimenuadatok.find();
    return NextResponse.json({ data: { Napimenuadatok: napimenuadatok } })
}