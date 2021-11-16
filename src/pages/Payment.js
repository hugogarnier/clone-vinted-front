import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Checkout from "../components/Checkout";

// const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC}`);
const stripePromise = loadStripe(
  `pk_test_51JwPw8FirJK8CvY70vMIM3xBAXXdAQwTaXS7ISsTswb0lM8a9musCa4r4BBqpAOLUxuo3hODwA2LLGXkriviYPW700NqGsz3h5`
);

const Payment = ({ token }) => {
  return (
    <Elements stripe={stripePromise}>
      <Checkout token={token} />
    </Elements>
  );
};

export default Payment;
