import { ConnectDB } from "@/lib/ConnectDB/connection";
import { productModel } from "@/model/productModel";
import { NextRequest, NextResponse } from "next/server";

await ConnectDB();
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    if (!id)
      return NextResponse.json(
        { success: false, message: "Provide Id !" },
        { status: 403 }
      );
    const product = await productModel.findById(id);
    if (!product)
      return NextResponse.json(
        {
          success: false,
          message: "Product Not Found !",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(
      {
        success: true,
        message: "Product Fetched Successfully !",
        response: product,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error Creating New Product !" },
      { status: 500 }
    );
  }
};
