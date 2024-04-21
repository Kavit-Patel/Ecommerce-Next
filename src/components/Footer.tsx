"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full  bg-[#DFDFDF] flex justify-center">
      <div className="w-[375px] md:w-[800px] lg:w-[1000px] flex flex-col items-center justify-center">
        <div className="w-full h-[448px] bg-[#2e2e2e] flex gap-3">
          <div className="w-full h-full flex-1 flex flex-col relative">
            <div className="w-full h-full flex">
              <div className=" w-full md:w-[80%] h-full hidden md:block absolute top-36 left-2 lg:-top-32 lg:left-10 z-10">
                {/* <div className="w-full h-full relative"> */}
                <Image
                  src="/images/image 9.png"
                  alt="samsung led"
                  layout="fill"
                  objectFit="contain"
                />
                {/* </div> */}
                {/* <img src="../../images/image 9.png" alt="" /> */}
              </div>
              <div className="w-24 md:w-full lg:w-24 h-24 hidden md:block lg:ml-44 relative ">
                <div className="w-full h-full absolute -top-8 md:top-0 lg:-top-8">
                  <Image
                    src="/images/image 6.png"
                    alt="samsung cases"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                {/* <img src="../../images/image 6.png" alt="" /> */}
              </div>
            </div>
            <div className="w-full  h-full hidden md:block  md:absolute lg:top-16 md:-top-8 ">
              <Image
                src="/images/image 10.png"
                alt="samsung tablet"
                layout="fill"
                objectFit="contain"
              />
              {/* <img src="../../images/image 10.png" alt="" /> */}
            </div>
          </div>
          <div className="flex-1 justify-center h-full text-white flex flex-col items-center gap-2">
            <h1 className="text-3xl lg:text-5xl text-nowrap">
              Big Summer <span className="font-semibold">Sale</span>
            </h1>
            <p className="text-xs text-center lg:mt-2">
              Commodo fames vitae vitae leo mauris in Eu consequat.
            </p>
            <Link
              href="/products"
              className="mt-10 border border-gray-300 text-gray-200 px-8 py-1 rounded-sm w-fit transition-all hover:scale-105 active:scale-100"
            >
              Shop Now
            </Link>
          </div>
          <div className=" relative flex-1 flex flex-col items-center">
            <div className="w-24 h-24 md:w-full md:h-full relative">
              <Image
                src="/images/image 8.png"
                alt="samsung mobile"
                layout="fill"
                objectFit="cover"
              />
            </div>
            {/* <img
              className="object-cover self-end"
              src="../../images/image 8.png"
              alt=""
            /> */}
            <div className="w-24 h-24 mt-auto md:self-end relative">
              <Image
                src="/images/image 7.png"
                alt="samsung smart watches"
                layout="fill"
                objectFit="cover"
              />
            </div>
            {/* <img
              className="object-cover absolute bottom-0"
              src="../../images/image 7.png"
              alt=""
            /> */}
          </div>
        </div>
        <div className="w-full relative py-20 lg:py-26 flex flex-col lg:flex-row items-center gap-8 lg:gap-20 lg:justify-between bg-black px-4 lg:px-20 text-gray-200">
          <div className="flex-1 lg:relative h-full text-center lg:text-left">
            <div className="w-24 h-12 relative ml-16 lg:ml-0">
              <Image
                src="/images/Logowhite.png"
                alt="logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
            {/* <img
              className="mx-auto lg:mx-0"
              src="../../images/Logowhite.png"
              alt="Logo"
            /> */}
            <p className="text-xs mt-5 w-56">
              We are residential interior design firm located in Portland.Our
              boutique-studio offers more than
            </p>
            <div className="absolute bottom-5 lg:-bottom-10 lg:left-2 w-[62%] md:w-[28%] lg:w-full flex justify-center lg:justify-start  gap-5">
              <div className="w-4 h-4 relative">
                <Image
                  src="/images/Twitter.png"
                  alt="Twitter"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="w-4 h-4 relative">
                <Image
                  src="/images/Tiktok.png"
                  alt="Tiktok"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="w-4 h-4 relative">
                <Image
                  src="/images/Instagram.png"
                  alt="Instagram"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="w-4 h-4 relative">
                <Image
                  src="/images/Facebook.png"
                  alt="Facebook"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              {/* <img src="../../images/Twitter.png" alt="" /> */}
              {/* <img src="../../images/Tiktok.png" alt="" /> */}
              {/* <img src="../../images/Instagram.png" alt="" />
              <img src="../../images/Facebook.png" alt="" /> */}
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center lg:items-start gap-1.5">
            <h1 className="font-bold text-white">Services</h1>
            <p>Bonus program</p>
            <p>Gift cards</p>
            <p>Credit and payment</p>
            <p>Service contracts</p>
            <p>Non-cash account</p>
            <p>Payment</p>
          </div>
          <div className="flex-1 flex flex-col items-center lg:items-start gap-1.5">
            <h1 className="font-bold text-white">Assistance to the buyer</h1>
            <p>Find an order</p>
            <p>Terms of delivery</p>
            <p>Exchange and return of goods</p>
            <p>Guarantee</p>
            <p>Frequently asked questions</p>
            <p>Terms of use of the site</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
