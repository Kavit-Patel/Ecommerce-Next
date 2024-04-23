import { ConnectDB } from "@/lib/ConnectDB/connection";
import { cartModel } from "@/model/cartModel";
import { userModel } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

await ConnectDB();
export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string; cartId: string } }
) => {
  try {
    const { userId, cartId } = params;
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
    if (!cartId)
      return NextResponse.json(
        { success: false, message: "Provide Cart Id tobe deleted !" },
        { status: 403 }
      );
    const cart = await cartModel.findByIdAndDelete(cartId);
    if (!cart)
      return NextResponse.json(
        { success: false, message: "Cart deletion failed !" },
        { status: 500 }
      );
    return NextResponse.json(
      {
        success: true,
        message: "Cart Item deleted successfully !",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error deleting Cart item !" },
      { status: 500 }
    );
  }
};
