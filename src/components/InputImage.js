import { useState } from "react";

const InputImage = ({ picture, setPicture }) => {
  const [imagePreview, setImagePreview] = useState();
  const handleImagePreview = (e) => {
    let image_as_base64 = URL.createObjectURL(e.target.files[0]);
    let image_as_files = e.target.files[0];
    setImagePreview(image_as_base64);
    setPicture(image_as_files);
  };
  return (
    <div className='input-default'>
      {imagePreview ? (
        <>
          <img
            className='image-preview-publish'
            src={imagePreview}
            alt='preview'
          />
          <div
            className='button-preview'
            onClick={() => {
              setImagePreview(null);
              setPicture(null);
            }}
          >
            <span>X</span>
          </div>
        </>
      ) : picture ? (
        <>
          <img className='image-preview-publish' src={picture} alt='preview' />
          <div className='button-preview' onClick={() => setPicture(null)}>
            <span>X</span>
          </div>
        </>
      ) : (
        <>
          <label htmlFor='file' className='label-file'>
            <span className='input-sign'>+</span>
          </label>
          <input
            id='file'
            type='file'
            className='input-file'
            onChange={handleImagePreview}
          />
        </>
      )}
    </div>
  );
};

export default InputImage;
