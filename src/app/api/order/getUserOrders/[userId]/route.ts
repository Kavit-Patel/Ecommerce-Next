import { ConnectDB } from "@/lib/ConnectDB/connection";
import { orderModel } from "@/model/orderModel";
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
    const userOrders = await orderModel
      .find({ user: userId })
      .populate("products.product");
    if (!userOrders)
      return NextResponse.json(
        { success: false, message: "User Order Fetching Failed !" },
        { status: 500 }
      );

    return NextResponse.json(
      {
        success: true,
        message:
          userOrders.length === 0
            ? "No Orders !"
            : "Orders Fetched Successfully !",
        response: userOrders,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error Fetching User Orders !" },
      { status: 500 }
    );
  }
};
