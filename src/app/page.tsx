import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// import "react-toastify/dist/ReactToastify.css";
import HomeInitialization from "@/components/HomeInitialization";
import HomeCategory from "@/components/HomeCategory";
import HomeFeature from "@/components/HomeFeature";
import HomeDiscounted from "@/components/HomeDiscounted";
import Image from "next/image";
import { toast } from "react-toastify";

const Home = () => {
  return (
    <div className=" bg-[#DFDFDF] w-full flex justify-center">
      <div className={`w-[375px] md:w-[800px] lg:w-[1000px] `}>
        {/* Hero Section Starts */}
        <div className="w-full h-[632px] px-8 bg-[#211C24] flex flex-col-reverse lg:flex-row justify-evenly items-center">
          <div className="flex flex-col gap-2 justify-center pl-20 text-xs md:text-sm lg:text-lg">
            <p className="text-gray-500">Pro-Beyond</p>
            <p className="text-xl md:text-4xl lg:text-7xl text-gray-400 font-thin">
              IPhone 14 <span className="font-normal">Pro</span>
            </p>
            <p className="text-gray-500">
              Created to change everything for the better. For everything
            </p>
            <Link
              href="/products"
              className="button border border-gray-400 text-gray-400 px-8 py-1 rounded-sm w-fit transition-all hover:scale-105 active:scale-100"
            >
              Shop Now
            </Link>
          </div>
          <div className="w-44 md:w-64 lg:w-[42%] h-full relative">
            <Image
              src="/images/Iphone Image.png"
              layout="fill"
              objectFit="contain"
              alt="Iphone image"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          {/* <img
            className="w-44 md:w-64 lg:w-fit"
            src="../../images/Iphone Image.png"
            alt="Iphone image"
          /> */}
        </div>

        {/* Hero Section ends  */}

        {/* Presentation Section starts  */}

        <div className="w-full h-[800px] flex flex-col lg:flex-row">
          <div className="flex-1">
            <div className="h-1/2 relative flex-1 flex flex-col">
              <div className="w-[40%] h-[80%] lg:w-[55%] absolute top-4 left-4 lg:top-10 md:left-0 ">
                <Image
                  src="/images/PlayStation.png"
                  layout="fill"
                  objectFit="contain"
                  alt="PlayStation"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              {/* <img
                className="h-[80%] lg:w-[50%] absolute top-4 left-4 lg:top-10 md:left-0 object-cover"
                src="../../images/PlayStation.png"
                alt="playstation"
              /> */}
              <div className="w-full min-h-full pl-[46%] flex flex-col justify-center gap-2 bg-white">
                <p className="text-2xl md:text-4xl font-semibold">
                  Playstation 5
                </p>
                <p className="text-xs text-gray-500">
                  Incredibly powerful CPUs, and an SSD with Intregrated I/O will
                  redefine your PlayStation experience
                </p>
              </div>
              <div className="flex w-full min-h-full">
                <div className="bg-[#ededed] flex flex-1 gap-6 ">
                  <div className="w-full h-full md:w-[18%] lg:w-full relative">
                    <Image
                      src="/images/Hero2.png"
                      layout="fill"
                      objectFit="contain"
                      alt="Hero2"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  {/* <img className="" src="../../images/Hero2.png" alt="Hero-2" /> */}
                  <div className="text-2xl flex flex-col justify-center gap-1">
                    <h1>Apple</h1>
                    <h1>
                      AirPods <span className="font-bold">Max</span>
                    </h1>
                    <p className="text-xs">
                      Computational audio. Listen It&apos;s powerful
                    </p>
                  </div>
                </div>
                <div className="flex-1 bg-[#353535] flex items-center gap-2">
                  <div className="w-full h-[54%] md:w-[14%] md:h-[40%] lg:w-full relative">
                    <Image
                      src="/images/image 36-1.png"
                      layout="fill"
                      objectFit="contain"
                      alt="Vision Pro"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  {/* <img
                    className="h-[54%] md:h-[40%]"
                    src="../../images/image 36-1.png"
                    alt="Apple Vision"
                  /> */}
                  <div className="text-gray-100 text-xl md:text-2xl flex flex-col gap-1">
                    <h1>Apple</h1>
                    <h1>
                      Vision <span className="font-bold">Pro</span>
                    </h1>
                    <p className="text-xs">
                      An immersive way to experience entertainment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-between pl-10 bg-[#ededed]">
            <div className="ml-auto flex flex-col gap-4">
              <h1 className="text-2xl md:text-5xl">
                Macbook <span className="font-bold">Air</span>
              </h1>
              <p className="w-[80%] md:w-[50%] text-xs text-gray-500">
                The new 15-inch MacBook Air makes room for more of what you love
                with a spacious Liquid Retina display
              </p>
              <Link
                href="/products"
                className="button mr-auto border border-black px-5 py-1.5 md:px-10 md:py-3 rounded-sm transition-all hover:scale-105 active:scale-100"
              >
                Buy Now
              </Link>
            </div>
            <div className="w-full h-[80%] md:w-[18%] md:h-[70%] lg:w-full relative">
              <Image
                src="/images/Screen.png"
                layout="fill"
                objectFit="contain"
                alt="Macbook Air"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            {/* <img
              className="h-[80%] md:h-[70%]"
              src="../../images/Screen.png"
              alt="Screen"
            /> */}
          </div>
        </div>
        {/* Presentation Section ends  */}

        {/* Category Section starts  */}
        <HomeCategory />
        {/* Category Section ends  */}

        {/* Featured Products Section starts  */}

        <HomeFeature />
        {/* Featured Products Section ends  */}

        {/* Discounted products Section starts  */}

        <HomeDiscounted />
        {/* Discounted products Section ends */}
        <HomeInitialization />
      </div>
    </div>
  );
};

export default Home;
