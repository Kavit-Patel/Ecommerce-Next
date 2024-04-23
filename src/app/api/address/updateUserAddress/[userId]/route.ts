import { ConnectDB } from "@/lib/ConnectDB/connection";
import { addressModel } from "@/model/addressModel";
import { userModel } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

await ConnectDB();
export const PUT = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  try {
    const { _id, street, city, state, zipcode, country } = await req.json();
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
    if (!_id || !street || !city || !state || !zipcode || !country)
      return NextResponse.json(
        { success: false, message: "Provide All details of Address" },
        { status: 403 }
      );
    const address = await addressModel.findByIdAndUpdate(
      _id,
      {
        street,
        city,
        state,
        zipcode,
        country,
      },
      { new: true }
    );
    if (!address)
      return NextResponse.json(
        { success: false, message: "Address Updation Failed !" },
        { status: 500 }
      );

    return NextResponse.json(
      {
        success: true,
        message: "Address Updated Successfully !",
        response: address,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error Updating Address !" },
      { status: 500 }
    );
  }
};
