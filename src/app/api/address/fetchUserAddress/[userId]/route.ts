import { ConnectDB } from "@/lib/ConnectDB/connection";
import { addressModel } from "@/model/addressModel";
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
    const addresses = await addressModel.find({ user: userId });

    if (!addresses)
      return NextResponse.json(
        { success: false, message: "Address Fetching Failed !" },
        { status: 500 }
      );

    return NextResponse.json(
      {
        success: true,
        message: "Address Fetching Successfully !",
        response: addresses,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error Fetching User Addresses !" },
      { status: 500 }
    );
  }
};
