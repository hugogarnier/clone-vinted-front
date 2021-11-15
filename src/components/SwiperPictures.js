// Core modules imports are same as usual
import SwiperCore, { Navigation, Pagination } from "swiper";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
// Styles must use direct files imports
import "swiper/swiper.min.css"; // core Swiper
import "swiper/modules/navigation/navigation.min.css"; // Navigation module
import "swiper/modules/pagination/pagination.min.css"; // Pagination module

SwiperCore.use([Pagination, Navigation]);

const SwiperPictures = ({ data }) => {
  return (
    <Swiper
      pagination={{
        type: "progressbar",
      }}
      navigation={true}
      className='mySwiper'
    >
      <SwiperSlide>
        <img
          className='offer-picture'
          src={data.product_image.picture.result.secure_url}
          alt={data.product_name}
        />
      </SwiperSlide>
      {data.product_image.picture1 && (
        <SwiperSlide>
          <img
            className='offer-picture'
            src={data.product_image.picture1.result.secure_url}
            alt={data.product_name}
          />
        </SwiperSlide>
      )}
      {data.product_image.picture2 && (
        <SwiperSlide>
          <img
            className='offer-picture'
            src={data.product_image.picture2.result.secure_url}
            alt={data.product_name}
          />
        </SwiperSlide>
      )}
      {data.product_image.picture3 && (
        <SwiperSlide>
          <img
            className='offer-picture'
            src={data.product_image.picture3.result.secure_url}
            alt={data.product_name}
          />
        </SwiperSlide>
      )}
      {data.product_image.picture4 && (
        <SwiperSlide>
          <img
            className='offer-picture'
            src={data.product_image.picture4.result.secure_url}
            alt={data.product_name}
          />
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default SwiperPictures;
