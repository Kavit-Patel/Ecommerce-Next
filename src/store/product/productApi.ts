import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "product/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/product/getAllProducts`,
        {
          credentials: "include",
        }
      );
      const data = await request.json();
      if (data.success) {
        return data.response;
      } else {
        console.log(data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : " Product Fetch Failed !";
      return rejectWithValue(errorMessage);
    }
  }
);
export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetch",
  async (id: string) => {
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/product/getSingleProduct/${id}`
    );
    const data = await request.json();
    if (data.success) {
      return data.response;
    } else {
      throw new Error(data.message);
    }
  }
);
