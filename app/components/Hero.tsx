"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden  text-white">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 opacity-90" />

      <div className="relative mx-auto max-w-7xl px-6 py-2 lg:pb-36">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <p className="mb-6 text-sm tracking-[0.3em] text-[#1f2f26] uppercase">
              Pure Derma Collection
            </p>

            <h1 className="mb-8 text-5xl font-light leading-tight sm:text-6xl">
              Timeless Radiance.
              <br />
              <span className="font-medium text-[#1f2f26]">
                Refined by Nature.
              </span>
            </h1>

            <p className="mb-10 max-w-xl text-lg text-[#1f2f26]">
              Advanced botanical formulations crafted for visible results.
              Elevate your daily ritual with clinically inspired luxury
              skincare.
            </p>

            <div className="flex gap-6">
              <Link
                href="/products"
                className="rounded-full  px-8 py-3 text-sm font-semibold tracking-wide bg-[#1f2f26] text-white transition hover:bg-[#e8edea] hover:text-[#1f2f26] hover:border-[#1f2f26] border-2"
              >
                SHOP COLLECTION
              </Link>

              <Link
                href="/about"
                className="rounded-full border border-[#cbd5c0] px-8 py-3 text-sm tracking-wide text-[#1f2f26] transition hover:bg-[#cbd5c0] hover:text-[#1f2f26] hover:border-[#1f2f26] border-2"
              >
                OUR PHILOSOPHY
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative h-[500px] w-full overflow-hidden rounded-[40px] bg-white/5 p-6 backdrop-blur-sm">
              <div className="relative h-full w-full overflow-hidden rounded-[30px]">
                <Image
                  src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1200&auto=format&fit=crop"
                  alt="Luxury skincare product"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white rounded-t-[60px]" />
    </section>
  );
}
