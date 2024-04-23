import mongoose, { Document } from "mongoose";

export interface userType extends Document {
  _id?: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new mongoose.Schema({
  name: { type: String },
  surname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});
export const userModel =
  mongoose.models.Users || mongoose.model<userType>("Users", userSchema);
