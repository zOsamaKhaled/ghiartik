import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { RightArrowIcon, LeftArrowIcon } from "@/components/icons";

// استيراد الموديولات (اختياري)
import { Navigation, Autoplay } from "swiper/modules";

import { car_data } from "@/config/car_data";
import { Button } from "@heroui/button";

export default function CarModelsSlider() {
  const [selectedModels, setSelectedModels] = useState<string[]>(
    car_data[0].models
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  function handleShowModels(index: number) {
    const models = car_data[index].models;
    setActiveIndex(index);
    setSelectedModels(models);
  }

  return (
    <div className="flex flex-col items-start justify-start h-auto">
      <Swiper
        slidesPerView={5} // عدد العناصر الظاهرة
        spaceBetween={20} // المسافة بين السلايدات
        loop={true} // تشغيل اللوب
        autoplay={{ delay: 3500 }}
        navigation={{
          nextEl: ".next-arrow-btn",
          prevEl: ".prev-arrow-btn",
        }}
        modules={[Navigation, Autoplay]}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
          handleShowModels(swiper.activeIndex);
        }}
        className="w-[70%] md:w-[85%] lg:w-[88%] transition duration-500 z-15! relative! "
        breakpoints={{
          0: {
            // من أول الموبايل (أقل من 640px)
            slidesPerView: 1,
          },
          640: {
            // من أول التابلت الصغير
            slidesPerView: 3,
          },
          1024: {
            // من أول اللابتوب وما فوق
            slidesPerView: 4,
          },
          1440: {
            // من أول اللابتوب وما فوق
            slidesPerView: 5,
          },
        }}
      >
        {car_data.map((slide, index) => {
          return (
            <SwiperSlide
              key={index}
              onClick={() => handleShowModels(index)}
              className={`${activeIndex === index ? "active_slide" : ""} relative flex items-center justify-center p-0 transition duration-500 bg-white cursor-pointer rounded-4xl border-1 border-icon hover:bg-default-50 hover:border-primary`}
              style={{
                height: "auto",
              }}
            >
              {/* <img
                src={slide.image}
                alt="Product 1"
                className="mb-2 rounded-lg"
              /> */}
              <div className="flex flex-col items-center justify-center gap-2 p-2 content-container ">
                <div className="flex flex-row items-center justify-center gap-2 text-content-container ">
                  <div className="flex items-center justify-center w-8 h-8 logo-container">
                    <img
                      src={slide.logo}
                      className="max-w-[100%] max-h-[100%] object-cover"
                    />
                  </div>

                  <p className="text-right text-black text-md md:text-lg">
                    {slide.brand}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        {/*  */}
      </Swiper>

      {/* أزرار التنقل المخصصة */}
      <div className="relative z-10 flex items-center justify-center w-full h-20 mt-[-45px] gap-2 text-primary slider-arrows ">
        <Button
          isIconOnly
          className="absolute left-0 p-2 transition duration-300 -translate-y-1/2 bg-transparent border rounded-full cursor-pointer prev-arrow-btn border-primary hover:bg-primary hover:text-white"
        >
          <LeftArrowIcon />
        </Button>
        <Button
          isIconOnly
          className="absolute right-0 p-2 transition duration-300 -translate-y-1/2 bg-transparent border rounded-full cursor-pointer next-arrow-btn border-primary hover:bg-primary hover:text-white"
        >
          <RightArrowIcon />
        </Button>
      </div>
      {/* Car Models Bar */}
      <div className="flex w-full gap-4 mt-6 overflow-x-auto overflow-y-hidden h-14 car_models_bar border-1 border-icon rounded-4xl">
        <div className="flex items-center justify-start gap-2 p-4 car_models_bar_item">
          {selectedModels.map((model, index) => (
            <span
              key={index}
              className="p-2 text-sm font-medium bg-default-100 rounded-3xl w-max"
            >
              {model}
            </span>
          ))}
        </div>
      </div>
      {/* Car Models Bar */}
    </div>
  );
}
