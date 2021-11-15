import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ReactComponent as Close } from "../assets/images/close.svg";
import checkBodyOverflow from "../utils/checkBodyOverflow";

const Login = ({ setIsModalOpenLogin, setUser, publishButtonClicked }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [error, setError] = useState("");

  const handleModal = () => {
    setIsModalOpenLogin(false);
    checkBodyOverflow();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length > 4) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_URI}/user/login`,
          {
            email,
            password,
          }
        );
        // console.log(response.data.token);
        response.data.token && setUser(response.data.token);
        setIsModalOpenLogin(false);
        checkBodyOverflow();
        publishButtonClicked ? navigate("/publish") : navigate("/");
      } catch (error) {
        console.log(error.message);
        error.response.status === 401 && setError("Mauvais mot de passe/email");
      }
    } else {
      setErrorPassword("Le mot de passe doit être supérieur à 4 caractères !");
    }
  };

  return (
    <div className='signup-container'>
      <form className='forms-log' onSubmit={handleSubmit}>
        <Close onClick={handleModal} className='form-close' />
        <h1>Se connecter</h1>

        <input
          type='email'
          name='email'
          id='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
        {error && (
          <label className='label-error' htmlFor='password'>
            {error}
          </label>
        )}

        <input type='submit' value='Se connecter' />
      </form>
    </div>
  );
};

export default Login;
