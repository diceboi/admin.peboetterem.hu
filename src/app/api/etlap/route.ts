import connectMongoDB from "@/lib/mongodb";
import Termekek from "@/modals/termekek"
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    await connectMongoDB();
    const termekek = await Termekek.find();
    return NextResponse.json({ data: { Termekek: termekek } })
}

export async function POST(req:any) {
    await connectMongoDB();
    const { updatedData } = await req.json();
    const termekek = await Termekek.create( updatedData );
    console.log(updatedData);
    return NextResponse.json(termekek)
}

