import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import updateOffer from "../api/updateOffer";
import InputImage from "../components/InputImage";

const Update = ({ token }) => {
  // eslint-disable-next-line
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState();
  const [picture1, setPicture1] = useState();
  const [picture2, setPicture2] = useState();
  const [picture3, setPicture3] = useState();
  const [picture4, setPicture4] = useState();

  useEffect(() => {
    !title && setTitle(location.state.product_name);
    !description && setDescription(location.state.product_description);
    !brand && setBrand(location.state.product_details[2].MARQUE);
    !size && setSize(location.state.product_details[3].TAILLE);
    !color && setColor(location.state.product_details[4].COULEUR);
    !condition && setCondition(location.state.product_details[0].ÉTAT);
    !city && setCity(location.state.product_details[1].EMPLACEMENT);
    !price && setPrice(location.state.product_price);
    location.state.product_image.picture &&
      !picture &&
      setPicture(location.state.product_image.picture.result.secure_url);
    location.state.product_image.picture1 &&
      !picture1 &&
      setPicture(location.state.product_image.picture1.result.secure_url);
    location.state.product_image.picture2 &&
      !picture2 &&
      setPicture(location.state.product_image.picture2.result.secure_url);
    location.state.product_image.picture3 &&
      !picture3 &&
      setPicture(location.state.product_image.picture3.result.secure_url);
    location.state.product_image.picture4 &&
      !picture4 &&
      setPicture(location.state.product_image.picture4.result.secure_url);
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = location.state._id;
    updateOffer(
      title,
      description,
      brand,
      size,
      color,
      condition,
      city,
      price,
      token,
      picture,
      picture1,
      picture2,
      picture3,
      picture4,
      id
    ).then(({ idOffer, errorPublish }) => {
      if (idOffer) {
        toast("Offre mise à jour!", {
          icon: "✅",
        });
        navigate(`/product/${idOffer}`);
      } else {
        toast(errorPublish);
      }
    });
  };

  return (
    <div className='publish-main'>
      <div className='publish-container container'>
        <h2>Mets à jour ton article</h2>
        <form className='form-publish' onSubmit={handleSubmit}>
          <Toaster />
          <div className='files'>
            <div className='without-preview'>
              <InputImage setPicture={setPicture} picture={picture} />
              <InputImage
                setPicture={setPicture1}
                picture={picture1 ? picture1 : null}
              />
              <InputImage
                setPicture={setPicture2}
                picture={picture2 ? picture2 : null}
              />
              <InputImage
                setPicture={setPicture3}
                picture={picture3 ? picture3 : null}
              />
              <InputImage
                setPicture={setPicture4}
                picture={picture4 ? picture4 : null}
              />
            </div>
          </div>
          <div className='text-input-section'>
            <div className='text-input'>
              <h4>Titre</h4>
              <input
                type='text'
                id='title'
                placeholder={location.state.product_name}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='text-input'>
              <h4>Description</h4>
              <textarea
                name='description'
                id='description'
                rows='5'
                placeholder={location.state.product_description}
                spellCheck='false'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className='text-input-section'>
            <div className='text-input'>
              <h4>Marque</h4>
              <input
                type='text'
                id='selectedBrand'
                name='selectedBrand'
                placeholder={location.state.product_details[2].MARQUE}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className='text-input'>
              <h4>Taille</h4>
              <input
                type='text'
                id='selectedSize'
                name='selectedSize'
                placeholder={location.state.product_details[3].TAILLE}
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
            <div className='text-input'>
              <h4>Couleur</h4>
              <input
                type='text'
                id='color'
                name='color'
                placeholder={location.state.product_details[4].COULEUR}
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className='text-input'>
              <h4>Etat</h4>
              <input
                name='wearRate'
                id='wearRate'
                placeholder={location.state.product_details[0].ÉTAT}
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              />
            </div>
            <div className='text-input'>
              <h4>Lieu</h4>
              <input
                name='city'
                id='city'
                placeholder={location.state.product_details[1].EMPLACEMENT}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <div className='text-input-section'>
            <div className='text-input'>
              <h4>Prix</h4>
              <div className='checkbox-section'>
                <input
                  type='text'
                  id='price'
                  name='price'
                  placeholder={location.state.product_price + " €"}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='form-submit'>
            <button type='submit' className='form-validation'>
              Mettre à jour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
