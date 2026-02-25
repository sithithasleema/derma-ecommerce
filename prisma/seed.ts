import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data (safe for dev)
  await prisma.variant.deleteMany({});
  await prisma.product.deleteMany({});

  // --- Botanical skincare seed products ---
  const products = [
    {
      name: "Botanical Calm Cleanser",
      description:
        "A gentle gel cleanser with plant-based actives to refresh and support the skin barrier.",
      brand: "Pure Derma Botanics",
      category: "cleanser",
      images: [
        "https://images.unsplash.com/photo-1612810806563-4cb8265db55f?q=80&w=1200&auto=format&fit=crop",
      ],
      variants: [
        { size: "100ml", style: "Normal", price: 22, inStock: true },
        { size: "100ml", style: "Sensitive", price: 22, inStock: true },
        { size: "200ml", style: "Normal", price: 32, inStock: true },
      ],
    },
    {
      name: "Green Balance Toner",
      description:
        "A hydrating toner to prep and balance skin with botanical extracts and lightweight humectants.",
      brand: "Pure Derma Botanics",
      category: "toner",
      images: [
        "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1200&auto=format&fit=crop",
      ],
      variants: [
        { size: "120ml", style: "Oily", price: 24, inStock: true },
        { size: "120ml", style: "Normal", price: 24, inStock: true },
        { size: "120ml", style: "Sensitive", price: 24, inStock: true },
      ],
    },
    {
      name: "Glow Botanical Serum",
      description:
        "A lightweight serum designed to improve radiance and smooth texture with plant-powered actives.",
      brand: "Pure Derma Lab",
      category: "serum",
      images: [
        "https://images.unsplash.com/photo-1615396899839-c99c121888b0?q=80&w=1200&auto=format&fit=crop",
      ],
      variants: [
        { size: "30ml", style: "Normal", price: 38, inStock: true },
        { size: "30ml", style: "Dry", price: 38, inStock: true },
        { size: "50ml", style: "Normal", price: 52, inStock: true },
      ],
    },
    {
      name: "Barrier Repair Moisturizer",
      description:
        "A nourishing cream to lock in hydration and support a healthy, calm-looking complexion.",
      brand: "Pure Derma Lab",
      category: "moisturizer",
      images: [
        "https://images.unsplash.com/photo-1611080626919-7cf5a9f64d40?q=80&w=1200&auto=format&fit=crop",
      ],
      variants: [
        { size: "50ml", style: "Dry", price: 40, inStock: true },
        { size: "50ml", style: "Sensitive", price: 40, inStock: true },
        { size: "100ml", style: "Dry", price: 58, inStock: true },
      ],
    },

    {
      name: "Rose Glow Cleanser",
      description:
        "A gentle foaming cleanser infused with rose water and aloe to remove impurities without stripping natural moisture.",
      brand: "Pure Derma Botanics",
      category: "cleanser",
      images: [
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1200&auto=format&fit=crop",
      ],
      variants: [
        { size: "150ml", style: "Normal", price: 22, inStock: true },
        { size: "150ml", style: "Dry", price: 22, inStock: true },
        { size: "150ml", style: "Sensitive", price: 22, inStock: true },
      ],
    },
    {
      name: "Vitamin C Brightening Serum",
      description:
        "A lightweight serum formulated with Vitamin C and niacinamide to brighten dull skin and improve texture.",
      brand: "Pure Derma Botanics",
      category: "serum",
      images: [
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop",
      ],
      variants: [
        { size: "30ml", style: "All Skin Types", price: 38, inStock: true },
      ],
    },
    {
      name: "Hydra Boost Moisturizer",
      description:
        "Deeply hydrating daily moisturizer enriched with hyaluronic acid and ceramides for long-lasting softness.",
      brand: "Pure Derma Botanics",
      category: "moisturizer",
      images: [
        "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1200&auto=format&fit=crop",
      ],
      variants: [
        { size: "50ml", style: "Normal", price: 29, inStock: true },
        { size: "50ml", style: "Dry", price: 29, inStock: true },
        { size: "50ml", style: "Combination", price: 29, inStock: true },
      ],
    },
    {
      name: "Tea Tree Clarifying Spot Gel",
      description:
        "A fast-acting spot treatment with tea tree oil and salicylic acid to calm breakouts and reduce redness.",
      brand: "Pure Derma Botanics",
      category: "treatment",
      images: [
        "https://images.unsplash.com/photo-1619451334792-150fd785ee74?q=80&w=1200&auto=format&fit=crop",
      ],
      variants: [
        { size: "15ml", style: "Acne-Prone", price: 19, inStock: true },
      ],
    },
    {
      name: "Botanical Repair Night Cream",
      description:
        "A rich overnight cream with plant oils and peptides to repair and rejuvenate skin while you sleep.",
      brand: "Pure Derma Botanics",
      category: "night cream",
      images: [
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop",
      ],
      variants: [
        { size: "50ml", style: "Dry", price: 42, inStock: true },
        { size: "50ml", style: "Mature", price: 42, inStock: true },
      ],
    },
    {
      name: "Daily Defense SPF 50",
      description:
        "Broad-spectrum sunscreen with lightweight texture that protects against UVA/UVB while keeping skin hydrated.",
      brand: "Pure Derma Botanics",
      category: "sunscreen",
      images: [
        "https://images.unsplash.com/photo-1598662971777-2c10b42d40a5?q=80&w=1200&auto=format&fit=crop",
      ],
      variants: [
        { size: "60ml", style: "All Skin Types", price: 26, inStock: true },
      ],
    },
    {
      name: "Daily Mineral Sunscreen",
      description:
        "A lightweight mineral SPF for daily protection that layers comfortably under makeup.",
      brand: "Pure Derma",
      category: "sunscreen",
      images: [
        "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1200&auto=format&fit=crop",
      ],
      variants: [
        { size: "50ml", style: "Tinted", price: 34, inStock: true },
        { size: "50ml", style: "Untinted", price: 34, inStock: true },
      ],
    },
    {
      name: "Botanical Renewal Mask",
      description:
        "A weekly reset mask to soften texture and boost glow with calming botanical ingredients.",
      brand: "Pure Derma Botanics",
      category: "mask",
      images: [
        "https://images.unsplash.com/photo-1620916566393-7f2b0cda2c86?q=80&w=1200&auto=format&fit=crop",
      ],
      variants: [
        { size: "75ml", style: "Normal", price: 28, inStock: true },
        { size: "75ml", style: "Oily", price: 28, inStock: true },
      ],
    },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        brand: p.brand,
        category: p.category,
        images: p.images,
        variantCount: p.variants.length,
        variants: {
          create: p.variants.map((v) => ({
            size: v.size,
            style: v.style,
            price: v.price,
            inStock: v.inStock,
          })),
        },
      },
    });
  }

  console.log(`✅ Seeded ${products.length} products`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
