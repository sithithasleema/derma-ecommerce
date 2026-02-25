/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx}",
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    fontFamily: {
      sans: ["var(--font-poppins)", "ui-sans-serif", "system-ui"],
    },
    colors: {
      primary: "#cbd7a1", // neutral/dark gray for text and base
      secondary: "#808000", // olive green
      accent: "#5a7132", // lighter green for highlights
      background: "#808000", // soft green-beige background
      canvas: "#f1f4e5", // off-white with greenish tint for canvases/cards
    },
    fontSize: {
      h1: ["2.5rem", { lineHeight: "1.1", fontWeight: "700" }],
      h2: ["2rem", { lineHeight: "1.2", fontWeight: "600" }],
      h3: ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
      "body-lg": ["1.125rem", { lineHeight: "1.6" }],
      body: ["1rem", { lineHeight: "1.5" }],
    },
    spacing: {
      72: "18rem",
      84: "21rem",
      96: "24rem",
    },
    borderRadius: {
      md: "0.5rem",
      lg: "0.75rem",
    },
    boxShadow: {
      card: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
  },
};
export const plugins = [];
