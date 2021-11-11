import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";

import onImage from "../assets/images/onImage.svg";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URI}/offers`);
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className='loading'>
          <ReactLoading type='bars' color='#359ca3' height={300} width={100} />
        </div>
      ) : (
        <>
          <div className='hero-image'>
            <img src={onImage} alt='hero form' className='hero-image-form' />
            <div>
              <div className='hero-ready'>
                <span>Prêts à faire du tri dans vos placards</span>
                <button>Commencer à vendre</button>
              </div>
            </div>
          </div>
          <div className='card-wrapper'>
            {data.offers.map((elem, index) => {
              return (
                <Link to={`/product/${elem._id}`} key={index}>
                  <div className='card-container'>
                    <div className='card-avatar-username'>
                      {elem.owner.account.avatar.secure_url ? (
                        <img
                          className='avatar'
                          src={elem.owner.account.avatar.secure_url}
                          alt='username avatar'
                        />
                      ) : (
                        <div className='avatar avatar-empty'>
                          {elem.owner.account.username
                            .slice(0, 1)
                            .toUpperCase()}
                        </div>
                      )}

                      <span>{elem.owner.account.username}</span>
                    </div>
                    <div>
                      <img
                        src={elem.product_image.picture.result.secure_url}
                        alt={elem.product_name}
                      />

                      <div className='card-infos'>
                        <span>{elem.product_price} €</span>
                        <span>{elem.product_details[3].TAILLE}</span>
                        <span>{elem.product_details[2].MARQUE}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
