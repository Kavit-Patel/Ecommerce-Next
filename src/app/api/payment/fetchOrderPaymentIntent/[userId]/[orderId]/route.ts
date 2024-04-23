import { ConnectDB } from "@/lib/ConnectDB/connection";
import { orderModel } from "@/model/orderModel";
import { paymentModel } from "@/model/paymentModel";
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
    const payment = await paymentModel.findOne({ order: orderId });
    if (!payment)
      return NextResponse.json(
        { success: false, message: "Payment Intent Doesn't exists !" },
        { status: 403 }
      );
    return NextResponse.json(
      {
        success: true,
        message: "Payment Intent already exists !",
        response: payment,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error Fetching Payment Intent !" },
      { status: 500 }
    );
  }
};
