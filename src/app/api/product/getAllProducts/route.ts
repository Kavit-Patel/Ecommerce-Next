import { ConnectDB } from "@/lib/ConnectDB/connection";
import { productModel } from "@/model/productModel";
import { NextRequest, NextResponse } from "next/server";

await ConnectDB();
export const GET = async (req: NextRequest) => {
  try {
    const products = await productModel.find({});
    if (products.length == 0)
      return NextResponse.json(
        { success: false, message: "No Products !" },
        { status: 200 }
      );
    return NextResponse.json(
      {
        success: true,
        message: "Product Fetched Successfully !",
        response: products,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error Fetching Products !" },
      { status: 500 }
    );
  }
};
