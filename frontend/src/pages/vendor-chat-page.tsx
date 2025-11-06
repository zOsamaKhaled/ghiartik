import React from "react";
import DefaultLayout from "@/layouts/default";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToast, Button, Image } from "@heroui/react";
import { FaInstagram } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import { IoDocumentTextOutline } from "react-icons/io5";
import { HeartPlus, PhoneIcon } from "lucide-react";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { RiShoppingCartLine } from "react-icons/ri";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { RiAttachmentLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";

import { RiArrowGoBackFill } from "react-icons/ri";

import { parts_data } from "@/config/parts_data";
import { chat_data } from "@/config/chat_data";
import { useState, useRef, useEffect, useLayoutEffect } from "react";

//

export default function VendorChatPage() {
  const { vendorId } = useParams();
  const { allVendors } = useSelector((state: any) => state.vendors);

  const vendor = allVendors.find((v: any) => v.id === vendorId);

  const navigate = useNavigate();

  function getRandomItem(array: any) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  //   const part1 = getRandomItem(parts_data);
  //   const part2 = getRandomItem(parts_data);

  const today = new Date();

  // نحول التاريخ من JSON لصيغة YYYY-MM-DD
  const chatDay = new Date(chat_data.chatDate);
  const isToday =
    chatDay.getFullYear() === today.getFullYear() &&
    chatDay.getMonth() === today.getMonth() &&
    chatDay.getDate() === today.getDate();

  const displayDate = isToday ? "اليوم" : chat_data.chatDate;

  const [message, setMessage] = useState(chat_data.messages);
  const [messageInput, setMessageInput] = useState("");
  const [file, setFile] = useState<File[]>([]); // تخزين الملف
  const [preview, setPreview] = useState<string[]>([]); // تخزين URL للـ preview
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [part1, setPart1] = useState<any>(null);
  const [part2, setPart2] = useState<any>(null);
  const [fav, setFav] = useState(false);
  useEffect(() => {
    const random1 = getRandomItem(parts_data);
    let random2 = getRandomItem(parts_data);
    // علشان ميكونوش نفس الحاجة
    while (random2.id === random1.id) {
      random2 = getRandomItem(parts_data);
    }
    setPart1(random1);
    setPart2(random2);
  }, [vendorId]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);

    setFile((prev) => [...prev, ...newFiles]);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreview((prev) => [...prev, ...newPreviews]);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() && file.length === 0) return;

    const newMessage: any = {
      sender: "user",
      text: messageInput,
      image: preview,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessage((prev) => [...prev, newMessage]);
    setMessageInput("");
    setFile([]);
    setPreview([]);
  };

  //   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (e.key === "Enter") {
  //       handleSendMessage();
  //     }
  //   };

  const handleDeleteFile = (i: number) => {
    setFile((prev) => prev.filter((_, index) => index !== i));
    setPreview((prev) => prev.filter((_, index) => index !== i));
  };
  useLayoutEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);

  //   TODO : fix this => When reload chat needed to scroll to bottom
  if (!vendor) {
    return (
      <DefaultLayout>
        <p className="p-4 text-center">
          جارٍ تحميل بيانات التاجر أو التاجر غير موجود.
        </p>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      {/* Vendor */}
      <section className="flex flex-col items-center justify-center w-full ">
        <div className="w-full p-4 md:p-4 md:pb-2 border-1 border-border rounded-3xl vendor_card">
          <div className="flex flex-col items-center gap-2 pb-4 md:flex-row md:items-center md:justify-start">
            <div className="w-30 vendor_img">
              <Image
                alt={vendor.name_ar}
                className={`object-contain p-4 transition-all duration-300 rounded-full w-30 border-1 border-border ${vendor.isOnline ? "border-primary" : "border-red-500"}`}
                radius="lg"
                src={vendor.image_url}
              />
            </div>
            <div className="flex flex-col items-center justify-between w-full gap-4 pr-0 md:pr-8 items-between vendor_inset-ring-primary-foreground">
              <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row vendor_info_top ">
                <div className="flex flex-col items-center justify-center gap-4 info_right md:items-start md:justify-start">
                  <h2 className="font-bold">{vendor.name_ar}</h2>
                  <div className="flex items-center justify-center ">
                    <GoDotFill
                      className={`${vendor.isOnline ? "text-primary animate-pulse" : "text-red-500"} text-xl  animation`}
                    />
                    {vendor.isOnline ? "متصل" : "غير متصل"}
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
                  <div className="flex gap-2">
                    <Button
                      isIconOnly
                      title="أضف إلى المفضلة"
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
                    <Button
                      isIconOnly
                      title="مكالمة هاتفية"
                      onPress={() => {
                        window.location.href = `tel:+966000000000`;
                      }}
                      aria-label="Call"
                      className="transition duration-500 ease-in-out bg-white border-2 border-primary text-primary active:text-white hover:text-white hover:bg-primary active:bg-primary"
                    >
                      <PhoneIcon />
                    </Button>
                    <Button
                      isIconOnly
                      title="الرجوع للصفحة السابقة"
                      onPress={() => {
                        navigate(-1);
                      }}
                      aria-label="Back"
                      className="text-[20px] transition duration-500 ease-in-out bg-white border-2 border-primary text-primary active:text-white hover:text-white hover:bg-primary active:bg-primary"
                    >
                      <RiArrowGoBackFill />
                    </Button>
                  </div>
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
        </div>
      </section>

      {/* Order */}
      <section className="flex flex-col items-center justify-center w-full mt-4 ">
        <div className="flex items-center justify-center w-full gap-8 p-4 md:p-6 border-1 border-border rounded-3xl bg-default-100 order_details_card">
          <div>
            <RiShoppingCartLine className="p-2 text-5xl rounded-xl text-primary border-1 border-primary" />
          </div>
          <div
            dir="rtl"
            className="flex flex-col justify-center w-full gap-1 order_details_content"
          >
            <h4>
              <b>رقم الطلب: {part1?.id}</b>
            </h4>
            <p>
              {part1?.name} + {part2?.name}
            </p>
          </div>
        </div>
      </section>

      {/* Chat */}
      <section className="flex flex-col items-center justify-center w-full mt-4 mb-12 ">
        <div className="flex flex-col items-center justify-center w-full pt-4 md:p-0 md:pt-2 border-1 border-border rounded-3xl order_details_card">
          {/* Chat */}
          <div className="flex flex-col w-full mt-4 chat ">
            <div
              className="flex flex-col w-full overflow-auto  h-[300px] custom-scrollbar px-4"
              id="chat_box"
              ref={chatContainerRef}
            >
              <div className="flex p-1 px-3 mx-auto mb-4 text-xs date bg-default-50 border-1 border-border rounded-xl w-max text-light-black">
                {displayDate}
              </div>
              {message.map((msg: any, index) => (
                <div key={index}>
                  {/* رسالة من المستخدم */}
                  {msg.sender === "user" ? (
                    <div key={index} className="flex flex-col items-start mb-4">
                      <div className="flex flex-col max-w-xs gap-2 px-4 py-4 text-sm text-white break-words bg-primary rounded-xl">
                        {msg.text}
                        {Array.isArray(msg.image) &&
                          msg.image.map((imgSrc: string, i: number) => (
                            <img
                              key={i}
                              src={imgSrc}
                              alt={`sent-${i}`}
                              className="max-h-20 rounded-xl"
                            />
                          ))}
                      </div>

                      <span className="mt-1 text-xs text-gray-400">
                        {msg.time}
                      </span>
                    </div>
                  ) : (
                    <div key={index} className="flex flex-col items-end mb-4">
                      <div className="flex flex-col max-w-xs gap-2 px-4 py-4 text-sm text-gray-800 break-words bg-gray-200 rounded-xl">
                        {msg.text}
                        {msg.image ? (
                          <div>
                            <img
                              src={msg.image}
                              alt="image"
                              className="md:w-max md:h-max rounded-xl w-max h-[200px]"
                            />
                          </div>
                        ) : null}
                      </div>
                      <span className="mt-1 text-xs text-gray-400">
                        {msg.time}
                      </span>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat Footer */}
          <hr className="w-full h-1 text-border" />

          <div className="flex items-center justify-between w-full gap-4 px-4 my-4 chat-footer border-border">
            <Button
              className="h-[42px] w-[42px] rounded-2xl transition duration-300 bg-transparent border-1 border-border hover:bg-primary group"
              isIconOnly
              onPress={handleUploadClick}
              startContent={
                <RiAttachmentLine className="group-hover:text-white" />
              }
            ></Button>
            {/* Hidden Input */}
            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            {/* Hidden Input */}
            {/* Hidden Preview */}

            {/* Hidden Preview */}
            <input
              type="text"
              className="w-full p-2 rounded-2xl border-1 border-border"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <Button
              isIconOnly
              onPress={handleSendMessage}
              className="h-[42px] w-[42px] rounded-2xl transition duration-300 bg-transparent border-1 border-border hover:bg-primary group"
              startContent={
                <HiOutlinePaperAirplane className="rotate-180 group-hover:text-white" />
              }
            ></Button>
          </div>
          {preview ? (
            <div className="relative flex items-start justify-start w-full p-4">
              <div className="flex gap-2 mt-2">
                {preview.map((src, index) => (
                  <div key={index} className="relative">
                    <img
                      src={src}
                      alt={`preview-${index}`}
                      className="max-h-20 rounded-xl"
                    />
                    <RxCross1
                      className="absolute top-[-10px] right-[-10px] p-1 text-xl text-white rounded-full cursor-pointer border-1 bg-danger border-danger hover:bg-white hover:text-danger"
                      onClick={() => handleDeleteFile(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </DefaultLayout>
  );
}
