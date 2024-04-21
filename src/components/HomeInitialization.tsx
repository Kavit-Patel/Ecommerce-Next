"use client";

import "react-toastify/dist/ReactToastify.css";
import { AppDispatch, RootState } from "@/store/Store";
import {
  getCartFromDb,
  removeItem,
  syncLsCartQuantityToDb,
  syncLsCartToDb,
} from "@/store/cart/cartApi";
import { setCartItemLs } from "@/store/cart/cartSlice";
import { fetchProducts } from "@/store/product/productApi";
import {
  calcCartItemDiffLsDs,
  calcCartItemQuantityDiffLsDs,
} from "@/utilityFunctions/calcDiffLsDs";
import {
  getFullCartItemsFromLs,
  getItemProductify,
} from "@/utilityFunctions/localStorageReduxOperation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { autoLoginWithCookie } from "@/store/user/userApi";

const HomeInitialization = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.product);
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);
  const order = useSelector((state: RootState) => state.order);
  const { paymentSuccedStatus } = useSelector(
    (state: RootState) => state.payment
  );
  const [resetCartItemDiffLsDs, setResetCartItemDiffLsDs] =
    useState<boolean>(false);
  const [resetCartItemQuantityDiffLsDs, setResetCartItemQuantityDiffLsDs] =
    useState<boolean>(false);
  const calledForCartSync = useRef<boolean>(false);
  const calledForCartQuantitySync = useRef<boolean>(false);

  useEffect(() => {
    if (user.status === "idle") {
      dispatch(autoLoginWithCookie());
    }
  }, [dispatch, user.status]);

  useEffect(() => {
    if (
      user.user?._id &&
      (paymentSuccedStatus === "success" ||
        order.createdStatus === "success" ||
        cart.statusDb === "idle")
    ) {
      dispatch(getCartFromDb(user.user._id)); //after order generation db cart item state needs to be latest(empty)
      dispatch(setCartItemLs([])); // after order generation ls cart item state needs to be emptied
    }
  }, [
    dispatch,
    paymentSuccedStatus,
    order.createdStatus,
    user.user?._id,
    cart,
  ]);

  const cartItemDiffLsDb = useMemo(() => {
    if (resetCartItemDiffLsDs || cart.statusDb === "idle") {
      return [];
    }
    if (
      cart.statusDb === "success" &&
      cart.statusLs === "success" &&
      cart.cartItemsLs.length > 0
    ) {
      return calcCartItemDiffLsDs(
        cart.cartItemsLs,
        cart.cartItemsDb,
        user.user?._id
      );
    } else {
      return [];
    }
  }, [
    cart.cartItemsDb,
    cart.cartItemsLs,
    resetCartItemDiffLsDs,
    cart.statusDb,
    cart.statusLs,
    user.user?._id,
  ]);

  const cartItemQuantityDiffLsDs = useMemo(() => {
    if (resetCartItemQuantityDiffLsDs || cart.statusDb === "idle") {
      return [];
    }
    if (cart.statusDb === "success") {
      return calcCartItemQuantityDiffLsDs(
        cart.cartItemsLs,
        cart.cartItemsDb,
        user.user?._id
      );
    } else {
      return [];
    }
  }, [
    cart.cartItemsDb,
    cart.cartItemsLs,
    cart.statusDb,
    resetCartItemQuantityDiffLsDs,
    user.user?._id,
  ]);

  useEffect(() => {
    if (data.productsStatus === "idle" || data.products.length === 0) {
      dispatch(fetchProducts());
    }
    if (
      user.status === "success" &&
      paymentSuccedStatus === "idle" &&
      order.createdStatus === "idle"
    ) {
      dispatch(getCartFromDb(user.user?._id));
    }
  }, [
    dispatch,
    data.productsStatus,
    data.products,
    user.status,
    user.user?._id,
    paymentSuccedStatus,
    order.createdStatus,
  ]);
  useEffect(() => {
    if (paymentSuccedStatus === "idle" && order.createdStatus === "idle") {
      dispatch(
        setCartItemLs(
          getFullCartItemsFromLs(
            data.products,
            cart.cartItemsDb,
            user.user?._id
          )
        )
      );
    }
  }, [
    dispatch,
    paymentSuccedStatus,
    order.createdStatus,
    data.products,
    cart.cartItemsDb,
    cart.statusDb,
    user.user?._id,
  ]);

  useEffect(() => {
    if (
      user.status === "success" &&
      cartItemQuantityDiffLsDs.length > 0 &&
      !calledForCartQuantitySync.current
    ) {
      dispatch(
        syncLsCartQuantityToDb({
          userId: user.user?._id,
          cartArray: cartItemQuantityDiffLsDs,
        })
      );
      calledForCartQuantitySync.current = true;
      setResetCartItemQuantityDiffLsDs(true);
    }
  }, [cartItemQuantityDiffLsDs, dispatch, user.status, user.user?._id]);

  useEffect(() => {
    if (
      user.status === "success" &&
      cartItemDiffLsDb.length > 0 &&
      !calledForCartSync.current
    ) {
      dispatch(
        syncLsCartToDb({
          userId: user.user?._id,
          cartArray: cartItemDiffLsDb,
        })
      );
      calledForCartSync.current = true;
      setResetCartItemDiffLsDs(true);
    }
  }, [dispatch, user.status, user.user?._id, cartItemDiffLsDb]);

  return <> </>;
};

export default HomeInitialization;
