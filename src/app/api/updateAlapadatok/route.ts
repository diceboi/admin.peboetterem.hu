import connectMongoDB from "@/lib/mongodb";
import Alapadatok from "@/modals/alapadatok";
import { NextResponse } from "next/server";

export async function PUT(req:any) {
  await connectMongoDB(); // This should be done before updating documents

  const { id, alapadatok } = await req.json();

  try {
    await Alapadatok.findOneAndUpdate({_id: id}, alapadatok[0] );
    console.log(alapadatok[0]);
    return NextResponse.json({ message: "Alapadatok frissítve" }, { status: 200 });
  } catch (error) {
    console.error("Failed to update the document:", error);
    return NextResponse.json({ message: "Failed to update the document" }, { status: 500 });
  }
}

