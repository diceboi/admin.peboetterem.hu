import connectMongoDB from "@/lib/mongodb";
import Alapadatok from "@/modals/alapadatok";
import { NextResponse } from "next/server";

export async function PUT(request: any, { params }: any) {
  const { id } = params;
  const { newData:data } = await request.json();
  await connectMongoDB();
  await Alapadatok.findByIdAndUpdate(id, {data})
  return NextResponse.json({message: "Topic updated"}, {status:200})
}

