import { ConnectDB } from "@/lib/ConnectDB/connection";
import { cartModel } from "@/model/cartModel";
import { productModel } from "@/model/productModel";
import { userModel } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

await ConnectDB();
export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  try {
    const { userId } = params;
    if (!userId)
      return NextResponse.json(
        { success: false, message: "Provide User Id !" },
        { status: 403 }
      );
    const user = await userModel.findById(userId);
    if (!user)
      return NextResponse.json(
        {
          success: false,
          message: "User Not Found !",
        },
        {
          status: 404,
        }
      );
    const cart = await cartModel.find({ user: userId }).populate("product");

    return NextResponse.json(
      {
        success: true,
        message:
          cart.length === 0
            ? "Cart Fetched BUT Empty !"
            : "Cart Fetched Successfully !",
        response: cart,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error Fetching Cart !" },
      { status: 500 }
    );
  }
};
