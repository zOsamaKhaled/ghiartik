import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./custom-style.css";

// icons
import { DollarSign, HeartPlus } from "lucide-react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { BsChatText } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineSettingsSuggest } from "react-icons/md";

import DefaultLayout from "@/layouts/default";
import MainSlider from "../components/slider";
import {
  Button,
  Image,
  Accordion,
  AccordionItem,
  addToast,
} from "@heroui/react";

// other components
import CarModelsSlider from "@/components/CarModelsSlider";
import VendorRating from "@/components/VendorRating";

import { useDispatch } from "react-redux";
import { openModal } from "@/features/mainModal/mainModalSlice";
import { useState } from "react";

export default function VendorPage() {
  const { vendorId } = useParams();
  const { allVendors } = useSelector((state: any) => state.vendors);

  const vendor = allVendors.find((v: any) => v.id === vendorId);

  const [fav, setFav] = useState(false);

  if (!vendor) return <p>هذا التاجر غير موجود</p>;
  const renderStars = (rate: number) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5;
    const totalStars = 5;

    return (
      <div
        className="flex flex-row-reverse items-center justify-end gap-4"
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

        <span className="text-4xl ">{rate}</span>
      </div>
    );
  };
  const renderBudget = (budget: number) => {
    let filled = 0;

    if (budget > 300) filled = 3;
    else if (budget > 100) filled = 2;
    else filled = 1;

    return (
      <div className="flex items-center gap-0.5 flex-row-reverse" dir="ltr">
        {[...Array(filled)].map((_, i) => (
          <DollarSign key={i} className="w-4 h-4 text-primary" />
        ))}
        {[...Array(3 - filled)].map((_, i) => (
          <DollarSign key={i + filled} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
    );
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  return (
    <DefaultLayout>
      <MainSlider />
      <div className="p-4 my-8 md:p-12 border-1 border-border rounded-3xl vendor_card">
        <div className="flex flex-col items-center gap-8 pb-8 top md:flex-row md:items-center md:justify-start">
          <div className="w-35 vendor_img">
            <Image
              alt={vendor.name_ar}
              className="object-contain w-35 "
              radius="lg"
              src={vendor.image_url}
            />
          </div>
          <div className="flex flex-col items-center justify-between w-full gap-4 pr-0 md:pr-8 items-between vendor_inset-ring-primary-foreground">
            <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row vendor_info_top ">
              <div className="flex flex-col items-center justify-center gap-4 info_right md:items-start md:justify-start">
                <h2 className="font-bold">{vendor.name_ar}</h2>
                <div className="flex flex-col items-center justify-center gap-2 rate-budget lg:flex-col lg:gap-2 md:items-start md:justify-start">
                  {renderStars(vendor.rating)}
                  {renderBudget(vendor.lowestBudget)}
                </div>
              </div>
              <div className="flex info_left">
                <div className="flex items-center gap-1 ml-6 social">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <AiFillTikTok />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <FaSquareFacebook />
                  </a>
                </div>
                <Button
                  isIconOnly
                  aria-label="favourite"
                  className={`transition duration-500 ease-in-out border-2 border-primary text-primary bg-transparent ${fav === true ? "bg-primary text-white" : ""}`}
                  onPress={() => {
                    setFav(!fav);
                    !fav
                      ? addToast({
                          title: "تم الاضافة للمفضلة",
                          color: "success",
                          timeout: 3000,
                          shouldShowTimeoutProgress: true,
                        })
                      : addToast({
                          title: "تم الإزالة من المفضلة",
                          color: "danger",
                          timeout: 3000,
                          shouldShowTimeoutProgress: true,
                        });
                  }}
                >
                  <HeartPlus />
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row vendor_info_bottom">
              <div className="info_right">
                <div className="flex flex-row items-center gap-2 ">
                  <div className="flex items-center gap-1">
                    <GrLocation className="text-icon" />
                    <p className="text-icon">{vendor.city}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <IoDocumentTextOutline className="text-icon" />
                    <p className="text-icon">س.ت</p>
                    <p className="text-icon">:2378653</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 info_left md:flex-row ">
                <div className="rounded-3xl bg-[#F7F7F7] items-center gap-2 justify-center flex p-2 w-max">
                  <TbTruckDelivery className="text-lg text-primary" />
                  <p className="text-sm text-primary">{vendor.delivery}</p>
                </div>
                <div className="rounded-3xl bg-[#F7F7F7] items-center gap-2 justify-center flex p-2 w-max">
                  <MdOutlineSettingsSuggest className="text-lg text-primary" />
                  <p className="text-sm text-primary">
                    {vendor.categories.join(" - ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="w-full py-4 text-default-200 " />
        <div className="flex items-center justify-center gap-2 bottom">
          <Button
            startContent={<MdOutlinePhoneInTalk />}
            className="bg-white border-1 text-primary border-[#D9D9D9] hover:text-white hover:bg-primary hover:border-primary"
          >
            اتصل
          </Button>
          <Button
            startContent={<HiOutlineEnvelope />}
            className="bg-white border-1 text-primary border-[#D9D9D9] hover:text-white hover:bg-primary hover:border-primary"
          >
            البريد
          </Button>
          <Button
            startContent={<BsChatText />}
            className="bg-white border-1 text-primary border-[#D9D9D9] hover:text-white hover:bg-primary hover:border-primary"
            onPress={
              token
                ? () => navigate(`/vendors/${vendor.id}/chat`)
                : () => {
                    addToast({
                      title: "يجب تسجيل الدخول للدردشة",
                      color: "danger",
                      timeout: 3000,
                      shouldShowTimeoutProgress: true,
                    });
                    dispatch(openModal("login"));
                  }
            }
          >
            دردشة
          </Button>
        </div>
      </div>

      {/* vendor description */}
      <div className="flex flex-col gap-8 my-12 vendor_description">
        <h2 className="text-2xl font-bold">وصف المتجر</h2>
        <p className="text-light-black">{vendor.description}</p>
      </div>
      {/* vendor description */}

      {/* vendor car models */}
      <div className="flex flex-col gap-8 my-12 vendor_car_models">
        <h2 className="text-2xl font-bold"> الموديلات المتاحة:</h2>
        <p className="text-light-black">{vendor.description}</p>
      </div>
      <CarModelsSlider />

      {/* vendor car models */}

      {/* vendor rating */}
      <VendorRating />
      {/* vendor rating */}
      <div className="w-full my-12">
        <Accordion className="w-full">
          <AccordionItem
            className="w-full px-4 border-1 border-border rounded-3xl"
            key="1"
            aria-label="شروط وأحكام المتجر"
            startContent={<IoDocumentTextOutline />}
            title="شروط وأحكام المتجر"
          >
            <p className="px-6 pb-4 text-light-black">{vendor.terms}</p>
          </AccordionItem>
        </Accordion>
      </div>
    </DefaultLayout>
  );
}
