import { ConnectDB } from "@/lib/ConnectDB/connection";
import { addressModel } from "@/model/addressModel";
import { orderModel } from "@/model/orderModel";
import { userModel } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

await ConnectDB();
export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string; orderId: string } }
) => {
  try {
    const { userId, orderId } = params;
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
    if (!orderId)
      return NextResponse.json(
        { success: false, message: "Provide order Id  !" },
        { status: 403 }
      );
    const userOrder = await orderModel
      .findById(orderId)
      .populate("products.product");
    if (!userOrder)
      return NextResponse.json(
        { success: false, message: "Single Order Fetching failed !" },
        { status: 500 }
      );
    return NextResponse.json(
      {
        success: true,
        message: "User Order fetched successfully !",
        response: userOrder,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error Fetching User Order !" },
      { status: 500 }
    );
  }
};
