"use client";
import { RootState } from "@/store/Store";
import React from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import Link from "next/link";
import Image from "next/image";

const HomeFeature = () => {
  const data = useSelector((state: RootState) => state.product);

  return (
    <div className="flex flex-col px-2 py-8 gap-4">
      <div className="flex justify-center md:justify-start gap-3">
        <p className="font-semibold">New Arrival</p>
        <p>Bestseller</p>
        <p>Featured Products</p>
      </div>
      <div
        id="featuredSection"
        className="flex justify-center md:justify-between flex-wrap gap-2"
      >
        {data.productsStatus === "loading" && <Loader />}
        {data.productsStatus === "success" &&
          data.products.map(
            (product) =>
              product.section === "newArrival" && (
                <div
                  key={product._id}
                  className="featuredCard bg-[#eeebeb] border w-[230px] h-[432px] flex flex-col justify-center items-center gap-4 rounded-sm pb-4 mb-4"
                >
                  <div className="w-[80%] h-full relative">
                    <Image
                      src={product.image.split("../..")[1]}
                      alt={product.name}
                      layout="fill"
                      objectFit="contain"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  {/* <img src={product.image} alt={product.name} /> */}
                  <h2 className="text-sm px-4 font-semibold text-center h-16">
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

export default HomeFeature;
