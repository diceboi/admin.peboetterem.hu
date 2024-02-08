import connectMongoDB from "@/lib/mongodb";
import Rendelesek from "@/modals/rendelesek"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    await connectMongoDB();
  
    // Extract query parameters from the request
    const page = parseInt(request.nextUrl.searchParams.get('page') ?? '1', 10);
    const pageSize = parseInt(request.nextUrl.searchParams.get('pageSize') ?? '10', 10);
    
    const skip = (page - 1) * pageSize;
  
    // Fetch the paginated results from MongoDB
    const rendelesek = await Rendelesek.find().sort({ createdAt: -1 }).skip(skip).limit(pageSize);
  
    // Count total number of orders for pagination purposes
    const totalOrders = await Rendelesek.countDocuments();
  
    return NextResponse.json({
      data: {
        Rendelesek: rendelesek,
        total: totalOrders,
        page,
        pageSize,
        totalPages: Math.ceil(totalOrders / pageSize),
      }
    });
  }