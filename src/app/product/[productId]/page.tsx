"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import { useParams } from "next/navigation";
import { AppDispatch, RootState } from "@/store/Store";
import { fetchSingleProduct } from "@/store/product/productApi";
import Loader from "@/components/Loader";
import Link from "next/link";
import Image from "next/image";

const Product = () => {
  const params = useParams();
  const { productId } = params;
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.product);
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (typeof productId === "string") dispatch(fetchSingleProduct(productId));
  }, [dispatch, productId]);
  const colors: string[] = [
    "#000000",
    "#781DBC",
    "#E10000",
    "#E1B000",
    "#E8E8E8",
  ];
  const memorySizes: string[] = ["128GB", "256GB", "512GB", "1TB"];
  const specification: { name: string; spec: string; image: string }[] = [
    { name: "Screen size", spec: '5.7"', image: "/images/screensize.png" },
    { name: "CPU", spec: "Apple A16 Bionic", image: "/images/chip.png" },
    { name: "Number of Cores", spec: "6", image: "/images/core.png" },
    {
      name: "Main camera",
      spec: "48-12-12 MP",
      image: "/images/backCamera.png",
    },
    {
      name: "Front camera",
      spec: "12 MP",
      image: "/images/frontCamera.png",
    },
    {
      name: "Battery capacity",
      spec: "4323 mAh",
      image: "/images/battery.png",
    },
  ];
  return (
    <main className="w-full bg-[#DFDFDF] flex justify-center">
      <div className="w-[375px] md:w-[800px] lg:w-[1000px] bg-[#f5f5f5]">
        {data.productStatus === "loading" && <Loader />}
        {data.product && data.productStatus === "success" && (
          <section>
            <div className="px-8 path flex gap-3 py-3 text-gray-500"></div>
            <div className="w-full h-[896px] py-8 md:py-0 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8">
              <div className="w-full h-[672px] flex-1 flex justify-center items-center">
                <div className="w-full md:w-2/3 h-full  relative">
                  {
                    <Image
                      src={data.product.image.split("../..")[1]}
                      layout="fill"
                      objectFit="contain"
                      alt={data.product.name}
                    />
                  }
                </div>
                {/* <img
                  className="md:w-2/3"
                  src={data.product.image}
                  alt={data.product.name}
                /> */}
              </div>
              <div className="productDetail h-full flex-1 flex flex-col justify-center ml-8 md:ml-1 gap-3 md:gap-6">
                <div className="title text-xl md:text-2xl lg:text-3xl font-semibold">
                  {data.product.name}
                </div>
                <div className="flex gap-5 text-2xl font-semibold">
                  <span className="price">
                    <span className="flex items-center">
                      <MdCurrencyRupee />
                      <span>{data.product.price}</span>
                    </span>
                  </span>
                  <span className="subPrice line-through text-gray-400">
                    <span className="flex items-center">
                      <MdCurrencyRupee />
                      <span>
                        {(
                          data.product.price +
                          data.product.price * 1.4
                        ).toFixed(0)}
                      </span>
                    </span>
                  </span>
                </div>
                <div className="color flex gap-5 items-center">
                  <span>Select color :</span>
                  <span className="flex gap-3">
                    <span className="selectColor w-full flex gap-1">
                      {colors.map((color) => (
                        <span
                          key={color}
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: `${color}` }}
                        ></span>
                      ))}{" "}
                    </span>
                  </span>
                </div>
                <div className="memory flex gap-1.5 md:gap-3">
                  {memorySizes.map((memory) => (
                    <span
                      key={memory}
                      className="flex justify-center items-center w-20 h-10 border border-gray-400 px-8 py-3 text-gray-600"
                    >
                      {memory}
                    </span>
                  ))}
                </div>
                <div className="specification w-full flex flex-wrap gap-2">
                  {specification.map((spec) => (
                    <div
                      key={spec.name}
                      className=" w-36 h-16 bg-[#dedede] flex justify-center items-center text-xs text-gray-600"
                    >
                      <div className="flex justify-center items-center gap-2">
                        <div className="w-6 h-6 relative">
                          <Image
                            src={spec.image}
                            layout="fill"
                            objectFit="cover"
                            alt={spec.name}
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        {/* <img src={spec.image} alt={spec.name} /> */}
                        <div className="w-24">
                          <p>{spec.name}</p>
                          <p>{spec.spec}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs pr-14">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                  porro quisquam dolor quasi, omnis adipisci aut excepturi
                  consequuntur repudiandae modi doloribus, aperiam aspernatur
                  eum facilis, numquam vel consequatur neque nobis quis!
                  Doloremque, earum vero?...
                </div>
                <div className="w-[85%] flex flex-col md:flex-row justify-around gap-2">
                  <Link
                    className="lg:w-1/2 px-3 h-10 bg-gray-100 border border-black rounded-sm flex justify-center items-center transition-all hover:scale-105 active:scale-100"
                    href="#"
                  >
                    Add to Wishlist
                  </Link>
                  <Link
                    className="addToCart lg:w-1/2 px-3 h-10 bg-black rounded-sm text-white flex justify-center items-center transition-all hover:scale-105 active:scale-100"
                    href={user.user?._id ? `/cart/${productId}` : "/login"}
                  >
                    Add to Cart
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Product;
