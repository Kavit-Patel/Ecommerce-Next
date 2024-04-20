"use client";
import { RootState } from "@/store/Store";
import React from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import Link from "next/link";

const HomeDiscounted = () => {
  const data = useSelector((state: RootState) => state.product);

  return (
    <div className="px-20 flex flex-col gap-12">
      <h2 className="text-xl font-semibold">Discounted up to - 50%</h2>
      <div id="discountedSection" className="flex flex-wrap gap-2">
        {data.productsStatus === "loading" && <Loader />}
        {data.productsStatus === "success" &&
          data.products.map(
            (product) =>
              product.section === "discounted" && (
                <div
                  key={product._id}
                  className="w-[200px] h-[432px] bg-[#eeebeb] flex flex-col justify-center items-center gap-4"
                >
                  <img src={product.image} alt={product.name} />
                  <h2 className="h-16 text-sm px-4 font-semibold text-center">
                    {product.name}
                  </h2>
                  <p className="font-bold text-lg">{product.price}</p>
                  <Link
                    href={`/product/${product._id}`}
                    className="flex justify-center items-center bg-black h-12 px-10 text-white rounded-md transition-all hover:scale-105 active:scale-100"
                  >
                    Buy Now
                  </Link>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default HomeDiscounted;
