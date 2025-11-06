// App.jsx

import { useRef } from "react";

// استيراد مكونات Swiper
import { Swiper, SwiperSlide } from "swiper/react";

// استيراد الأنماط الأساسية
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// استيراد الموديولات (اختياري)
import { Pagination, Navigation } from "swiper/modules";

import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
const SLIDER_CONTENT = [
  {
    sub_title: "أقوى وأفضل العروض",
    title: "قطع غيار أصلية للسيارات",
    description:
      "اكتشف مجموعة واسعة من قطع الغيار الأصلية بأعلى جودة وأفضل أداء لسيارتك.",
    image: "/slider/slider4.jpg",
    offerId: "/vendors/11",
  },
  {
    sub_title: "تجربة قيادة آمنة",
    title: "اختيارك الأمثل للقطع الأصلية",
    description:
      "قطع الغيار لدينا مصممة لضمان سلامتك وتحسين أداء سيارتك بأفضل الأسعار.",
    image: "/slider/slider3.jpg",
    offerId: "/vendors/8",
  },
  {
    sub_title: "جودة موثوقة",
    title: "أجزاء سيارات عالية التحمل",
    description:
      "نوفر لك قطع غيار تتحمل أقسى الظروف مع الحفاظ على جودة السيارة وكفاءتها.",
    image: "/slider/slider2.jpg",
    offerId: "/vendors/3",
  },
  {
    sub_title: "أفضل الصفقات",
    title: "قطع غيار معتمدة ومضمونة",
    description:
      "استفد من العروض المميزة واحصل على قطع غيار أصلية تضمن لك الأداء الأمثل .",
    image: "/slider/slider.jpg",
    offerId: "/vendors/4",
  },
];

function MainSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center ">
      <Swiper
        slidesPerView={1} // عدد العناصر الظاهرة
        spaceBetween={20} // المسافة بين السلايدات
        loop={true} // تشغيل اللوب
        // autoplay={{ delay: 2500 }}
        pagination={{
          type: "bullets",
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet", // تخصيص الكلاس
          bulletActiveClass: "custom-bullet-active", // كلاس النقطه النشطة
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        modules={[Pagination, Navigation]}
        // modules={[Pagination, Navigation, Autoplay]}
        className="w-[100%] max-w-7xl"
      >
        {SLIDER_CONTENT.map((slide, index) => {
          return (
            <SwiperSlide
              key={index}
              className="relative flex! items-center! justify-center! p-0 rounded-4xl md:items-start! md:justify-start!"
              style={{
                backgroundImage: `url(${slide.image})`,
                height: "350px",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* <img
                src={slide.image}
                alt="Product 1"
                className="mb-2 rounded-lg"
              /> */}
              <div className="absolute flex flex-col justify-between md:items-start items-center gap-2 md:p-12 p-0 content-container md:gap-12 lg:h-[350px] md:h-[300px] w-[400px]">
                <div className="flex flex-col items-center justify-center gap-4 text-content-container md:items-start ">
                  <h4 className="text-2xl font-light text-center text-white md:text-right lg:text-4xl">
                    {slide.sub_title}
                  </h4>
                  <h2 className="text-xl font-bold text-center text-white md:text-right lg:text-5xl w-max">
                    {slide.title}
                  </h2>
                  <p className="text-xs font-normal text-center md:text-right text-primary md:text-lg md:w-80 w-60">
                    {slide.description}
                  </p>
                </div>
                <div className="flex justify-end pt-8 btn-content-container md:pt-0">
                  <Button
                    className="text-sm font-normal text-default-600 bg-default-100 w-44 hover:bg-primary hover:text-white"
                    href={slide.offerId}
                    variant="flat"
                    onPress={() => navigate(slide.offerId)}
                  >
                    المزيد
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        {/*  */}

        {/* أزرار التنقل المخصصة */}
        {/* <div className="absolute z-10 flex gap-2 text-primary top-73 right-60 slider-arrows ">
          <button
            ref={prevRef}
            className="left-0 z-10 p-2 transition duration-300 -translate-y-1/2 bg-transparent border rounded-full cursor-pointer border-primary hover:bg-primary hover:text-white"
          >
            <LeftArrowIcon />
          </button>
          <button
            ref={nextRef}
            className="right-0 z-10 p-2 transition duration-300 -translate-y-1/2 bg-transparent border rounded-full cursor-pointer border-primary hover:bg-primary hover:text-white"
          >
            <RightArrowIcon />
          </button>
        </div> */}
      </Swiper>
    </div>
  );
}

export default MainSlider;
