import { ConnectDB } from "@/lib/ConnectDB/connection";
import { addressModel } from "@/model/addressModel";
import { userModel } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

await ConnectDB();
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { userId: string; addressId: string } }
) => {
  try {
    const { userId, addressId } = params;
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
    if (!addressId)
      return NextResponse.json(
        { success: false, message: "Provide Address Id tobe deleted !" },
        { status: 403 }
      );
    const address = await addressModel.findByIdAndDelete(addressId);
    if (!address)
      return NextResponse.json(
        { success: false, message: "Address Deletion failed !" },
        { status: 500 }
      );
    return NextResponse.json(
      {
        success: true,
        message: "Address Deleted successfully !",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error Deleting Address !" },
      { status: 500 }
    );
  }
};
