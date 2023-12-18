import connectMongoDB from "@/lib/mongodb";
import Alapadatok from "@/modals/alapadatok";
import { NextResponse } from "next/server";

export async function PUT(request:any, { params }:any) {
  await connectMongoDB(); // This should be done before updating documents

  const { id } = params;
  const { newData: data } = await request.json();

  try {
    console.log(`Updating document with id: ${id}`);
    await Alapadatok.findByIdAndUpdate(id, { data });
    console.log(`Document with id: ${id} updated successfully.`);
    return NextResponse.json({ message: "Topic updated" }, { status: 200 });
  } catch (error) {
    console.error("Failed to update the document:", error);
    return NextResponse.json({ message: "Failed to update the document" }, { status: 500 });
  }
}

