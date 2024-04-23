import { ConnectDB } from "@/lib/ConnectDB/connection";
import { userModel } from "@/model/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

await ConnectDB();
export const POST = async (req: NextRequest) => {
  try {
    const { name, surname, email, password } = await req.json();
    if (!name || !surname || !email || !password)
      return NextResponse.json(
        { success: false, message: "Provide All details" },
        { status: 403 }
      );
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      surname,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET || " "
    );

    return NextResponse.json(
      {
        success: true,
        message: "User Created Successfully !",
        response: newUser,
      },
      {
        status: 201,
        headers: {
          "Set-Cookie": `ecommerce_token_next=${token};SameSite=none;Secure;HttpOnly;Max-Age=3600000`,
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error Creating NewUser !" },
      { status: 500 }
    );
  }
};
