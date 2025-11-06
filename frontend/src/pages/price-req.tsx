import DefaultLayout from "@/layouts/default";
import MainSlider from "@/components/slider";
import { FiMapPin } from "react-icons/fi";

import { IoCarSportOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { HiOutlineMinus } from "react-icons/hi";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { addToast, Select, SelectItem } from "@heroui/react";
import { car_data } from "@/config/car_data";
import { parts_data } from "@/config/parts_data";
import { useDispatch } from "react-redux";
import { openModal } from "@/features/mainModal/mainModalSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PriceReq() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addCar, setAddCar] = useState({
    address: "",
    car: "",
    part: "",
    numberOfParts: 0,
  });

  return (
    <DefaultLayout>
      <MainSlider />
      <section className="flex flex-col w-full py-10">
        <h3 className="text-xl font-medium text-right">تسعير قطع غيار</h3>
        <div className="flex flex-col w-full gap-10 p-4 my-8 md:p-12 md:px-34 border-y-1 border-border rounded-3xl about_us">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <FiMapPin />
              <p>العنوان</p>
            </div>
            <div className="flex flex-col items-start justify-between gap-4 md:items-center md:flex-row">
              <Input
                placeholder="الرياض  - شارع الملك عبد الله - حي الزهور"
                type="text"
                value={addCar.address}
                onChange={(e) =>
                  setAddCar((prev) => ({ ...prev, address: e.target.value }))
                }
                classNames={{
                  inputWrapper:
                    "  bg-transparent shadow-none border-1 border-border p-8 pl-2",
                }}
                className="lg:w-[80%] w-full"
              />
              <Button
                size="md"
                className="lg:w-[20%] w-max px-8 bg-default-200 hover:text-white hover:bg-primary"
                onPress={() => dispatch(openModal("addAddressModal"))}
              >
                أضف عنوان جديد
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <IoCarSportOutline />
              <p>بيانات السيارة</p>
            </div>
            <div className="flex flex-col items-start justify-between gap-4 md:items-center md:flex-row">
              <Select
                placeholder="ياريس  2020"
                items={car_data}
                aria-label="بيانات السيارة"
                selectedKeys={addCar.car}
                onSelectionChange={(value: any) =>
                  setAddCar((prev) => ({ ...prev, car: value }))
                }
                classNames={{
                  trigger: "py-8 px-5 text-lg", // بادينج أكبر + تكبير النص
                  value: "flex items-center gap-3",
                }}
                className="lg:w-[80%] w-full"
                renderValue={(items) => {
                  return items.map((item) => (
                    <div key={item.key} className="flex items-center gap-2">
                      <img
                        alt={item.data?.brand}
                        className="w-12 h-12 rounded-md"
                        src={item.data?.logo}
                      />
                      <div className="flex flex-col">
                        <span className="text-lg">{item.data?.brand}</span>
                        <span className="text-sm text-default-500">
                          الموديلات: ({item.data?.models.join(" - ")})
                        </span>
                      </div>
                    </div>
                  ));
                }}
              >
                {(item) => (
                  <SelectItem
                    dir="rtl"
                    key={item.brand}
                    startContent={<img className="w-6 h-6" src={item.logo} />}
                  >
                    {item.brand}
                  </SelectItem>
                )}
              </Select>
              <Button
                size="md"
                className="lg:w-[20%] w-max px-8 bg-default-200 hover:text-white hover:bg-primary"
                onPress={() => dispatch(openModal("addCarModal"))}
              >
                إضافة سيارة جديدة
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4">
            <div className="flex items-center gap-2">
              <IoCarSportOutline />
              <p>بيانات قطع الغيار</p>
            </div>
            <div className="flex flex-col items-start gap-4 md:items-center md:flex-row ">
              <Select
                placeholder="راديتور"
                aria-label="بيانات قطع الغيار"
                items={parts_data}
                selectedKeys={addCar.part}
                onSelectionChange={(value: any) => {
                  setAddCar((prev) => ({ ...prev, part: value }));
                }}
                classNames={{
                  trigger: "py-8 px-5 text-lg", // بادينج أكبر + تكبير النص
                  value: "flex items-center gap-3",
                }}
                className="lg:w-[80%] w-full"
                endContent={
                  <div className="flex items-center gap-2 ">
                    <Button
                      size="sm"
                      isIconOnly
                      startContent={<IoAdd size={20} />}
                      onPress={() =>
                        setAddCar({
                          ...addCar,
                          numberOfParts: addCar.numberOfParts + 1,
                        })
                      }
                    ></Button>
                    <p>{addCar.numberOfParts}</p>
                    <Button
                      size="sm"
                      className="w-max"
                      isIconOnly
                      startContent={<HiOutlineMinus size={20} />}
                      onPress={() =>
                        setAddCar({
                          ...addCar,
                          numberOfParts:
                            addCar.numberOfParts > 0
                              ? addCar.numberOfParts - 1
                              : 0,
                        })
                      }
                    ></Button>
                  </div>
                }
                renderValue={(items) => {
                  return items.map((item) => (
                    <div key={item.key} className="flex items-center gap-2">
                      <img
                        alt={item.data?.name}
                        className="w-12 h-12 rounded-md"
                        src={item.data?.image}
                      />
                      <div className="flex flex-col">
                        <span className="text-lg">{item.data?.name}</span>
                        <span className="text-sm text-default-500">
                          عدد القطع المتاح: ({item.data?.stock} قطع)
                        </span>
                      </div>
                    </div>
                  ));
                }}
              >
                {(item) => (
                  <SelectItem
                    key={item.name}
                    textValue={item.name}
                    startContent={
                      <img
                        src={item.image}
                        className="w-6 h-6"
                        alt={item.name}
                      />
                    }
                  >
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      <span className="text-default-500 text-tiny">
                        ({item.stock} قطع)
                      </span>
                    </div>
                  </SelectItem>
                )}
              </Select>

              <Button
                size="md"
                className="px-8 bg-default-200 hover:text-white hover:bg-primary lg:w-[20%] w-max"
                onPress={() => dispatch(openModal("addCarModal"))}
              >
                اضف قطعة غيار جديدة
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center w-full mt-8">
            <Button
              isDisabled={!addCar.car || !addCar.part || !addCar.address}
              size="lg"
              onPress={() => {
                dispatch(openModal("priceReqModal"));
                addToast({
                  title: "تم تسجيل طلب التسعير بنجاح",
                  color: "success",
                  timeout: 3000,
                  shouldShowTimeoutProgress: true,
                  icon: "success",
                });
                navigate("/myOrders");
              }}
            >
              إرسال الطلب
            </Button>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
