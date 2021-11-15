import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

import onImage from "../assets/images/onImage.svg";
import filterOffers from "../api/filterOffers";
import RangePrice from "../components/RangePrice";

const MIN = 5;
const MAX = 900;

const Home = ({ productName }) => {
  const [data, setData] = useState();
  const [asc, setAsc] = useState(true);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [values, setValues] = useState([MIN, MAX]);
  useEffect(() => {
    const offers = async () => {
      const offers = await filterOffers(
        productName,
        asc,
        perPage,
        values,
        page
      );
      setData(offers);
      setIsLoading(false);
    };

    offers();
  }, [productName, asc, perPage, values, page]);

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
          <div className='filters'>
            <div
              className='reset-filters'
              onClick={() => {
                setPerPage(10);
                setValues([MIN, MAX]);
                setAsc(true);
                setPage(1);
              }}
            >
              Reset filtre
            </div>
            <div className='asc-desc'>
              <span>Trier par prix</span>
              <svg
                className={asc ? "active" : "inactive"}
                onClick={() => setAsc(true)}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 32 32'
              >
                <g data-name='9-Arrow Up'>
                  <path d='M25 0H7a7 7 0 0 0-7 7v18a7 7 0 0 0 7 7h18a7 7 0 0 0 7-7V7a7 7 0 0 0-7-7zm5 25a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h18a5 5 0 0 1 5 5z' />
                  <path d='m15.29 5.29-7 7L9.7 13.7 15 8.41V27h2V8.41l5.29 5.29 1.41-1.41-7-7a1 1 0 0 0-1.41 0z' />
                </g>
              </svg>
              <svg
                className={asc ? "inactive" : "active"}
                onClick={() => setAsc(false)}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 32 32'
              >
                <g data-name='10-Arrow Down'>
                  <path d='M25 0H7a7 7 0 0 0-7 7v18a7 7 0 0 0 7 7h18a7 7 0 0 0 7-7V7a7 7 0 0 0-7-7zm5 25a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h18a5 5 0 0 1 5 5z' />
                  <path d='M17 23.59V5h-2v18.59l-5.29-5.3-1.42 1.42 7 7a1 1 0 0 0 1.41 0l7-7-1.41-1.41z' />
                </g>
              </svg>
            </div>
            <div className='numberPerPage'>
              <span>Produits par page</span>
              <select
                onChange={(e) => setPerPage(e.target.value)}
                value={perPage}
              >
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
            <div className='range'>
              <RangePrice
                values={values}
                setValues={setValues}
                MIN={MIN}
                MAX={MAX}
              />
            </div>
          </div>
          {data.offers.length < 1 ? (
            <div className='card-wrapper-empty'>No result 😭 !</div>
          ) : (
            <div className='card-wrapper'>
              {data.offers.map((elem, index) => {
                return (
                  <Link to={`/product/${elem._id}`} key={index}>
                    <div className='card-container'>
                      <div className='card-avatar-username'>
                        {elem.owner.account.avatar ? (
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
          )}

          <div className='pages'>
            {page > 1 && (
              <svg
                onClick={() => setPage(page - 1)}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 32 32'
              >
                <g data-name='12-Arrow Left'>
                  <path d='M25 0H7a7 7 0 0 0-7 7v18a7 7 0 0 0 7 7h18a7 7 0 0 0 7-7V7a7 7 0 0 0-7-7zm5 25a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h18a5 5 0 0 1 5 5z' />
                  <path d='m13.71 9.71-1.42-1.42-7 7a1 1 0 0 0 0 1.41l7 7 1.41-1.41L8.41 17H27v-2H8.41z' />
                </g>
              </svg>
            )}

            <span>{page}</span>

            {Math.sign(Number(data.count) - Number(perPage) * page) === 1 && (
              <svg
                onClick={() => setPage(page + 1)}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 32 32'
              >
                <g data-name='11-Arrow Right'>
                  <path d='M25 0H7a7 7 0 0 0-7 7v18a7 7 0 0 0 7 7h18a7 7 0 0 0 7-7V7a7 7 0 0 0-7-7zm5 25a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h18a5 5 0 0 1 5 5z' />
                  <path d='m19.71 8.29-1.42 1.42 5.3 5.29H5v2h18.59l-5.29 5.29 1.41 1.41 7-7a1 1 0 0 0 0-1.41z' />
                </g>
              </svg>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
