import connectMongoDB from "@/lib/mongodb";
import Napimenuadatok from "@/modals/napimenuadatok";
import { NextResponse } from "next/server";

export async function PUT(req:any, { params }:any) {
  await connectMongoDB(); // This should be done before updating documents

  const { id } = params;
  const { updatedData } = await req.json();

  try {
    console.log(`Updating document with id: ${id}`);
    console.log(updatedData);
    await Napimenuadatok.findOneAndUpdate({_id: id}, updatedData );
    console.log(`Document with id: ${id} updated successfully.`);
    return NextResponse.json({ message: "Napimenuarak frissítve" }, { status: 200 });
  } catch (error) {
    console.error("Failed to update the document:", error);
    return NextResponse.json({ message: "Failed to update the document" }, { status: 500 });
  }
}

