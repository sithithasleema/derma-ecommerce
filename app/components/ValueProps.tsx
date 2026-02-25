export default function ValueProps() {
  const props = [
    {
      icon: "🧴",
      title: "Clean Formulas",
      text: "Thoughtfully crafted with skin-first ingredients.",
    },
    {
      icon: "🌿",
      title: "Botanical Actives",
      text: "Plant-powered blends designed for visible results.",
    },
    {
      icon: "🧪",
      title: "Derm-Inspired",
      text: "Balanced routines built for daily consistency.",
    },
    {
      icon: "✨",
      title: "Luxury Ritual",
      text: "Elevate your skincare with premium textures.",
    },
  ];

  const ranges = [
    {
      title: "Cleansers",
      text: "Gentle daily cleansing that supports your skin barrier.",
    },
    {
      title: "Serums",
      text: "Targeted treatments for glow, hydration, and tone.",
    },
    {
      title: "Moisturizers",
      text: "Rich, comforting hydration for all-day softness.",
    },
    {
      title: "Sunscreen",
      text: "Lightweight protection to keep skin looking refined.",
    },
    {
      title: "Masks",
      text: "Weekly reset for radiance and smooth texture.",
    },
    {
      title: "Toners",
      text: "Prep and balance your skin for the next steps.",
    },
  ];

  return (
    <>
      {/* Why Choose Us */}
      <section className="py-16">
        <div className=" w-full px-6 text-center">
          <p className="mb-3 text-sm tracking-[0.35em] uppercase text-[#4f6f52]">
            Why Choose Us
          </p>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Luxury skincare, refined for everyday.
          </h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {props.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#edf2ee] text-3xl">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Range (Luxury Olive Section) */}
      <section className="py-16 bg-[#1f2f26]">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="mb-3 text-sm tracking-[0.35em] uppercase text-[#cbd5c0]">
            Our Product Range
          </p>

          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Essentials for a complete ritual.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base text-[#d4dfd8]">
            Build a routine with curated formulas—from cleansing to hydration
            and daily protection.
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ranges.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-sm backdrop-blur-sm transition hover:bg-white/10"
              >
                <h3 className="text-xl font-semibold text-[#e6efe9]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#d4dfd8]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
