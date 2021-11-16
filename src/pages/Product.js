import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SwiperPictures from "../components/SwiperPictures";

const Product = ({ token }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProduct();
  }, [id, token]);

  const handleUpdate = () => {
    navigate(`/update/${id}`, { state: data.offer });
  };
  const handleBuy = () => {
    if (token) {
      navigate(`/payment/${id}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className='offer-body'>
          <div className='offer-container'>
            <div className='offer-picture'>
              <SwiperPictures data={data.offer} />
            </div>
            <div className='offer-infos'>
              <div>
                <span className='offer-price'>
                  {data.offer.product_price} €
                </span>
                <ul className='offer-list'>
                  {data.offer.product_details.map((elem, index) => {
                    const keys = Object.keys(elem);
                    return (
                      <li key={index}>
                        <span>{keys[0]}</span>
                        <span>{elem[keys[0]]}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className='divider'></div>
              <div className='offer-content'>
                <p className='name'>{data.offer.product_name}</p>
                <p className='description'>{data.offer.product_description}</p>
                <div className='offer-avatar-username'>
                  <span>{data.offer.owner.account.username}</span>
                </div>
                {data.offer.owner._id !== data.user?._id && (
                  <button className='product-button' onClick={handleBuy}>
                    Acheter
                  </button>
                )}

                {data.offer.owner._id === data.user?._id && (
                  <button
                    className='product-button update-button'
                    onClick={handleUpdate}
                  >
                    Mettre à jour
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
