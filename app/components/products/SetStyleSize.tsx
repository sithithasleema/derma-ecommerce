"use client";

interface Variant {
  size: string;
  style?: string;
  price: number;
  inStock: boolean;
}

interface SetStyleSizeProps {
  variants: Variant[];
  cartProduct: {
    selectedStyle: string;
    selectedSize: string;
  };
  handleChange: (
    field: "selectedStyle" | "selectedSize",
    value: string
  ) => void;
}

const SetStyleSize = ({
  variants,
  cartProduct,
  handleChange,
}: SetStyleSizeProps) => {
  // Check if any variant has a style
  const hasStyles = variants?.some((v) => !!v.style);

  // Find the selected variant by style (if styles exist and one is selected)
  const selectedVariant = hasStyles
    ? variants.find((v) => v.style === cartProduct.selectedStyle)
    : null;

  // Determine sizes to show
  const sizes = hasStyles
    ? selectedVariant
      ? [selectedVariant.size] // show size of selected style variant only
      : [] // no style selected yet, so no sizes shown
    : [...new Set(variants?.map((v) => v.size))]; // no styles: show all unique sizes

  return (
    <div>
      {hasStyles && (
        <fieldset className="border p-4 rounded-md border-gray-200 mt-3">
          <legend className="font-semibold">Select Product Type</legend>
          <div className="flex gap-4">
            {variants.map((variant) => (
              <label
                key={variant.style || "no-style-" + variant.size}
                className="cursor-pointer relative flex items-center gap-2"
              >
                <input
                  type="radio"
                  name="productType"
                  value={variant.style}
                  className="sr-only peer"
                  checked={cartProduct.selectedStyle === variant.style}
                  onChange={() =>
                    handleChange("selectedStyle", variant.style || "")
                  }
                  required
                />
                <div className="px-4 py-2 border rounded-md peer-checked:bg-background peer-checked:text-white transition">
                  {variant.style}
                </div>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {sizes.length > 0 && (
        <fieldset className="border p-4 rounded-md border-gray-200 mt-3">
          <legend className="font-semibold">Choose Size</legend>
          <div className="flex gap-4">
            {sizes.map((size) => (
              <label
                htmlFor={size}
                key={size}
                className="cursor-pointer relative flex items-center gap-2"
              >
                <input
                  type="radio"
                  id={size}
                  name="canvasSize"
                  value={size}
                  checked={cartProduct.selectedSize === size}
                  onChange={() => handleChange("selectedSize", size)}
                  className="sr-only peer"
                  required
                />
                <div className="px-4 py-2 border rounded-md peer-checked:bg-background peer-checked:text-white transition">
                  {size}
                </div>
              </label>
            ))}
          </div>
        </fieldset>
      )}
    </div>
  );
};

export default SetStyleSize;
