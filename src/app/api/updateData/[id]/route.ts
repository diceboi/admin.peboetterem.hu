import Alapadatok from "@/modals/alapadatok";
import { NextResponse } from "next/server";

export async function PUT(request: any, { params }: any) {
  const { id } = params;
  const { newTitle:title , newData:data } = await request.json();

  try {
      const updatedDocument = await Alapadatok.findByIdAndUpdate(
        id,
          {
                "title": title,
                "data": data,
          },
      );

      if (!updatedDocument) {
        console.log('Nem található a dokumentáció');
          return NextResponse.json({ message: "Document not found" }, { status: 404 });
          
      }
      console.log('Frissítve');
      return NextResponse.json({ message: "Frissítve", updatedDocument }, { status: 200 });
  } catch (error) {
      console.error("Error updating data:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

