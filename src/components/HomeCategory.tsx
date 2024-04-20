"use client";
import { RootState } from "@/store/Store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const HomeCategory = () => {
  const data = useSelector((state: RootState) => state.product);
  return (
    <div className="w-full h-[1000px] md:h-[260px] px-8 flex flex-col justify-center gap-5 lg:mt-0">
      <h2 className="font-semibold text-xl text-center md:text-left">
        Browse By Category
      </h2>
      <div
        id="categorySection"
        className="w-full md:h-[128px] flex flex-col md:flex-row gap-3 justify-center items-center"
      >
        {data.productsStatus === "loading" && <Loader />}
        {data.productsStatus === "success" &&
          data?.products?.map(
            (product) =>
              product.section === "category" && (
                <div key={product._id} className="categoryCard">
                  <Link className="" href={`/product/${product._id}`}>
                    <img className="object-cover" src={product.image} alt="" />
                  </Link>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default HomeCategory;
