import axios from "axios";

const filterOffers = async (productName, asc, perPage, values) => {
  try {
    const prices = `&priceMin=${values[0]}&priceMax=${values[1]}`;
    const limit = `&limit=${perPage}`;
    let filters = "";
    productName && (filters = `?title=${productName}${limit}${prices}`);
    asc && (filters = `?sort=price-asc${limit}${prices}`);
    !asc && (filters = `?sort=price-desc${limit}${prices}`);
    productName &&
      asc &&
      (filters = `?title=${productName}&price=price-asc${limit}${prices}`);
    productName &&
      !asc &&
      (filters = `?title=${productName}&price=price-desc${limit}${prices}`);
    let URI = `${process.env.REACT_APP_URI}/offers${filters}`;

    const response = await axios.get(URI);
    console.log(URI);
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export default filterOffers;
