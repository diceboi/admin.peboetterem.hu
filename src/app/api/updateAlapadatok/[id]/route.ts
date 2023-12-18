import connectMongoDB from "@/lib/mongodb";
import Alapadatok from "@/modals/alapadatok";
import { NextResponse } from "next/server";

export async function PUT(request:any, { params }:any) {
  await connectMongoDB(); // This should be done before updating documents

  const { id } = params;
  const { newData: data } = await request.json();

  try {
    await Alapadatok.findByIdAndUpdate(id, { data });
    return NextResponse.json({ message: "Topic updated" }, { status: 200 });
  } catch (error) {
    // It is a good practice to handle any potential errors that could occur
    // during the database operation.
    console.error("Failed to update the document:", error);
    return NextResponse.json({ message: "Failed to update the document" }, { status: 500 });
  }
}

