"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { use, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const router = useRouter();

  console.log("Payment Intent", paymentIntent);
  console.log("Client Secret Key", clientSecret);

  useEffect(() => {
    // Create paymentIntent as soon as the page loads
    if (cartProducts) {
      setLoading(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);

          if (res.status === 401) {
            return router.push("/login");
          }

          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent?.client_secret);
          handleSetPaymentIntent(data.paymentIntent?.id);
        })
        .catch((error) => {
          setError(true);
          console.error(error);
          toast.error("Something went wrong");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartProducts, paymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className="w-full">
      {clientSecret && cartProducts && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}

      {/* UI */}

      {loading && <div className="text-center">Loading Checkout Page...</div>}
      {error && (
        <div className="text-center text-rose-500">Something went wrong..</div>
      )}

      {paymentSuccess && (
        <div className="flex items-center flex-col gap-4">
          {" "}
          <div className="text-green-800 text-center text-xl font-semibold">
            Order Confirmed!
          </div>
          <div className="max-w-[220px] w-full">
            <Button
              label="View Your Orders"
              onClick={() => router.push(`/orders`)}
              custom
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
