import { ConnectDB } from "@/lib/ConnectDB/connection";
import { cartModel } from "@/model/cartModel";
import { userModel } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

await ConnectDB();
export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string; productId: string } }
) => {
  try {
    const { userId, productId } = params;
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
    if (!productId)
      return NextResponse.json(
        { success: false, message: "Provide Product Id tobe added !" },
        { status: 403 }
      );
    const newCart = await cartModel.create({
      user: userId,
      product: productId,
      quantity: 1,
    });
    if (!newCart)
      return NextResponse.json(
        { success: false, message: "Item doesn't added to cart !" },
        { status: 403 }
      );
    return NextResponse.json(
      {
        success: true,
        message: "Cart Item added successfully !",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error Fetching Cart !" },
      { status: 500 }
    );
  }
};
