import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const createPaymentIntent = createAsyncThunk(
  "paymentIntent/create",
  async (
    dataObject: {
      userId: string | undefined;
      orderId: string | undefined;
      amount: number | undefined;
    },
    { rejectWithValue }
  ) => {
    try {
      const request = await fetch(
        `/api/payment/createPaymentIntent/${dataObject.userId}/${dataObject.orderId}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: Number(dataObject.amount),
          }),
        }
      );
      const data = await request.json();
      if (data.success) {
        toast.success(data.message);
        return data.response;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Payment Intent Was not Created !";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getExistingPaymentIntent = createAsyncThunk(
  "paymentIntent/fetch",
  async (
    dataObject: {
      userId: string | undefined;
      orderId: string | undefined;
    },
    { rejectWithValue }
  ) => {
    try {
      const request = await fetch(
        `/api/payment/fetchOrderPaymentIntent/${dataObject.userId}/${dataObject.orderId}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await request.json();
      if (data.success) {
        toast.success(data.message);
        return data.response;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Past PaymentIntent fetching failed !";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const paymentSuccessed = createAsyncThunk(
  "payment/succed",
  async (
    dataObject: {
      userId: string | undefined;
      paymentId: string | undefined;
      orderId: string | undefined;
      payMode: string | undefined;
    },
    { rejectWithValue }
  ) => {
    try {
      const request = await fetch(
        `/api/payment/paymentSuccessed/${dataObject.userId}/${dataObject.paymentId}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payMode: dataObject.payMode,
            orderId: dataObject.orderId,
          }),
        }
      );
      const data = await request.json();
      if (data.success) {
        toast.success(data.message);
        return data.response;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Payment Succed error !";
      return rejectWithValue(errorMessage);
    }
  }
);
