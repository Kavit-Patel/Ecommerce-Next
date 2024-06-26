import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { DbCartType, fullCartItemType } from "../../types/types";

export const getCartFromDb = createAsyncThunk(
  "cart/fetch",
  async (userId: string | null | undefined, { rejectWithValue }) => {
    try {
      const request = await fetch(`/api/cart/getUserCart/${userId}`, {
        credentials: "include",
      });
      const data = await request.json();
      if (data.success) {
        toast.success(data.message);
        return data.response;
      } else {
        toast.error(data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Can not fetched Cart From Db";
      // toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/add",
  async (
    dataObject: {
      userId: string | undefined | null;
      productId: string | undefined | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const request = await fetch(
        `/api/cart/addToCart/${
          dataObject.userId ? dataObject.userId : "6678f3af45bd1badthina555"
        }/${
          dataObject.productId
            ? dataObject.productId
            : "6678f3af45bd1badthina555"
        }`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "Application/Json",
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
        error instanceof Error ? error.message : "Request Failed !";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (
    dataObject: {
      userId: string | undefined | null;
      cartId: string | undefined | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const request = await fetch(
        `/api/cart/removeItem/${
          dataObject.userId ? dataObject.userId : "6678f3af45bd1badthina555"
        }/${
          dataObject.cartId ? dataObject.cartId : "6678f3af45bd1badthina555"
        }`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "Application/Json",
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
        error instanceof Error ? error.message : "Request Failed !";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const syncLsCartToDb = createAsyncThunk(
  "syncCart/add",
  async (
    dataObject: {
      userId: string | undefined | null;
      cartArray: fullCartItemType[];
    },
    { rejectWithValue }
  ) => {
    try {
      const request = await fetch(
        `/api/cart/syncCartWithLs/${dataObject.userId}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "content-Type": "Application/Json",
          },
          body: JSON.stringify(dataObject.cartArray),
        }
      );
      const data = await request.json();
      if (data.success) {
        toast.success(data.message);
        return data.response;
      } else {
        // toast.error(data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Cart Sync with Db failed !";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
export const syncLsCartQuantityToDb = createAsyncThunk(
  "updateCart/add",
  async (
    dataObject: {
      userId: string | undefined;
      cartArray: DbCartType[];
    },
    { rejectWithValue }
  ) => {
    try {
      const request = await fetch(
        `/api/cart/syncQuantityWithLs/${dataObject.userId}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "Application/Json",
          },
          body: JSON.stringify(dataObject.cartArray),
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
          : "Cart Quantity Sync with Db failed !";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
