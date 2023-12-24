import connectMongoDB from "@/lib/mongodb";
import Termekek from "@/modals/termekek";
import { NextResponse } from "next/server";

export async function PUT(req:any, { params }:any) {
  await connectMongoDB(); // This should be done before updating documents

  const { id } = params;
  const { updatedData } = await req.json();

  try {
    console.log(`Updating document with id: ${id}`);
    console.log(updatedData);
    await Termekek.findOneAndUpdate({_id: id}, updatedData );
    console.log(`Document with id: ${id} updated successfully.`);
    return NextResponse.json({ message: "Napimenu updated" }, { status: 200 });
  } catch (error) {
    console.error("Failed to update the document:", error);
    return NextResponse.json({ message: "Failed to update the document" }, { status: 500 });
  }
}


export async function DELETE(req:any, { params }:any) {
    await connectMongoDB();

    const { id } = params;

    try {
        console.log(`Deleting document with id: ${id}`);
        await Termekek.findOneAndDelete({_id: id});
        console.log(`Document with id: ${id} deleted successfully.`);
        return NextResponse.json({ message: "Étlap updated" }, { status: 200 });
    } catch (error) {
        console.error("Failed to update the document:", error);
        return NextResponse.json({ message: "Failed to update the document" }, { status: 500 });
    }
}