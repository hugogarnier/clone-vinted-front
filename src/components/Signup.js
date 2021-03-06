import { useState } from "react";
import { ReactComponent as Close } from "../assets/images/close.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import checkBodyOverflow from "../utils/checkBodyOverflow";

const Signup = ({ setIsModalOpenSignUp, setUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [imagePreview, setImagePreview] = useState();
  const [avatar, setAvatar] = useState();

  const handleModal = () => {
    setIsModalOpenSignUp(false);
    checkBodyOverflow();
  };

  const handleImagePreview = (e) => {
    let image_as_base64 = URL.createObjectURL(e.target.files[0]);
    let image_as_files = e.target.files[0];
    setImagePreview(image_as_base64);
    setAvatar(image_as_files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length > 4) {
      const bodyForm = new FormData();
      bodyForm.append("username", username);
      bodyForm.append("email", email);
      bodyForm.append("password", password);
      bodyForm.append("phone", phone);
      bodyForm.append("picture", avatar);
      try {
        // eslint-disable-next-line
        const response = await axios.post(
          `${process.env.REACT_APP_URI}/user/signup`,
          bodyForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // console.log(response.data);
        response.data.token && setUser(response.data.token);
        setIsModalOpenSignUp(false);
        navigate("/");
      } catch (error) {
        setErrorEmail(error.response.data.message);
        console.log(error.message);
      }
    } else {
      setErrorPassword("Le mot de passe doit être supérieur à 4 caractères !");
    }
  };

  return (
    <div className='signup-container'>
      <form className='forms-log' onSubmit={handleSubmit}>
        <Close onClick={handleModal} className='form-close' />
        <h1>S'inscrire</h1>
        <input
          type='text'
          name='username'
          id='username'
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='text'
          name='phone'
          id='phone'
          placeholder='Téléphone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type='email'
          name='email'
          id='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errorEmail && (
          <label className='label-error' htmlFor='email'>
            {errorEmail}
          </label>
        )}
        <input
          type='password'
          name='password'
          id='password'
          placeholder='Mot de passe'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorPassword("");
          }}
        />
        {errorPassword && (
          <label className='label-error' htmlFor='password'>
            {errorPassword}
          </label>
        )}
        <div className='image-preview-container'>
          {imagePreview && (
            <img className='image-preview' src={imagePreview} alt='preview' />
          )}
          <input type='file' onChange={handleImagePreview} />
        </div>

        <div className='check-newsletter'>
          <div>
            <input type='checkbox' name='check-news' id='check-news' />
            <label htmlFor='check-news'>S'inscrire à la newsletter</label>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <input type='submit' value="S'inscrire" />
      </form>
    </div>
  );
};

export default Signup;
