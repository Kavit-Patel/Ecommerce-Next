import { ConnectDB } from "@/lib/ConnectDB/connection";
import { addressModel } from "@/model/addressModel";
import { userModel } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

await ConnectDB();
export const POST = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  try {
    const { street, city, state, zipcode, country } = await req.json();
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
    if (!street || !city || !state || !zipcode || !country)
      return NextResponse.json(
        { success: false, message: "Provide All details of Address" },
        { status: 403 }
      );
    const newAddress = await addressModel.create({
      user: userId,
      street,
      city,
      state,
      zipcode,
      country,
    });
    if (!newAddress)
      return NextResponse.json(
        { success: false, message: "New Address DOESN'T created !" },
        { status: 500 }
      );

    return NextResponse.json(
      {
        success: true,
        message: "Address Created Successfully !",
        response: newAddress,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error Creating New Address !" },
      { status: 500 }
    );
  }
};
