import { ConnectDB } from "@/lib/ConnectDB/connection";
import { orderModel } from "@/model/orderModel";
import { paymentModel } from "@/model/paymentModel";
import { userModel } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

await ConnectDB();
export const POST = async (
  req: NextRequest,
  { params }: { params: { userId: string; paymentId: string } }
) => {
  try {
    const { userId, paymentId } = params;
    const { payMode, orderId } = await req.json();
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
    if (!payMode || !paymentId)
      return NextResponse.json(
        { success: false, message: "Provide All details of payment  !" },
        { status: 403 }
      );
    //updating paymode
    const newPayment = await paymentModel.findByIdAndUpdate(paymentId, {
      payMode,
    });
    if (!newPayment)
      return NextResponse.json(
        { success: false, message: "PayMode Updation Failed !" },
        { status: 403 }
      );
    // updating order status as payment done and assign paymentId to that order
    const updateOrderStatus = await orderModel.findByIdAndUpdate(orderId, {
      payment: { payId: paymentId, paymentStatus: "Done" },
    });

    return NextResponse.json(
      {
        success: true,
        message: updateOrderStatus
          ? "Payment Done and Order updated Successfully"
          : "Payment Done Successfully !",
        response: newPayment,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error Creting Payment Intent !" },
      { status: 500 }
    );
  }
};
