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
    const newCartItemsPromisis = cartData.map((item) =>
      cartModel.findByIdAndUpdate(item._id, { quantity: item.quantity })
    );
    const updatedCart = await Promise.all(newCartItemsPromisis);

    const updatedCartWithProductsPromises = updatedCart.map((item) => {
      return cartModel.findOne({ _id: { $in: item?._id } });
    });
    const updatedcartWithProducts = await Promise.all(
      updatedCartWithProductsPromises
    );
    if (!updatedcartWithProducts || updatedcartWithProducts.length === 0)
      return NextResponse.json(
        {
          success: false,
          message: "No Quantity Updation in Db Cart !",
        },
        { status: 500 }
      );
    return NextResponse.json(
      {
        success: true,
        message: "Cart Quantity has been Synced with Db ! !",
        response: updatedcartWithProducts,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server Error while Syncing Quantity !",
      },
      { status: 500 }
    );
  }
};
