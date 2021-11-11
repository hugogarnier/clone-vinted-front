import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { ReactComponent as Close } from "../assets/images/close.svg";

const Login = ({ setIsModalOpenLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [error, setError] = useState("");

  const handleModal = () => {
    setIsModalOpenLogin(false);
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  };

  const handleSubmit = async () => {
    if (password.length > 4) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_URI}/user/login`,
          {
            email: email,
            password: password,
          }
        );
        // console.log(response.data.token);
        Cookies.set("token", response.data.token);
        setIsModalOpenLogin(false);
        navigate("/");
      } catch (error) {
        console.log(error.message);
        setError("Mauvais mot de passe/email");
      }
    } else {
      setErrorPassword("Le mot de passe doit être supérieur à 4 caractères !");
    }
  };

  return (
    <div className='signup-container'>
      <form onSubmit={handleSubmit}>
        <Close onClick={handleModal} className='form-close' />
        <h1>S'inscrire</h1>

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
