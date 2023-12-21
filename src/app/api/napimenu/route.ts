import connectMongoDB from "@/lib/mongodb";
import Napimenu from "@/modals/napimenu"
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    await connectMongoDB();
    const napimenu = await Napimenu.find();
    return NextResponse.json({ data: { Napimenu: napimenu } })
}