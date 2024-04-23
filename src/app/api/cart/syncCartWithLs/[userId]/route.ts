import { ConnectDB } from "@/lib/ConnectDB/connection";
import { cartModel, cartType } from "@/model/cartModel";
import { userModel } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

await ConnectDB();
export const POST = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  try {
    const { userId } = params;
    const cartData: cartType[] = await req.json();
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

    if (!cartData || cartData.length === 0)
      return NextResponse.json(
        { success: false, message: "Please Send Cart Data with products !" },
        { status: 403 }
      );
    cartData.forEach((element) => {
      if (!element.product || !element.quantity) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Please provide all the fields of cart items with proper type !",
          },
          { status: 403 }
        );
      }
    });
    const newCartItemsPromisis = cartData.map((data) =>
      cartModel.create({
        user: userId,
        product: data.product._id,
        quantity: data.quantity,
      })
    );
    const newCart = await Promise.all(newCartItemsPromisis);
    const newCartWithFullProductPromises = newCart.map((item) => {
      return cartModel.findOne({ _id: { $in: item._id } }).populate("product");
    });
    const newCartWithFullProduct = await Promise.all(
      newCartWithFullProductPromises
    );
    if (!newCartWithFullProduct || newCartWithFullProduct.length === 0)
      return NextResponse.json(
        {
          success: false,
          message: "Cart Items were NOT Synced Successfully !",
        },
        { status: 500 }
      );
    return NextResponse.json(
      {
        success: true,
        message: "Cart Products Synced with Db Successfully !",
        response: newCartWithFullProduct, //Synced product/products array sent in response
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server Error while Syncing !" },
      { status: 500 }
    );
  }
};
