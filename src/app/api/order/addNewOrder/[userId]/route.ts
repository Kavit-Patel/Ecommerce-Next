import { ConnectDB } from "@/lib/ConnectDB/connection";
import { addressModel } from "@/model/addressModel";
import { cartModel } from "@/model/cartModel";
import { orderModel } from "@/model/orderModel";
import { userModel } from "@/model/userModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

await ConnectDB();
export const POST = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  try {
    const { cartIdArr, products, address, subtotal, tax, shipping, total } =
      await req.json();
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
    if (
      !products ||
      products.length === 0 ||
      !address ||
      !subtotal ||
      !tax ||
      !shipping ||
      !total
    )
      return NextResponse.json(
        { success: false, message: "Provide All Details to create order !" },
        { status: 403 }
      );
    //validating produts array
    const productsValidation = products.every(
      (product: {
        product: mongoose.Types.ObjectId;
        quantity: number;
        price: number;
      }) => product.product && product.quantity && product.price
    );
    if (!productsValidation)
      return NextResponse.json(
        {
          success: false,
          message:
            "In Products array each product must contain product,quantity and price !",
        },
        { status: 500 }
      );
    const newOrder = await orderModel.create({
      user: userId,
      products,
      address,
      subtotal,
      tax,
      shipping,
      total,
    });
    const newOrderWithProductsDetail = await orderModel
      .findById(newOrder._id)
      .populate("products.product");
    if (!newOrderWithProductsDetail)
      return NextResponse.json(
        { success: false, message: "New order creation Faied !" },
        { status: 500 }
      );
    //remove ordered products from cart
    const removeCartPromises = cartIdArr.map((cartId: string) =>
      cartModel.findByIdAndDelete(cartId)
    );
    const removedCartArray = await Promise.all(removeCartPromises);
    return NextResponse.json(
      {
        success: true,
        message: "Order Created Successfully and Cart Emptied !",
        response: { newOrderWithProductsDetail, removedCartArray },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error Creating New Order !" },
      { status: 500 }
    );
  }
};
