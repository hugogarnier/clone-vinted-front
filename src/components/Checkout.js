import { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Checkout = ({ token }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);
  const [data, setData] = useState();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const feesProtect = 2;
  const feesDelivery = 5;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URI}/offer/${id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        // console.log(response.data);
        setData(response.data.offer);
        setUser(response.data.user);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        navigate("/");
      }
    };
    fetchProduct();
  }, [id, token, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement(CardElement);

    // get toekn from stripe
    const stripeResponse = await stripe.createToken(cardElement, {
      name: user._id,
    });
    const stripeToken = stripeResponse.token.id;
    const response = await axios.post(
      `${process.env.REACT_APP_URI}/pay`,
      {
        stripeToken,
        amount: data.product_price,
        description: data.product_name,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    // console.log(response.data);
    if (response.data.status === "succeeded") {
      setCompleted(true);
      toast("Achat effectué !", {
        icon: "✅",
      });
    }
  };
  const handleGoHomePage = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className='payment-main'>
          {completed && <Toaster />}
          <div className='payment-container container'>
            {completed ? (
              <>
                <h2>✅ Récap' de la commande</h2>
                <form className='form-publish' onSubmit={handleGoHomePage}>
                  <div className='text-input-section'>
                    <div className='text-infos'>
                      <div className='infos'>
                        <h4>Commande : {data.product_name}</h4>
                        <span>{data.product_price.toFixed(2)} €</span>
                      </div>
                      <div className='infos'>
                        <h4>Frais de protection acheteurs</h4>
                        <span>{feesProtect.toFixed(2)} €</span>
                      </div>
                      <div className='infos'>
                        <h4>Frais de port</h4>
                        <span>{feesDelivery.toFixed(2)} €</span>
                      </div>
                    </div>

                    <div className='text-total'>
                      <h4>Total</h4>
                      <span>
                        {(
                          Number(data.product_price) +
                          feesProtect +
                          feesDelivery
                        ).toFixed(2)}{" "}
                        €
                      </span>
                    </div>
                    <div className='text-total'>
                      <p>La commande sera envoyée dans les plus brefs delais</p>
                    </div>
                    <button type='submit' className='form-payment'>
                      Retour à l'accueil
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2>Acheter cet article</h2>
                <form className='form-publish' onSubmit={handleSubmit}>
                  <div className='text-input-section'>
                    <div className='text-infos'>
                      <div className='infos'>
                        <h4>Commande : {data.product_name}</h4>
                        <span>{data.product_price.toFixed(2)} €</span>
                      </div>
                      <div className='infos'>
                        <h4>Frais de protection acheteurs</h4>
                        <span>{feesProtect.toFixed(2)} €</span>
                      </div>
                      <div className='infos'>
                        <h4>Frais de port</h4>
                        <span>{feesDelivery.toFixed(2)} €</span>
                      </div>
                    </div>

                    <div className='text-total'>
                      <h4>Total</h4>
                      <span>
                        {(
                          Number(data.product_price) +
                          feesProtect +
                          feesDelivery
                        ).toFixed(2)}{" "}
                        €
                      </span>
                    </div>
                    <div className='text-total'>
                      <p>
                        Il ne vous reste plus qu'une étape pour vous payer les{" "}
                        {data.product_name.toUpperCase()} au prix de{" "}
                        {(
                          Number(data.product_price) +
                          feesProtect +
                          feesDelivery
                        ).toFixed(2)}{" "}
                        € (frais de protection et de port inclus)
                      </p>
                    </div>

                    <CardElement />

                    <button type='submit' className='form-payment'>
                      Payer
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
