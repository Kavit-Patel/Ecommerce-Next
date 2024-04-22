"use client";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { AppDispatch, RootState } from "../store/Store";
import { useEffect, useState } from "react";
import { logout } from "../store/user/userSlice";
import { userLogOut } from "../store/cart/cartSlice";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { autoLoginWithCookie } from "@/store/user/userApi";
import { getSearchKeywords } from "@/store/product/productSlice";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, status } = useSelector((state: RootState) => state.user);
  const { cartItemsLs } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch<AppDispatch>();
  const [show, setShow] = useState<{ cart: boolean; user: boolean }>({
    cart: false,
    user: false,
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(autoLoginWithCookie());
    }
  }, [dispatch, status]);
  useEffect(() => {
    if (status !== "success") {
      dispatch(userLogOut());
    }
  }, [dispatch, status]);
  useEffect(() => {
    const handleClick = () => {
      setShow(() => ({ user: false, cart: false }));
    };
    window.addEventListener("click", () => handleClick());

    return () => window.removeEventListener("click", handleClick);
  }, []);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    dispatch(getSearchKeywords(search));
    if (!pathname.includes("/products")) {
      router.push(`/products`);
    }
  };
  return (
    <div className="w-full bg-[#DFDFDF] flex justify-center">
      <div className="w-[375px] md:w-[800px] lg:w-[1000px]">
        <div className="w-full flex items-center justify-between px-8 md:px-4 h-[88px] bg-[#f5f5f5]">
          <Link href="/" className="w-24 h-12 relative">
            <Image
              src="/images/Logo.png"
              alt="Logo"
              layout="fill"
              sizes="(max-width: 768px) 100vw, 33vw"
              objectFit="contain"
            />
          </Link>
          {/* <img src="../../images/Logo.png" alt="Logo" /> */}
          <p className="hidden md:block relative">
            <span className="block w-6 h-6 absolute top-4 left-3">
              <Image
                src="/images/Search.png"
                alt="Search"
                layout="fill"
                sizes="(max-width: 768px) 100vw, 33vw"
                objectFit="contain"
              />
            </span>
            {/* <img
              className="absolute top-4 left-3"
              src="../../images/Search.png"
              alt="Search"
            /> */}
            <input
              className="bg-[#dfdfdf] md:w-[333px] h-[56px] pl-10 rounded-sm"
              type="text"
              placeholder="Search"
              onChange={(e) => handleInput(e)}
            />
          </p>
          <ul className="hidden lg:flex lg:gap-10 text-[#989898]">
            <Link href="/" className="">
              Home
            </Link>
            <li className="">Abount</li>
            <li className="">Contact Us</li>
            <li className="">Blog</li>
          </ul>
          <p
            className={`${
              show.cart ? "z-20" : "-z-20"
            }  -z-10 md:z-10 flex flex-col mt-32 md:mt-0 ml-24 md:ml-0 rounded-md md:rounded-none shadow-lg md:shadow-none border-2 md:border-none  bg-white md:bg-inherit md:flex-row p-4 md:p-0 gap-4 md:gap-1`}
          >
            <span className=" block w-8 h-8 relative">
              <Image
                src="/images/Favorites.png"
                alt="favorite site"
                layout="fill"
                sizes="(max-width: 768px) 100vw, 33vw"
                objectFit="contain"
              />
            </span>
            {/* <img src="../../images/Favorites.png" alt="Favorites" /> */}
            <Link
              href={user?._id ? "/cart/items" : "/login"}
              className="relative myCart cursor-pointer"
            >
              <span className="block w-8 h-8 relative">
                <Image
                  src="/images/Cart.png"
                  alt="Cart"
                  layout="fill"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  objectFit="contain"
                />
              </span>
              {/* <img src="../../images/Cart.png" alt="Cart" /> */}
              <span className="navCart absolute -top-3 -right-1.5 text-black-950 font-semibold">
                {status === "success" ? cartItemsLs.length : ""}
              </span>
            </Link>
            <span className="relative">
              <span
                className={`${
                  show.user ? "block" : "hidden"
                } absolute w-16 md:w-20 md:border-2 shadow-xl md:shadow-2xl -right-[84px] md:-right-4 md:top-12  flex flex-col bg-white`}
              >
                {status === "success" ? (
                  <span className="flex flex-col">
                    <span className="text-sm md:text:md hover:bg-slate-100 hover:font-semibold active:bg-slate-200  active:scale-95  px-1.5 py-1">
                      {user?.name?.toUpperCase()}
                    </span>
                    {/* <Link
                      className="text-sm md:text:md hover:bg-slate-100 hover:font-semibold active:bg-slate-200  active:scale-95  px-1.5 py-1"
                      to="#"
                    >
                      Profile
                    </Link> */}
                    <Link
                      onClick={() =>
                        setShow((prev) => ({ ...prev, user: !prev.user }))
                      }
                      className="text-sm md:text:md hover:bg-slate-100 hover:font-semibold active:bg-slate-200  active:scale-95  px-1.5 py-1"
                      href="/myorders"
                    >
                      myOrders
                    </Link>
                    <Link
                      onClick={() => {
                        dispatch(logout());
                        setShow((prev) => ({ ...prev, user: !prev.user }));
                      }}
                      className="text-sm md:text:md hover:bg-slate-100 hover:font-semibold active:bg-slate-200  active:scale-95  px-1.5 py-1"
                      href="#"
                    >
                      LogOut
                    </Link>
                  </span>
                ) : (
                  <>
                    <Link
                      onClick={() =>
                        setShow((prev) => ({ ...prev, user: !prev.user }))
                      }
                      className="text-sm md:text:md hover:bg-slate-100 hover:font-semibold active:bg-slate-200  active:scale-95  px-1.5 py-1"
                      href="/register"
                    >
                      Register
                    </Link>
                    <Link
                      onClick={() =>
                        setShow((prev) => ({ ...prev, user: !prev.user }))
                      }
                      className="text-sm md:text:md hover:bg-slate-100 hover:font-semibold active:bg-slate-200 active:scale-95  px-1.5 py-1"
                      href="/login"
                    >
                      Login
                    </Link>
                  </>
                )}
              </span>
              <span className=" block w-8 h-8 relative cursor-pointer">
                <Image
                  onClick={(e) => {
                    e.stopPropagation();
                    setShow((prev) => ({ ...prev, user: !prev.user }));
                  }}
                  src="/images/User.png"
                  alt="User"
                  layout="fill"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  objectFit="contain"
                />
              </span>
              {/* <img
                onClick={(e) => {
                  e.stopPropagation();
                  setShow((prev) => ({ ...prev, user: !prev.user }));
                }}
                className="  cursor-pointer"
                src="../../images/User.png"
                alt="User"
              /> */}
            </span>
          </p>
          <p className="hamburger md:hidden cursor-pointer">
            <span className=" block w-8 h-8 relative">
              <Image
                onClick={(e) => {
                  e.stopPropagation();
                  setShow((prev) => ({ ...prev, cart: !prev.cart }));
                }}
                src="/images/Burger.png"
                alt="Burger"
                layout="fill"
                sizes="(max-width: 768px) 100vw, 33vw"
                objectFit="contain"
              />
            </span>
            {/* <img
              onClick={(e) => {
                e.stopPropagation();
                setShow((prev) => ({ ...prev, cart: !prev.cart }));
              }}
              src="../../images/Burger.png"
              alt="Ham-burger"
            /> */}
          </p>
        </div>
        <div className="hidden w-full px-8 h-[48px] bg-[#2e2e2e] lg:flex justify-between">
          <Link
            href="/products"
            className="flex items-center text-gray-400 gap-2"
          >
            <div className="w-5 h-5 relative">
              <Image
                src="/images/Vector-36.png"
                alt="Phone"
                layout="fill"
                sizes="(max-width: 768px) 100vw, 33vw"
                objectFit="contain"
              />
            </div>
            {/* <img
              className="text-black"
              src="../../images/Vector-36.png"
              alt="Phone"
            /> */}
            <span>Phone</span>
          </Link>
          <Link href="#" className="flex items-center text-gray-400 gap-2">
            <div className="w-5 h-5 relative">
              <Image
                src="/images/Vector-31.png"
                alt="Computers"
                layout="fill"
                sizes="(max-width: 768px) 100vw, 33vw"
                objectFit="contain"
              />
            </div>
            {/* <img
              className="text-black"
              src="../../images/Vector-31.png"
              alt="Computers"
            /> */}
            <span>Computers</span>
          </Link>
          <Link href="#" className="flex items-center text-gray-400 gap-2">
            <div className="w-5 h-5 relative">
              <Image
                src="/images/Vector-14.png"
                alt="Smart Watches"
                layout="fill"
                sizes="(max-width: 768px) 100vw, 33vw"
                objectFit="contain"
              />
            </div>
            {/* <img
              className="text-black"
              src="../../images/Vector-14.png"
              alt="Smart Watches"
            /> */}
            <span>Smart Watches</span>
          </Link>
          <Link href="#" className="flex items-center text-gray-400 gap-2">
            <div className="w-5 h-5 relative">
              <Image
                src="/images/Vector-3.png"
                alt="Cameras"
                layout="fill"
                sizes="(max-width: 768px) 100vw, 33vw"
                objectFit="contain"
              />
            </div>
            {/* <img
              className="text-black"
              src="../../images/Vector-3.png"
              alt="Cameras"
            /> */}
            <span>Cameras</span>
          </Link>
          <Link href="#" className="flex items-center text-gray-400 gap-2">
            <div className="w-5 h-5 relative">
              <Image
                src="/images/Vector-10.png"
                alt="Headphones"
                layout="fill"
                sizes="(max-width: 768px) 100vw, 33vw"
                objectFit="contain"
              />
            </div>
            {/* <img
              className="text-black"
              src="../../images/Vector-10.png"
              alt="Headphones"
            /> */}
            <span>Headphones</span>
          </Link>

          <Link href="#" className="flex items-center text-gray-400 gap-2">
            <div className="w-5 h-5 relative">
              <Image
                src="/images/Vector-14.png"
                alt="Smart Watches"
                layout="fill"
                sizes="(max-width: 768px) 100vw, 33vw"
                objectFit="contain"
              />
            </div>
            {/* <img
              className="text-black"
              src="../../images/Vector-14.png"
              alt="Gaming"
            /> */}
            <span>Gaming</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
