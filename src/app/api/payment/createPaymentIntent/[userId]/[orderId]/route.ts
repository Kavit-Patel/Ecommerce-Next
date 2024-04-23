import { ConnectDB } from "@/lib/ConnectDB/connection";
import { addressModel } from "@/model/addressModel";
import { orderModel } from "@/model/orderModel";
import { paymentModel } from "@/model/paymentModel";
import { userModel } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY || "-");

await ConnectDB();
export const POST = async (
  req: NextRequest,
  { params }: { params: { userId: string; orderId: string } }
) => {
  try {
    const { userId, orderId } = params;
    const { amount } = await req.json();
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
        { success: false, message: "Provide Order Id  !" },
        { status: 403 }
      );
    const orderValidation = await orderModel.findById(orderId);
    if (!orderValidation)
      return NextResponse.json(
        {
          success: false,
          message: "Order Id is invalid ! Create an Order First !",
        },
        { status: 403 }
      );
    if (!amount)
      return NextResponse.json(
        { success: false, message: "Please Provide Amount Detail !" },
        { status: 403 }
      );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "inr",
      //   description: `${orderId} - order completed`,
      //   payment_method: id,
      //   confirm: true,
    });

    if (!paymentIntent)
      return NextResponse.json(
        { success: false, message: "Failed To create Payment Intent !" },
        { status: 500 }
      );
    //saving to db
    const newPayment = await paymentModel.create({
      user: userId,
      order: orderId,
      amount: Number(amount) * 100,
      paymentIntent: paymentIntent.client_secret,
    });
    if (!newPayment)
      return NextResponse.json(
        { success: false, message: "Failed to create Payment request !" },
        { status: 500 }
      );

    return NextResponse.json(
      {
        success: true,
        message: "Payment Intent Created successfully !",
        response: newPayment,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error Creting Payment Intent !" },
      { status: 500 }
    );
  }
};
