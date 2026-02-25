import Image from "next/image";

const HomeBanner = () => {
  return (
    <div className="relative bg-[#e0dfd5] mb-8 h-[400px] overflow-hidden">
      <div className="mx-auto  flex flex-col gap-20 md:flex-row items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl text-green-900">
            Modern Wall art that speaks to you.
          </h1>
          <p className="italic text-green-900 mt-4">
            Originals & Prints Handcrafted in Australia
          </p>
        </div>
        <div className="w-1/3 relative aspect-video">
          <Image
            src="/banner.png"
            alt="Banner image"
            width={500}
            height={500}
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
