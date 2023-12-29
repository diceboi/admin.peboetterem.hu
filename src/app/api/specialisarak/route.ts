import connectMongoDB from "@/lib/mongodb";
import Specialisarak from "@/modals/specialisarak"
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    await connectMongoDB();
    const specialisarak = await Specialisarak.find();
    return NextResponse.json({ data: { Specialisarak: specialisarak } })
}