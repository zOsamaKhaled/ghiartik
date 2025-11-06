import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// icons

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import { Progress, Avatar } from "@heroui/react";

// other components

import { opinions_data } from "@/config/opinions_data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export default function VendorRating() {
  const { allVendors } = useSelector((state: any) => state.vendors);
  const { vendorId } = useParams();
  const vendor = allVendors.find((v: any) => v.id === vendorId);
  const renderCustomizedRating = (rate: number) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5;
    const totalStars = 5;

    return (
      <div
        className="flex flex-row-reverse items-center justify-end gap-4"
        dir="rtl"
      >
        <div className="flex flex-col gap-2">
          <div className="stars_container flex items-center gap-0.5">
            {[...Array(totalStars)].map((_, i) => {
              if (i < fullStars) {
                return <FaStar key={i} className="w-4 h-4 text-yellow-500" />;
              } else if (i === fullStars && halfStar) {
                return (
                  <FaStarHalfAlt
                    key={i}
                    className="w-4 h-4 text-yellow-500 transform scale-x-[-1]"
                  />
                );
              } else {
                return <FaRegStar key={i} className="w-4 h-4 text-gray-300" />;
              }
            })}
          </div>
          <p className="text-xs text-icon">248 شخصاً قاموا بالتقييم</p>
        </div>

        <p className="text-4xl ">{rate}</p>
      </div>
    );
  };
  const renderStars = (rate: number) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5;
    const totalStars = 5;

    return (
      <div
        className="flex flex-row-reverse items-center justify-end gap-2"
        dir="rtl"
      >
        <div className="stars_container flex items-center gap-0.5">
          {[...Array(totalStars)].map((_, i) => {
            if (i < fullStars) {
              return <FaStar key={i} className="w-4 h-4 text-yellow-500" />;
            } else if (i === fullStars && halfStar) {
              return (
                <FaStarHalfAlt
                  key={i}
                  className="w-4 h-4 text-yellow-500 transform scale-x-[-1]"
                />
              );
            } else {
              return <FaRegStar key={i} className="w-4 h-4 text-gray-300" />;
            }
          })}
        </div>

        {/* <span className="text-lg text-light-black">{rate}</span> */}
      </div>
    );
  };

  const ratingToPercentage = (rating: number) => (rating / 5) * 100;
  const ratingLevels = [5, 4, 3, 2, 1];
  return (
    <div className="flex flex-col gap-8 my-12 vendor_users_rating">
      <div className="flex flex-col gap-8 vendor_rating_top">
        <h2 className="text-2xl font-bold">تقييم المستخدمين</h2>
      </div>
      <div className="flex flex-col gap-8 p-8 vendor_rating_bottom rounded-3xl bg-default-100">
        {renderCustomizedRating(vendor.rating)}
        <div className="flex flex-col gap-4 progress-container">
          {ratingLevels.map((level, index) => {
            let value;
            if (index === 4) {
              // آخر بار 5%
              value = 5;
            } else {
              // كل بار يقلل 10% عن اللي قبله
              value = Math.max(
                ratingToPercentage(vendor.rating) - index * 10,
                0
              );
            }

            return (
              <div className="flex items-center gap-4 progress-row" key={index}>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-default-500">{level}</p>
                  <FaStar className="w-4 h-4 text-yellow-500" />
                </div>
                <Progress
                  key={index}
                  aria-label={`${level} stars`}
                  size="sm"
                  color="success"
                  value={value}
                />
                <div>
                  <p className="text-xs rating_count text-default-500">123</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="people_opinions">
        <Swiper
          slidesPerView={5} // عدد العناصر الظاهرة
          spaceBetween={20} // المسافة بين السلايدات
          loop={true} // تشغيل اللوب
          autoplay={{ delay: 2500 }}
          navigation={{
            nextEl: ".next-arrow-btn",
            prevEl: ".prev-arrow-btn",
          }}
          modules={[Autoplay]}
          className="w-[100%]  transition duration-500 z-15! relative! "
          breakpoints={{
            0: {
              // من أول الموبايل (أقل من 640px)
              slidesPerView: 1,
            },
            640: {
              // من أول التابلت الصغير
              slidesPerView: 2,
            },
            1024: {
              // من أول اللابتوب وما فوق
              slidesPerView: 2,
            },
            1440: {
              // من أول اللابتوب وما فوق
              slidesPerView: 2,
            },
          }}
        >
          {opinions_data.map((slide, index) => {
            return (
              <SwiperSlide
                key={index}
                className="relative flex items-center justify-start p-4 transition duration-500 bg-white rounded-4xl border-1 dark:bg-[#0d1117]  border-icon hover:bg-default-50 hover:border-primary"
                style={{
                  height: "auto",
                }}
              >
                {/* <img
                src={slide.image}
                alt="Product 1"
                className="mb-2 rounded-lg"
              /> */}
                <div className="flex flex-col items-start justify-start gap-2 p-2 content-container ">
                  <div className="flex flex-row items-start justify-start gap-4 text-content-container ">
                    <div className=" logo-container">
                      <Avatar
                        size="lg"
                        isBordered
                        radius="full"
                        src={slide.photo}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <p className="text-right text-black dark:text-[#fff] text-md md:text-lg">
                          {slide.name}
                        </p>
                        <div>{renderStars(slide.rating)}</div>
                      </div>
                      <div>
                        <p className="font-light text-justify text-md text-light-black">
                          {slide.review}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}

          {/*  */}
        </Swiper>
      </div>
    </div>
  );
}
