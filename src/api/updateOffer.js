import axios from "axios";

const updateOffer = async (
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
) => {
  const body = new FormData();
  body.append("title", title);
  body.append("description", description);
  body.append("brand", brand);
  body.append("size", size);
  body.append("color", color);
  body.append("condition", condition);
  body.append("city", city);
  body.append("price", price);
  body.append("picture", picture);
  body.append("picture1", picture1);
  body.append("picture2", picture2);
  body.append("picture3", picture3);
  body.append("picture4", picture4);
  try {
    // eslint-disable-next-line
    console.log(body.has(title));
    const response = await axios.put(
      `${process.env.REACT_APP_URI}/offer/update/${id}`,
      body,
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

export default updateOffer;
