import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import publishOffer from "../api/publishOffer";
import InputImage from "../components/InputImage";

const Publish = ({ token }) => {
  // eslint-disable-next-line
  const navigate = useNavigate();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      title &&
      description &&
      brand &&
      size &&
      color &&
      condition &&
      city &&
      price
    ) {
      publishOffer(
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
        picture4
      ).then(({ idOffer, errorPublish }) => {
        if (idOffer) {
          toast("Offre publiée !", {
            icon: "✅",
          });
          navigate(`/product/${idOffer}`);
        } else {
          toast(errorPublish);
        }
      });
    } else {
      toast("Tous les champs sont obligatoires", {
        // Custom Icon
        icon: "❌",
      });
    }
  };

  return (
    <div className='publish-main'>
      <div className='publish-container container'>
        <h2>Vends ton article</h2>
        <form className='form-publish' onSubmit={handleSubmit}>
          <Toaster />
          <div className='files'>
            <div className='without-preview'>
              <InputImage setPicture={setPicture} />
              <InputImage setPicture={setPicture1} />
              <InputImage setPicture={setPicture2} />
              <InputImage setPicture={setPicture3} />
              <InputImage setPicture={setPicture4} />
            </div>
          </div>
          <div className='text-input-section'>
            <div className='text-input'>
              <h4>Titre</h4>
              <input
                type='text'
                id='title'
                placeholder='ex: Chemise Zara rose'
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
                placeholder='ex: porté quelquefois, taille correctement'
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
                placeholder='ex: Zara'
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
                placeholder='ex: L / 40 / 12'
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
                placeholder='ex: Fushia'
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className='text-input'>
              <h4>Etat</h4>
              <input
                name='wearRate'
                id='wearRate'
                placeholder='Neuf avec étiquette'
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              />
            </div>
            <div className='text-input'>
              <h4>Lieu</h4>
              <input
                name='city'
                id='city'
                placeholder='ex: Paris'
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
                  placeholder='0,00 €'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <div className='checkbox-input'>
                  <input
                    type='checkbox'
                    name='exchange'
                    id='exchange'
                    value='exchange'
                  />
                  <span>Je suis intéressé(e) par les échanges</span>
                </div>
              </div>
            </div>
          </div>
          <div className='form-submit'>
            <button type='submit' className='form-validation'>
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Publish;
