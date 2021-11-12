import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URI}/offer/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className='offer-body'>
          <div className='offer-container'>
            <div className='offer-picture'>
              <img
                className='offer-picture'
                src={data.product_image.picture.result.secure_url}
                alt={data.product_name}
              />
            </div>
            <div className='offer-infos'>
              <div>
                <span className='offer-price'>{data.product_price} €</span>
                <ul className='offer-list'>
                  {data.product_details.map((elem, index) => {
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
                <p className='name'>{data.product_name}</p>
                <p className='description'>{data.product_description}</p>
                <div className='offer-avatar-username'>
                  <span>{data.owner.account.username}</span>
                </div>
                <button>Acheter</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
