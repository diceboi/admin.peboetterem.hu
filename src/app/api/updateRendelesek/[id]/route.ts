import connectMongoDB from "@/lib/mongodb";
import Rendelesek from "@/modals/rendelesek";
import { NextResponse } from "next/server";

export async function PUT(req:any, { params }:any) {
  await connectMongoDB(); // This should be done before updating documents

  const { id } = params;
  const { kiszallitva, elkeszult } = await req.json();

  try {
    console.log(`Updating document with id: ${id}`);
    console.log(kiszallitva, elkeszult);
    await Rendelesek.findOneAndUpdate({_id: id}, {kiszallitva, elkeszult} );
    console.log(`Document with id: ${id} updated successfully.`);
    return NextResponse.json({ message: "Napimenuarak frissítve" }, { status: 200 });
  } catch (error) {
    console.error("Failed to update the document:", error);
    return NextResponse.json({ message: "Failed to update the document" }, { status: 500 });
  }
}

