import axios from "axios";

const Login = async (username, email, password, phone) => {
  try {
    console.log(username);
    const response = await axios.post(
      `${process.env.REACT_APP_URI}/user/signup`,
      {
        body: {
          username: username,
          email: email,
          password: password,
          phone: phone,
        },
      }
    );
    console.log(response.data);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export default Login;
