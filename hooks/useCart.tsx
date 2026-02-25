/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartProductType } from "@/app/product/[productId]/ProductDetails";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleIncreaseCartQuantity: (product: CartProductType) => void;
  handleDecreaseCartQuantity: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (val: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null,
  );

  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  console.log("qty", cartTotalQty);
  console.log("Total", cartTotalAmount);

  useEffect(() => {
    try {
      const cartItems = localStorage.getItem("eliteCanvasCartItems");
      const rawPaymentIntent = localStorage.getItem("eliteCanvasPaymentIntent");

      const cProducts: CartProductType[] | null = cartItems
        ? JSON.parse(cartItems)
        : null;

      const paymentIntent: string | null = rawPaymentIntent
        ? JSON.parse(rawPaymentIntent)
        : null;

      setCartProducts(cProducts);
      setPaymentIntent(paymentIntent);
    } catch (error) {
      console.error("Cart parse error:", error);
      setCartProducts(null);
      setPaymentIntent(null);
    }
  }, []);

  // Calculating Total Quantity and price in Cart
  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;

            acc.total += itemTotal;
            acc.qty += item.quantity;

            return acc;
          },
          { total: 0, qty: 0 },
        );
        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };
    getTotals();
  }, [cartProducts]);

  // Adding Product to Cart
  const handleAddProductToCart = useCallback((product: CartProductType) => {
    if (!product.selectedStyle || !product.selectedSize) {
      alert("Please select both product style and size.");
      return;
    }
    setCartProducts((prev) => {
      let updatedCart;

      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }

      // setTimeout(() => {
      //   toast.success("Product added to cart");
      // }, 0);
      localStorage.setItem("eliteCanvasCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  // Removing product from cart
  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return item.id !== product.id;
        });

        setCartProducts(filteredProducts);
        toast.success(`${product.name} is removed`);
        localStorage.setItem(
          "eliteCanvasCartItems",
          JSON.stringify(filteredProducts),
        );
        return filteredProducts;
      }
    },
    [cartProducts],
  );

  // Increasing Cart quantity
  const handleIncreaseCartQuantity = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      if (product.quantity === 99) {
        return toast.error("Maximum Reached");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id,
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
            .quantity;
        }

        setCartProducts(updatedCart);
        localStorage.setItem(
          "eliteCanvasCartItems",
          JSON.stringify(updatedCart),
        );
      }
    },
    [cartProducts],
  );

  // Decreasing Cart quantity
  const handleDecreaseCartQuantity = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      if (product.quantity === 1) {
        return toast.error("Minimum Reached");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id,
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
            .quantity;
        }

        setCartProducts(updatedCart);
        localStorage.setItem(
          "eliteCanvasCartItems",
          JSON.stringify(updatedCart),
        );
      }
    },
    [cartProducts],
  );

  // Clear Cart
  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.setItem("eliteCanvasCartItems", JSON.stringify(null));
  }, []);

  // Handling Payment paymentIntent
  const handleSetPaymentIntent = useCallback(
    (val: string | null) => {
      setPaymentIntent(val);
      localStorage.setItem("eliteCanvasPaymentIntent", JSON.stringify(val));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paymentIntent],
  );

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleIncreaseCartQuantity,
    handleDecreaseCartQuantity,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
};
