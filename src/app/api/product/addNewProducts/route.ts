import { ConnectDB } from "@/lib/ConnectDB/connection";
import { productModel } from "@/model/productModel";
import { NextRequest, NextResponse } from "next/server";

await ConnectDB();
export const POST = async (req: NextRequest) => {
  try {
    const { name, price, image, section } = await req.json();
    if (!name || !price || !image || !section)
      return NextResponse.json(
        { success: false, message: "Provide All details" },
        { status: 403 }
      );
    const newProduct = await productModel.create({
      name,
      price,
      image,
      section,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Product Created Successfully !",
        response: newProduct,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error Creating New Product !" },
      { status: 500 }
    );
  }
};
