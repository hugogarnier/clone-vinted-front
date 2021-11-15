import axios from "axios";

const publishOffer = async (
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
) => {
  const bodyForm = new FormData();
  bodyForm.append("title", title);
  bodyForm.append("description", description);
  bodyForm.append("brand", brand);
  bodyForm.append("size", size);
  bodyForm.append("color", color);
  bodyForm.append("condition", condition);
  bodyForm.append("city", city);
  bodyForm.append("price", price);
  bodyForm.append("picture", picture);
  bodyForm.append("picture1", picture1);
  bodyForm.append("picture2", picture2);
  bodyForm.append("picture3", picture3);
  bodyForm.append("picture4", picture4);
  try {
    // eslint-disable-next-line
    const response = await axios.post(
      `${process.env.REACT_APP_URI}/offer/publish`,
      bodyForm,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      const idOffer = response.data._id;
      return { idOffer };
    }
    // navigate("/");
  } catch (error) {
    // console.log(error.response.data.message);
    const errorPublish = error.response.data.message;
    return { errorPublish };
  }
};

export default publishOffer;
