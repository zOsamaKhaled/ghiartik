import DefaultLayout from "@/layouts/default";
// Simple custom tabs — avoid type mismatches with the external Tabs component
import {
  CiChat1,
  CiMapPin,
  CiShop,
  CiStar,
  CiTrash,
  CiUser,
} from "react-icons/ci";

import { PiMapPin, PiPhoneCall } from "react-icons/pi";
import { IoCarSportOutline, IoPricetagsOutline } from "react-icons/io5";

import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

import { useState } from "react";
import { Button } from "@heroui/button";

import { CgNotes } from "react-icons/cg";

import { Link, useNavigate } from "react-router-dom";
import { RiPinDistanceFill } from "react-icons/ri";
import { price_offers } from "@/config/price_offers_data";
import { Accordion, AccordionItem } from "@heroui/react";

export default function QuotesPage() {
  const [activeTab, setActiveTab] = useState<string>("topRated");
  const [priceOffers, setPriceOffers] = useState(price_offers);

  //   const { order_number } = useParams(); use it if i have real data to filter the whole orders to get the quotes but now i'm just rendering fake data

  const navigate = useNavigate();

  const handleRemoveQuote = (offerId: string) => {
    setPriceOffers((prevOffers) =>
      prevOffers.filter((offer) => offer.offer_id !== offerId)
    );
  };
  const renderStars = (rate: number) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5;
    const totalStars = 5;

    return (
      <div
        className="flex flex-row-reverse items-center justify-center gap-1"
        dir="rtl"
      >
        <span className="text-xs text-default-400">{rate}</span>
        <div className="stars_container flex items-center gap-0.5">
          {[...Array(totalStars)].map((_, i) => {
            if (i < fullStars) {
              return <FaStar key={i} className="w-3 h-3 text-yellow-500" />;
            } else if (i === fullStars && halfStar) {
              return (
                <FaStarHalfAlt
                  key={i}
                  className="w-3 h-3 text-yellow-500 transform scale-x-[-1]"
                />
              );
            } else {
              return <FaRegStar key={i} className="w-3 h-3 text-gray-300" />;
            }
          })}
        </div>
      </div>
    );
  };
  // const randomProducts =
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center w-full py-10">
        <div className="flex flex-col items-center justify-between w-full lg:flex-row">
          <h3 className="text-3xl font-normal">عروض الأسعار</h3>
          <div className="grid grid-cols-2 gap-3 mt-4 lg:flex lg:items-center">
            {[
              { id: "topRated", label: "الأعلى تقييماً" },
              { id: "bestPrice", label: "أفضل سعر" },
              { id: "closest", label: "الأقرب" },
            ].map((t) => (
              <Button
                key={t.id}
                aria-pressed={activeTab === t.id}
                className={`px-4 py-2 rounded-3xl font-medium transition duration-700 ease-in-out transform cursor-pointer focus:outline-none whitespace-nowrap
                    ${
                      activeTab === t.id
                        ? "bg-primary text-white shadow-md "
                        : "bg-transparent text-gray-600 border border-border hover:bg-primary/70 hover:text-white "
                    }`}
                onPress={() => setActiveTab(t.id)}
                startContent={
                  t.id === "topRated" ? (
                    <CiStar size={20} />
                  ) : t.id === "bestPrice" ? (
                    <IoPricetagsOutline size={20} />
                  ) : t.id === "closest" ? (
                    <RiPinDistanceFill size={20} />
                  ) : (
                    <CiStar size={20} />
                  )
                }
              >
                {t.label}
              </Button>
            ))}
          </div>
        </div>
        <div
          className={
            "mt-4 md:border-1 border-border rounded-3xl w-full md:p-8 p-0 border-0 "
          }
          key={activeTab}
        >
          {/* active Tab : topRated */}

          {activeTab === "topRated" && (
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-1">
              {priceOffers
                .sort((a, b) => b.merchant_rating - a.merchant_rating)
                .map((o) => (
                  <div
                    key={o.id}
                    className="flex flex-col h-full gap-4 p-2 md:p-8 border-1 border-border rounded-2xl "
                  >
                    <div className="flex flex-col items-start justify-between gap-2 md:items-end md:flex-row">
                      <Link to={`/vendors/${o.id}`}>
                        <div className="flex justify-start gap-8">
                          <div className="items-center justify-start hidden p-3 rounded-full md:flex border-1 border-border">
                            <img
                              src={o.merchant_image}
                              alt={o.merchant_name}
                              className="w-20 h-20 rounded-full"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center gap-2">
                            <p> {o.merchant_name}</p>
                            {renderStars(o.merchant_rating)}

                            <div className="flex flex-row items-center justify-start w-full gap-1">
                              <PiMapPin size={20} />
                              <p>{o.merchant_address}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="flex items-center justify-start text-lg ">
                        <div className="flex flex-row items-center justify-start w-full gap-2 transition-all duration-300 hover:text-primary group">
                          <PiPhoneCall size={20} />
                          <Link
                            to={`tel:${o.merchant_phone}`}
                            title="اتصل بالتاجر"
                          >
                            <p className="text-sm">{o.merchant_phone}</p>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <hr className="text-black/10" />

                    <div className="flex flex-col items-center justify-between w-full gap-2 lg:flex-row">
                      {/* <div className="flex flex-row items-center justify-start w-full gap-2">
                        <IoCarSportOutline size={20} />
                        <p className="text-sm">
                          إجمالي القطع:
                          {o.total_items}
                        </p>
                      </div>
                      <div className="flex flex-row items-center justify-start w-full gap-2">
                        <IoCarSportOutline size={20} />
                        <p className="text-sm">
                          إجمالي السعر:
                          {o.total_price}
                        </p>
                      </div> */}
                      <div className="lg:w-[50%] w-full flex ">
                        <Accordion showDivider={false}>
                          <AccordionItem
                            classNames={{ base: "m-0!" }}
                            className="px-1 mb-4 rounded-lg md:w-full md:px-4 border-1 border-border"
                            title={
                              <div className="flex flex-col items-center justify-start w-full gap-2 text-sm md:flex-row">
                                <IoCarSportOutline size={20} />
                                <div className="flex items-center gap-2">
                                  <p>إجمالي القطع:</p>
                                  <p>{o.total_items}</p>
                                </div>
                                <p className="hidden md:flex">|</p>
                                <div className="flex items-center gap-2">
                                  <p>إجمالي السعر:</p>
                                  <p>{o.total_price} ريال</p>
                                </div>
                              </div>
                            }
                          >
                            <div className="flex flex-col gap-2 py-4">
                              {o.items.map((item) => (
                                <div className="flex items-center justify-between ">
                                  <div className="flex items-center gap-4">
                                    <p className="text-sm">{item.quantity}</p>
                                    <p className="text-sm font-medium">
                                      {item.name}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium">
                                      السعر:
                                    </p>
                                    <p className="text-sm">{item.price} ريال</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* التوصيل */}

                      <div className="flex items-center justify-center lg:w-max w-[100%] ">
                        <div className="justify-center p-2 overflow-scroll lg:overflow-hidden md:w-full lg:w-max w-max lg:flex lg:items-center lg:justify-between border-1 border-border rounded-xl">
                          <div className="flex items-center justify-between gap-4 text-sm w-max">
                            <div
                              className={`flex items-center gap-2 p-2  px-4 rounded-xl  text-border border-1 border-border ${o.delivery_method === "توصيل بواسطة التاجر" ? "bg-primary text-white border-primary" : ""}`}
                            >
                              <CiUser size={20} />
                              <p>توصيل بواسطة التاجر</p>
                            </div>
                            <div
                              className={`flex items-center gap-2 p-2 px-4 rounded-xl text-border border-1 border-border ${o.delivery_method === "توصيل بواسطة المنصة" ? "bg-primary text-white border-primary" : ""}`}
                            >
                              <CiShop size={20} />
                              <p>توصيل بواسطة المنصة</p>
                            </div>
                            <div
                              className={`flex items-center gap-2 p-2 px-4 w-max rounded-xl text-border border-1 border-border ${o.delivery_method === "الاستلام من المتجر" ? "bg-primary text-white border-primary shadow-lg" : ""}`}
                            >
                              <CiMapPin size={20} />
                              <p>الاستلام من المتجر</p>
                            </div>
                          </div>
                          {/* <CiUser size={20} />
                          ) : t.id === "onPlatform" ? (
                          <CiShop size={20} />
                          ) : t.id === "fromStore" ? (
                          <CiMapPin size={20} />
                          ) : (
                          <CiUser size={20} />) */}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-between lg:flex-row">
                      <div className="flex flex-col items-center w-full gap-2 p-2 px-4 font-light lg:flex-row border-1 border-border rounded-xl">
                        <CgNotes size={20} />
                        <p>ملاحظات: {o.notes}</p>
                      </div>
                    </div>

                    <div className="flex flex-row items-center justify-end gap-2 lg:flex-row">
                      <Button className="text-white transition duration-700 ease-in-out transform border shadow-md cursor-pointer font-xl rounded-xl focus:outline-none whitespace-nowrap bg-primary border-border hover:bg-transparent hover:text-primary hover:border-primary">
                        قبول العرض - <p>{o.total_price} ريال</p>
                      </Button>
                      <Button
                        title="محادثة التاجر"
                        isIconOnly
                        startContent={<CiChat1 size={20} />}
                        className="transition duration-700 ease-in-out transform bg-transparent border shadow-md cursor-pointer text-primary font-xl rounded-xl focus:outline-none whitespace-nowrap border-primary hover:bg-primary hover:text-white"
                        onPress={() => navigate(`/vendors/${o.id}/chat`)}
                      ></Button>
                      <Button
                        title="حذف عرض السعر"
                        isIconOnly
                        startContent={<CiTrash size={24} />}
                        className="text-red-500 transition duration-700 ease-in-out transform bg-transparent border border-red-500 shadow-md cursor-pointer font-xl rounded-xl focus:outline-none whitespace-nowrap hover:bg-red-500 hover:text-white"
                        onPress={() => handleRemoveQuote(o.offer_id)}
                      ></Button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* active Tab : bestPrice */}

          {activeTab === "bestPrice" && (
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-1">
              {priceOffers
                .sort((a, b) => a.total_price - b.total_price)
                .map((o) => (
                  <div
                    key={o.id}
                    className="flex flex-col h-full gap-4 p-2 md:p-8 border-1 border-border rounded-2xl "
                  >
                    <div className="flex flex-col items-start justify-between gap-2 md:items-end md:flex-row">
                      <Link to={`/vendors/${o.id}`}>
                        <div className="flex justify-start gap-8">
                          <div className="items-center justify-start hidden p-3 rounded-full md:flex border-1 border-border">
                            <img
                              src={o.merchant_image}
                              alt={o.merchant_name}
                              className="w-20 h-20 rounded-full"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center gap-2">
                            <p> {o.merchant_name}</p>
                            {renderStars(o.merchant_rating)}

                            <div className="flex flex-row items-center justify-start w-full gap-1">
                              <PiMapPin size={20} />
                              <p>{o.merchant_address}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="flex items-center justify-start text-lg ">
                        <div className="flex flex-row items-center justify-start w-full gap-2 transition-all duration-300 hover:text-primary group">
                          <PiPhoneCall size={20} />
                          <Link
                            to={`tel:${o.merchant_phone}`}
                            title="اتصل بالتاجر"
                          >
                            <p className="text-sm">{o.merchant_phone}</p>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <hr className="text-black/10" />

                    <div className="flex flex-col items-center justify-between w-full gap-2 lg:flex-row">
                      {/* <div className="flex flex-row items-center justify-start w-full gap-2">
                        <IoCarSportOutline size={20} />
                        <p className="text-sm">
                          إجمالي القطع:
                          {o.total_items}
                        </p>
                      </div>
                      <div className="flex flex-row items-center justify-start w-full gap-2">
                        <IoCarSportOutline size={20} />
                        <p className="text-sm">
                          إجمالي السعر:
                          {o.total_price}
                        </p>
                      </div> */}
                      <div className="lg:w-[50%] w-full flex ">
                        <Accordion showDivider={false}>
                          <AccordionItem
                            classNames={{ base: "m-0!" }}
                            className="px-1 mb-4 rounded-lg md:w-full md:px-4 border-1 border-border"
                            title={
                              <div className="flex flex-col items-center justify-start w-full gap-2 text-sm md:flex-row">
                                <IoCarSportOutline size={20} />
                                <div className="flex items-center gap-2">
                                  <p>إجمالي القطع:</p>
                                  <p>{o.total_items}</p>
                                </div>
                                <p className="hidden md:flex">|</p>
                                <div className="flex items-center gap-2">
                                  <p>إجمالي السعر:</p>
                                  <p>{o.total_price} ريال</p>
                                </div>
                              </div>
                            }
                          >
                            <div className="flex flex-col gap-2 py-4">
                              {o.items.map((item) => (
                                <div className="flex items-center justify-between ">
                                  <div className="flex items-center gap-4">
                                    <p className="text-sm">{item.quantity}</p>
                                    <p className="text-sm font-medium">
                                      {item.name}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium">
                                      السعر:
                                    </p>
                                    <p className="text-sm">{item.price} ريال</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* التوصيل */}

                      <div className="flex items-center justify-center lg:w-max w-[100%] ">
                        <div className="justify-center p-2 overflow-scroll lg:overflow-hidden md:w-full lg:w-max w-max lg:flex lg:items-center lg:justify-between border-1 border-border rounded-xl">
                          <div className="flex items-center justify-between gap-4 text-sm w-max">
                            <div
                              className={`flex items-center gap-2 p-2  px-4 rounded-xl  text-border border-1 border-border ${o.delivery_method === "توصيل بواسطة التاجر" ? "bg-primary text-white border-primary" : ""}`}
                            >
                              <CiUser size={20} />
                              <p>توصيل بواسطة التاجر</p>
                            </div>
                            <div
                              className={`flex items-center gap-2 p-2 px-4 rounded-xl text-border border-1 border-border ${o.delivery_method === "توصيل بواسطة المنصة" ? "bg-primary text-white border-primary" : ""}`}
                            >
                              <CiShop size={20} />
                              <p>توصيل بواسطة المنصة</p>
                            </div>
                            <div
                              className={`flex items-center gap-2 p-2 px-4 w-max rounded-xl text-border border-1 border-border ${o.delivery_method === "الاستلام من المتجر" ? "bg-primary text-white border-primary shadow-lg" : ""}`}
                            >
                              <CiMapPin size={20} />
                              <p>الاستلام من المتجر</p>
                            </div>
                          </div>
                          {/* <CiUser size={20} />
                          ) : t.id === "onPlatform" ? (
                          <CiShop size={20} />
                          ) : t.id === "fromStore" ? (
                          <CiMapPin size={20} />
                          ) : (
                          <CiUser size={20} />) */}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-between lg:flex-row">
                      <div className="flex flex-col items-center w-full gap-2 p-2 px-4 font-light lg:flex-row border-1 border-border rounded-xl">
                        <CgNotes size={20} />
                        <p>ملاحظات: {o.notes}</p>
                      </div>
                    </div>

                    <div className="flex flex-row items-center justify-end gap-2 lg:flex-row">
                      <Button className="text-white transition duration-700 ease-in-out transform border shadow-md cursor-pointer font-xl rounded-xl focus:outline-none whitespace-nowrap bg-primary border-border hover:bg-transparent hover:text-primary hover:border-primary">
                        قبول العرض - <p>{o.total_price} ريال</p>
                      </Button>
                      <Button
                        title="محادثة التاجر"
                        isIconOnly
                        startContent={<CiChat1 size={20} />}
                        className="transition duration-700 ease-in-out transform bg-transparent border shadow-md cursor-pointer text-primary font-xl rounded-xl focus:outline-none whitespace-nowrap border-primary hover:bg-primary hover:text-white"
                        onPress={() => navigate(`/vendors/${o.id}/chat`)}
                      ></Button>
                      <Button
                        title="حذف عرض السعر"
                        isIconOnly
                        startContent={<CiTrash size={24} />}
                        className="text-red-500 transition duration-700 ease-in-out transform bg-transparent border border-red-500 shadow-md cursor-pointer font-xl rounded-xl focus:outline-none whitespace-nowrap hover:bg-red-500 hover:text-white"
                        onPress={() => handleRemoveQuote(o.offer_id)}
                      ></Button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* active Tab : closest */}

          {activeTab === "closest" && (
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-1">
              {priceOffers
                .sort((a, b) => b.distance_km - a.distance_km)
                .map((o) => (
                  <div
                    key={o.id}
                    className="flex flex-col h-full gap-4 p-2 md:p-8 border-1 border-border rounded-2xl "
                  >
                    <div className="flex flex-col items-start justify-between gap-2 md:items-end md:flex-row">
                      <Link to={`/vendors/${o.id}`}>
                        <div className="flex justify-start gap-8">
                          <div className="items-center justify-start hidden p-3 rounded-full md:flex border-1 border-border">
                            <img
                              src={o.merchant_image}
                              alt={o.merchant_name}
                              className="w-20 h-20 rounded-full"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center gap-2">
                            <p> {o.merchant_name}</p>
                            {renderStars(o.merchant_rating)}

                            <div className="flex flex-row items-center justify-start w-full gap-1">
                              <PiMapPin size={20} />
                              <p>{o.merchant_address}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="flex items-center justify-start text-lg ">
                        <div className="flex flex-row items-center justify-start w-full gap-2 transition-all duration-300 hover:text-primary group">
                          <PiPhoneCall size={20} />
                          <Link
                            to={`tel:${o.merchant_phone}`}
                            title="اتصل بالتاجر"
                          >
                            <p className="text-sm">{o.merchant_phone}</p>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <hr className="text-black/10" />

                    <div className="flex flex-col items-center justify-between w-full gap-2 lg:flex-row">
                      {/* <div className="flex flex-row items-center justify-start w-full gap-2">
                        <IoCarSportOutline size={20} />
                        <p className="text-sm">
                          إجمالي القطع:
                          {o.total_items}
                        </p>
                      </div>
                      <div className="flex flex-row items-center justify-start w-full gap-2">
                        <IoCarSportOutline size={20} />
                        <p className="text-sm">
                          إجمالي السعر:
                          {o.total_price}
                        </p>
                      </div> */}
                      <div className="lg:w-[50%] w-full flex ">
                        <Accordion showDivider={false}>
                          <AccordionItem
                            classNames={{ base: "m-0!" }}
                            className="px-1 mb-4 rounded-lg md:w-full md:px-4 border-1 border-border"
                            title={
                              <div className="flex flex-col items-center justify-start w-full gap-2 text-sm md:flex-row">
                                <IoCarSportOutline size={20} />
                                <div className="flex items-center gap-2">
                                  <p>إجمالي القطع:</p>
                                  <p>{o.total_items}</p>
                                </div>
                                <p className="hidden md:flex">|</p>
                                <div className="flex items-center gap-2">
                                  <p>إجمالي السعر:</p>
                                  <p>{o.total_price} ريال</p>
                                </div>
                              </div>
                            }
                          >
                            <div className="flex flex-col gap-2 py-4">
                              {o.items.map((item) => (
                                <div className="flex items-center justify-between ">
                                  <div className="flex items-center gap-4">
                                    <p className="text-sm">{item.quantity}</p>
                                    <p className="text-sm font-medium">
                                      {item.name}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium">
                                      السعر:
                                    </p>
                                    <p className="text-sm">{item.price} ريال</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* التوصيل */}

                      <div className="flex items-center justify-center lg:w-max w-[100%] ">
                        <div className="justify-center p-2 overflow-scroll lg:overflow-hidden md:w-full lg:w-max w-max lg:flex lg:items-center lg:justify-between border-1 border-border rounded-xl">
                          <div className="flex items-center justify-between gap-4 text-sm w-max">
                            <div
                              className={`flex items-center gap-2 p-2  px-4 rounded-xl  text-border border-1 border-border ${o.delivery_method === "توصيل بواسطة التاجر" ? "bg-primary text-white border-primary" : ""}`}
                            >
                              <CiUser size={20} />
                              <p>توصيل بواسطة التاجر</p>
                            </div>
                            <div
                              className={`flex items-center gap-2 p-2 px-4 rounded-xl text-border border-1 border-border ${o.delivery_method === "توصيل بواسطة المنصة" ? "bg-primary text-white border-primary" : ""}`}
                            >
                              <CiShop size={20} />
                              <p>توصيل بواسطة المنصة</p>
                            </div>
                            <div
                              className={`flex items-center gap-2 p-2 px-4 w-max rounded-xl text-border border-1 border-border ${o.delivery_method === "الاستلام من المتجر" ? "bg-primary text-white border-primary shadow-lg" : ""}`}
                            >
                              <CiMapPin size={20} />
                              <p>الاستلام من المتجر</p>
                            </div>
                          </div>
                          {/* <CiUser size={20} />
                          ) : t.id === "onPlatform" ? (
                          <CiShop size={20} />
                          ) : t.id === "fromStore" ? (
                          <CiMapPin size={20} />
                          ) : (
                          <CiUser size={20} />) */}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-between lg:flex-row">
                      <div className="flex flex-col items-center w-full gap-2 p-2 px-4 font-light lg:flex-row border-1 border-border rounded-xl">
                        <CgNotes size={20} />
                        <p>ملاحظات: {o.notes}</p>
                      </div>
                    </div>

                    <div className="flex flex-row items-center justify-end gap-2 lg:flex-row">
                      <Button className="text-white transition duration-700 ease-in-out transform border shadow-md cursor-pointer font-xl rounded-xl focus:outline-none whitespace-nowrap bg-primary border-border hover:bg-transparent hover:text-primary hover:border-primary">
                        قبول العرض - <p>{o.total_price} ريال</p>
                      </Button>
                      <Button
                        title="محادثة التاجر"
                        isIconOnly
                        startContent={<CiChat1 size={20} />}
                        className="transition duration-700 ease-in-out transform bg-transparent border shadow-md cursor-pointer text-primary font-xl rounded-xl focus:outline-none whitespace-nowrap border-primary hover:bg-primary hover:text-white"
                        onPress={() => navigate(`/vendors/${o.id}/chat`)}
                      ></Button>
                      <Button
                        title="حذف عرض السعر"
                        isIconOnly
                        startContent={<CiTrash size={24} />}
                        className="text-red-500 transition duration-700 ease-in-out transform bg-transparent border border-red-500 shadow-md cursor-pointer font-xl rounded-xl focus:outline-none whitespace-nowrap hover:bg-red-500 hover:text-white"
                        onPress={() => handleRemoveQuote(o.offer_id)}
                      ></Button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
