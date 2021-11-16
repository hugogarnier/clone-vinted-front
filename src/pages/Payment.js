import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Checkout from "../components/Checkout";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC}`);

const Payment = ({ token }) => {
  return (
    <Elements stripe={stripePromise}>
      <Checkout token={token} />
    </Elements>
  );
};

export default Payment;
