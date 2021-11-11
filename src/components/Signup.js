import { useState } from "react";
import { ReactComponent as Close } from "../assets/images/close.svg";

import Login from "../api/Login";

const Signup = ({ setIsModalOpen }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(0);

  const handleModal = () => {
    setIsModalOpen(false);
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Login(username, email, password, phone).then(() => {
      setIsModalOpen(false);
    });
  };

  return (
    <div className='signup-container'>
      <form onSubmit={handleSubmit}>
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
        <input
          type='password'
          name='password'
          id='password'
          placeholder='Mot de passe'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

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
