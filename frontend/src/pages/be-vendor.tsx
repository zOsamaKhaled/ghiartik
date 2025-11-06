import DefaultLayout from "@/layouts/default";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { schema } from "../schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useMemo } from "react";
import { FormProvider } from "react-hook-form";

import { MdOutlineManageAccounts } from "react-icons/md";

import { Progress } from "@heroui/progress";
import {
  CiBank,
  CiFileOn,
  CiFilter,
  CiGlobe,
  CiImageOn,
  CiLock,
  CiMail,
  CiPhone,
  CiShop,
  CiUser,
  CiViewList,
} from "react-icons/ci";
import { Input, Textarea } from "@heroui/input";
import { PiCityLight, PiEyeClosedLight, PiEyeLight } from "react-icons/pi";
import { Button } from "@heroui/button";
import { Link } from "react-router-dom";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { Avatar, Chip, Select, SelectItem } from "@heroui/react";
import { car_data } from "@/config/car_data";

// TYPE

type FormData = z.infer<typeof schema>;
export default function BeVendor() {
  const [step, setStep] = useState(1);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      brands: [],
      models: [],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  // Models options depend on selected brands
  const selectedBrandIds = methods.watch("brands") || [];
  const modelItems: {
    id: string;
    value: string;
    brandId: string;
    brand: string;
  }[] = useMemo(() => {
    const ids = new Set<string>(selectedBrandIds as string[]);
    const items: {
      id: string;
      value: string;
      brandId: string;
      brand: string;
    }[] = [];
    for (const b of car_data) {
      if (ids.has(b.id)) {
        for (const m of b.models) {
          items.push({
            id: `${b.id}-${m}`,
            value: m,
            brandId: b.id,
            brand: b.brand,
          });
        }
      }
    }
    return items;
  }, [selectedBrandIds]);

  // Remove selected models that no longer belong to selected brands
  useEffect(() => {
    const currentModels = (methods.getValues("models") || []) as string[];
    const allowed = new Set(modelItems.map((i) => i.value));
    const filtered = currentModels.filter((m) => allowed.has(m));
    if (filtered.length !== currentModels.length) {
      methods.setValue("models", filtered, { shouldValidate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelItems]);

  const onSubmit = (data: FormData) => {
    console.log("✅ البيانات المرسلة:", data);
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center w-full py-10">
        <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row">
          <h1 className="text-2xl font-medium w-max">تسجيل متجر جديد</h1>
          {/*  Progress Bar */}

          <div className="flex-col items-center justify-center md:w-[60%] w-full gap-6 p-2 pt-8 pb-4 md:p-8 md:flex border-1 border-border rounded-2xl">
            <div className="relative w-full h-6">
              <Progress
                color="primary"
                size="sm"
                aria-label="مراحل التسجيل"
                value={step === 1 ? 33 : step === 2 ? 66 : step === 3 ? 100 : 0}
              />
              {/* المراحل */}
              <div className="absolute md:top-[0px] top-[-10px] left-0 flex items-center justify-between w-full h-full pointer-events-none">
                <div>
                  <div
                    className={`w-7 flex items-center justify-center h-7 rounded-full ${
                      [1, 2, 3].includes(step ?? "")
                        ? "bg-primary"
                        : "bg-gray-400"
                    }`}
                  >
                    <MdOutlineManageAccounts size={20} className="text-white" />
                  </div>
                  <p className="hidden md:flex">بيانات الحساب</p>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 flex items-center justify-center h-7 rounded-full ${
                      [2, 3].includes(step ?? "") ? "bg-primary" : "bg-gray-400"
                    }`}
                  >
                    <CiShop size={20} className="text-white" />
                  </div>
                  <p className="hidden md:flex">بيانات المتجر</p>
                </div>

                <div className="flex flex-col items-end">
                  <div
                    className={`w-7 flex items-center justify-center h-7 rounded-full ${
                      [3].includes(step ?? "") ? "bg-primary" : "bg-gray-400"
                    }`}
                  >
                    <CiFilter size={20} className="text-white" />
                  </div>
                  <p className="hidden md:flex">نشاط المتجر</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
        </div>
        {/* About Us */}
        <div className="flex flex-col w-full gap-6 p-4 my-8 md:p-12 border-y-1 border-border rounded-3xl ">
          <FormProvider {...methods}>
            <div className="w-full p-2 mx-auto mt-10 md:p-6 md:max-w-4xl rounded-2xl">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full space-y-5 transition-all"
              >
                {/* 🧭 STEP 1 */}
                {step === 1 && (
                  <>
                    {/*  NAME */}
                    <div>
                      <Input
                        {...register("name")}
                        className="w-full rounded-lg"
                        placeholder="الاسم"
                        labelPlacement="outside"
                        startContent={
                          <CiUser size={23} className="text-border" />
                        }
                        classNames={{
                          inputWrapper:
                            "bg-transparent shadow-none p-6 border-1 border-border text-4xl ",
                          input: "text-sm placeholder:text-default-400",
                        }}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500 mr-7">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    {/*  EMAIL */}
                    <div>
                      <Input
                        {...register("email")}
                        className="w-full rounded-lg"
                        placeholder="البريد الإلكتروني"
                        labelPlacement="outside"
                        startContent={
                          <CiMail size={23} className="text-border" />
                        }
                        classNames={{
                          inputWrapper:
                            "bg-transparent shadow-none p-6 border-1 border-border text-4xl ",
                          input: "text-sm placeholder:text-default-400",
                        }}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500 mr-7">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/*  PHONE */}
                    <div>
                      <Input
                        {...register("phone")}
                        className="relative w-full rounded-lg z-2"
                        placeholder="رقم الجوال: 512345678"
                        labelPlacement="outside"
                        startContent={
                          <CiPhone size={23} className="text-border" />
                        }
                        endContent={
                          <div className="absolute left-0 flex items-center h-full gap-2 px-2 rounded-l-lg md:px-4 bg-default-200 z-1">
                            <p className="text-sm">+966</p>
                            <img src="sa-flag.svg" className="w-5 h-5" />
                          </div>
                        }
                        classNames={{
                          inputWrapper:
                            "bg-transparent shadow-none p-6 border-1 border-border  ",
                          input: "text-sm placeholder:text-default-400",
                        }}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500 mr-7">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/*  Password */}
                    <div>
                      <Input
                        type={isVisible ? "text" : "password"}
                        {...register("password")}
                        className="relative w-full rounded-lg z-2"
                        placeholder="كلمة المرور"
                        labelPlacement="outside"
                        startContent={
                          <CiLock size={23} className="text-border" />
                        }
                        endContent={
                          <button
                            aria-label="toggle password visibility"
                            className="cursor-pointer focus:outline-solid outline-transparent"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
                              <PiEyeClosedLight className="text-2xl pointer-events-none text-default-400" />
                            ) : (
                              <PiEyeLight className="text-2xl pointer-events-none text-default-400" />
                            )}
                          </button>
                        }
                        classNames={{
                          inputWrapper:
                            "bg-transparent shadow-none p-6 border-1 border-border  ",
                          input: "text-sm placeholder:text-default-400",
                        }}
                      />
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-500 mr-7">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    {/*  RePassword */}
                    <div>
                      <Input
                        type={isVisible ? "text" : "password"}
                        {...register("repassword")}
                        className="relative w-full rounded-lg z-2"
                        placeholder="تأكيد كلمة المرور"
                        labelPlacement="outside"
                        startContent={
                          <CiLock size={23} className="text-border" />
                        }
                        endContent={
                          <button
                            aria-label="toggle password visibility"
                            className="cursor-pointer focus:outline-solid outline-transparent"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
                              <PiEyeClosedLight className="text-2xl pointer-events-none text-default-400" />
                            ) : (
                              <PiEyeLight className="text-2xl pointer-events-none text-default-400" />
                            )}
                          </button>
                        }
                        classNames={{
                          inputWrapper:
                            "bg-transparent shadow-none p-6 border-1 border-border  ",
                          input: "text-sm placeholder:text-default-400",
                        }}
                      />
                      {errors.repassword && (
                        <p className="mt-1 text-sm text-red-500 mr-7">
                          {errors.repassword.message}
                        </p>
                      )}
                    </div>

                    {/* Accept Terms */}
                    <div className="flex items-center gap-2">
                      <Checkbox {...register("acceptTerms")} />
                      <label className="text-sm">
                        انا اوافق على{" "}
                        <Link
                          to="/terms"
                          target="_blank"
                          className="text-blue-500 hover:underline"
                        >
                          الشروط والاحكام
                        </Link>
                      </label>
                      {errors.acceptTerms && (
                        <p className="mt-1 text-sm text-red-500 mr-7">
                          {errors.acceptTerms.message}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* 🧭 STEP 2 */}
                {step === 2 && (
                  <>
                    {/*  SHOP NAME */}
                    <div>
                      <Input
                        {...register("shopName")}
                        className="w-full rounded-lg"
                        placeholder="اسم المتجر"
                        labelPlacement="outside"
                        startContent={
                          <CiShop size={23} className="text-border" />
                        }
                        classNames={{
                          inputWrapper:
                            "bg-transparent shadow-none p-6 border-1 border-border text-4xl ",
                          input: "text-sm placeholder:text-default-400",
                        }}
                      />
                      {errors.shopName && (
                        <p className="mt-1 text-sm text-red-500 mr-7">
                          {errors.shopName.message}
                        </p>
                      )}
                    </div>
                    {/*  Shop Logo */}
                    <div className="relative flex flex-col gap-2">
                      <label
                        htmlFor="shopLogo"
                        className="flex items-center justify-start gap-2 p-4 px-6 rounded-lg cursor-pointer border-1 border-border hover:bg-gray-200"
                      >
                        <CiImageOn size={23} className="text-border" />
                        <span className="text-sm text-default-400">
                          شعار المتجر
                        </span>
                      </label>
                      <Input
                        id="shopLogo"
                        type="file"
                        {...register("shopLogo")}
                        accept="image/*"
                        className="hidden"
                      />
                      {errors.shopLogo && (
                        <p className="mt-1 text-sm text-red-500 mr-7">
                          {errors.shopLogo.message}
                        </p>
                      )}
                    </div>

                    {/*  Shop Description */}
                    <div>
                      <Textarea
                        {...register("shopDescription")}
                        maxRows={3}
                        minRows={3}
                        className="relative w-full rounded-lg z-2"
                        placeholder="اكتب وصفاً للمتجر"
                        labelPlacement="outside"
                        startContent={
                          <CiViewList size={23} className="text-border" />
                        }
                        classNames={{
                          inputWrapper:
                            "bg-transparent shadow-none p-6 pt-4 border-1 border-border  ",
                          input: "text-sm placeholder:text-default-400",
                        }}
                      />
                      {errors.shopDescription && (
                        <p className="mt-1 text-sm text-red-500 mr-7">
                          {errors.shopDescription.message}
                        </p>
                      )}
                    </div>

                    {/*  City */}
                    <div>
                      <Select
                        {...register("city")}
                        aria-label="اختر المدينة"
                        className="relative w-full rounded-lg z-2"
                        placeholder="المدينة"
                        labelPlacement="outside"
                        classNames={{
                          trigger:
                            "bg-transparent shadow-none p-6 border-1 border-border  ",
                        }}
                        selectedKeys={
                          methods.watch("city") ? [methods.watch("city")] : []
                        }
                        onSelectionChange={(keys) => {
                          // تأكدنا إن القيمة Set فعلًا مش "all"
                          const value =
                            typeof keys === "string"
                              ? keys
                              : Array.from(keys as Set<string>)[0] || "";

                          methods.setValue("city", value, {
                            shouldValidate: true,
                          });
                        }}
                        startContent={
                          <PiCityLight size={23} className="text-border" />
                        }

                        // classNames={{
                        //   inputWrapper:
                        //     "bg-transparent shadow-none p-6 border-1 border-border  ",
                        //   input: "text-sm placeholder:text-default-400",
                        // }}
                      >
                        <SelectItem dir="rtl" key="riyadh">
                          الرياض
                        </SelectItem>
                        <SelectItem dir="rtl" key="jeddah">
                          جدة
                        </SelectItem>
                      </Select>
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-500 mr-7">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    {/*  SHOP Address */}
                    <div>
                      <Input
                        {...register("shopAddress")}
                        className="w-full rounded-lg"
                        placeholder="عنوان المتجر"
                        labelPlacement="outside"
                        startContent={
                          <CiShop size={23} className="text-border" />
                        }
                        classNames={{
                          inputWrapper:
                            "bg-transparent shadow-none p-6 border-1 border-border text-4xl ",
                          input: "text-sm placeholder:text-default-400",
                        }}
                      />
                      {errors.shopAddress && (
                        <p className="mt-1 text-sm text-red-500 mr-7">
                          {errors.shopAddress.message}
                        </p>
                      )}
                    </div>

                    {/*  Commercial register */}
                    <div>
                      <Input
                        {...register("shopCR")}
                        className="w-full rounded-lg"
                        placeholder="رقم السجل التجاري (اختياري)"
                        labelPlacement="outside"
                        startContent={
                          <CiBank size={23} className="text-border" />
                        }
                        classNames={{
                          inputWrapper:
                            "bg-transparent shadow-none p-6 border-1 border-border text-4xl ",
                          input: "text-sm placeholder:text-default-400",
                        }}
                      />
                      {errors.shopCR && (
                        <p className="mt-1 text-sm text-red-500 mr-7">
                          {errors.shopCR.message}
                        </p>
                      )}
                    </div>

                    {/*  Tax Number */}
                    <div>
                      <Input
                        {...register("shopTN")}
                        className="w-full rounded-lg"
                        placeholder="الرقم الضريبي (اختياري)"
                        labelPlacement="outside"
                        startContent={
                          <CiBank size={23} className="text-border" />
                        }
                        classNames={{
                          inputWrapper:
                            "bg-transparent shadow-none p-6 border-1 border-border text-4xl ",
                          input: "text-sm placeholder:text-default-400",
                        }}
                      />
                      {errors.shopTN && (
                        <p className="mt-1 text-sm text-red-500 mr-7">
                          {errors.shopTN.message}
                        </p>
                      )}
                    </div>

                    {/*  Commercial register File */}
                    <div>
                      <label
                        htmlFor="shopCRFile"
                        className="flex items-center justify-start gap-2 p-4 px-6 rounded-lg cursor-pointer border-1 border-border hover:bg-gray-200"
                      >
                        <CiImageOn size={23} className="text-border" />
                        <span className="text-sm text-default-400">
                          إرفاق السجل التجاري
                        </span>
                      </label>
                      <Input
                        type="file"
                        id="shopCRFile"
                        {...register("shopCRFile")}
                        className="hidden"
                        accept="image/*"
                        placeholder="إرفاق السجل التجاري"
                        labelPlacement="outside"
                        startContent={
                          <CiFileOn size={23} className="text-border" />
                        }
                        classNames={{
                          inputWrapper:
                            "bg-transparent shadow-none p-6 border-1 border-border text-4xl ",
                          input: "text-sm placeholder:text-default-400",
                        }}
                      />
                      {errors.shopCRFile && (
                        <p className="mt-1 text-sm text-red-500 mr-7">
                          {errors.shopCRFile.message}
                        </p>
                      )}
                    </div>

                    {/*  SHOP Website */}
                    <div>
                      <Input
                        {...register("shopWebsite")}
                        className="w-full rounded-lg"
                        placeholder="الموقع الإلكتروني (اختياري)"
                        labelPlacement="outside"
                        startContent={
                          <CiGlobe size={23} className="text-border" />
                        }
                        classNames={{
                          inputWrapper:
                            "bg-transparent shadow-none p-6 border-1 border-border text-4xl ",
                          input: "text-sm placeholder:text-default-400",
                        }}
                      />
                      {errors.shopWebsite && (
                        <p className="mt-1 text-sm text-red-500 mr-7">
                          {errors.shopWebsite.message}
                        </p>
                      )}
                    </div>

                    {/*  SHOP IBAN */}
                    <div>
                      <Input
                        {...register("shopIBAN")}
                        className="w-full rounded-lg"
                        placeholder="رقم الحساب البنكي (آيبان)"
                        labelPlacement="outside"
                        startContent={
                          <CiBank size={23} className="text-border" />
                        }
                        classNames={{
                          inputWrapper:
                            "bg-transparent shadow-none p-6 border-1 border-border text-4xl ",
                          input: "text-sm placeholder:text-default-400",
                        }}
                      />
                      {errors.shopIBAN && (
                        <p className="mt-1 text-sm text-red-500 mr-7">
                          {errors.shopIBAN.message}
                        </p>
                      )}
                    </div>

                    {/*  SHOP IBAN Confirm */}
                    <div>
                      <Input
                        {...register("shopIBANConfirm")}
                        className="w-full rounded-lg"
                        placeholder="تأكيد رقم الحساب البنكي (آيبان)"
                        labelPlacement="outside"
                        startContent={
                          <CiBank size={23} className="text-border" />
                        }
                        classNames={{
                          inputWrapper:
                            "bg-transparent shadow-none p-6 border-1 border-border text-4xl ",
                          input: "text-sm placeholder:text-default-400",
                        }}
                      />
                      {errors.shopIBANConfirm && (
                        <p className="mt-1 text-sm text-red-500 mr-7">
                          {errors.shopIBANConfirm.message}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* 🧭 STEP 3 */}
                {step === 3 && (
                  <>
                    <div className="flex flex-col justify-between gap-4 md:flex-row">
                      {/*  Brands Select */}
                      <div className="w-full">
                        <Select
                          classNames={{
                            trigger: "min-h-12 py-2 px-6",
                          }}
                          isMultiline
                          selectedKeys={new Set(methods.watch("brands") || [])} // لأن selectedKeys لازم Set
                          onSelectionChange={(keys) => {
                            const selectedValues = Array.from(
                              keys as Set<string>
                            );
                            methods.setValue("brands", selectedValues, {
                              shouldValidate: true,
                            });
                          }}
                          items={car_data}
                          labelPlacement="outside"
                          placeholder="اختر علامة تجارية"
                          aria-label="اختر علامة تجارية"
                          renderValue={(items) => (
                            <div className="flex flex-wrap gap-2">
                              {items.map((item) => (
                                <Chip key={item.key}>{item.data?.brand}</Chip>
                              ))}
                            </div>
                          )}
                          selectionMode="multiple"
                          variant="bordered"
                        >
                          {(brand) => (
                            <SelectItem
                              dir="rtl"
                              key={brand.id}
                              textValue={brand.brand}
                            >
                              <div
                                dir="rtl"
                                className="flex items-center gap-2"
                              >
                                <Avatar
                                  alt={brand.brand}
                                  className="bg-transparent shrink-0"
                                  size="sm"
                                  src={brand.logo}
                                />
                                <div className="flex flex-col">
                                  <span className="text-small">
                                    {brand.brand}
                                  </span>
                                  <span className="text-tiny text-default-400">
                                    {brand.brand}
                                  </span>
                                </div>
                              </div>
                            </SelectItem>
                          )}
                        </Select>

                        {errors.brands && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.brands.message}
                          </p>
                        )}
                      </div>

                      {/*  Models Select (derived from selected brands) */}
                      <div className="w-full">
                        <Select
                          classNames={{ trigger: "min-h-12 py-2 px-6" }}
                          isMultiline
                          selectedKeys={new Set(methods.watch("models") || [])}
                          onSelectionChange={(keys) => {
                            const selectedValues = Array.from(
                              keys as Set<string>
                            );
                            methods.setValue("models", selectedValues, {
                              shouldValidate: true,
                            });
                          }}
                          items={modelItems}
                          labelPlacement="outside"
                          placeholder="اختر الموديل"
                          aria-label="اختر الموديل"
                          renderValue={(items) => (
                            <div className="flex flex-wrap gap-2">
                              {items.map((it: any) => (
                                // `items` here has the shape { key, data } like in the Brands Select
                                // prefer data.value, fallback to key so chips render correctly
                                <Chip key={it.key}>
                                  {it.data?.value ?? it.key}
                                </Chip>
                              ))}
                            </div>
                          )}
                          selectionMode="multiple"
                          variant="bordered"
                        >
                          {(model: any) => (
                            <SelectItem
                              dir="rtl"
                              key={model.id}
                              textValue={model.value}
                            >
                              <div className="flex items-center gap-2">
                                <div className="flex flex-col">
                                  <span className="text-small">
                                    {model.brand}
                                  </span>
                                  <span className="text-tiny text-default-400">
                                    {model.value}
                                  </span>
                                </div>
                              </div>
                            </SelectItem>
                          )}
                        </Select>

                        {errors.models && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.models.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Car Part Types */}

                    <CheckboxGroup
                      color="primary"
                      defaultValue={[""]}
                      label="نوع قطع الغيار"
                      orientation="horizontal"
                      classNames={{
                        label: "text-2xl font-medium text-black mb-2",
                        base: " gap-4",
                        wrapper: "px-6",
                      }}
                    >
                      <Checkbox value="جديد ( تجاري )">جديد ( تجاري )</Checkbox>
                      <Checkbox value="جديد ( أصلي )">جديد ( أصلي )</Checkbox>
                      <Checkbox value="تشليح">تشليح</Checkbox>
                    </CheckboxGroup>

                    {/* Delivery Types */}

                    <CheckboxGroup
                      color="primary"
                      defaultValue={[""]}
                      label="وسيلة التوصيل"
                      orientation="horizontal"
                      classNames={{
                        label: "text-2xl font-medium text-black mb-2",
                        base: " gap-4",
                        wrapper: "px-6",
                      }}
                    >
                      <Checkbox value="التوصيل على التاجر">
                        التوصيل على التاجر
                      </Checkbox>
                      <Checkbox value="التوصيل على المنصة">
                        التوصيل على المنصة
                      </Checkbox>
                      <Checkbox value="الإستلام من المتجر">
                        الإستلام من المتجر
                      </Checkbox>
                    </CheckboxGroup>

                    {/*  Shop Terms File */}
                    <div>
                      <label
                        htmlFor="shopTermsFile"
                        className="flex items-center justify-start gap-2 p-4 px-6 rounded-lg cursor-pointer border-1 border-border hover:bg-gray-200"
                      >
                        <CiImageOn size={23} className="text-border" />
                        <span className="text-sm text-default-400">
                          إرفاق الشروط والاحكام الخاصة بالموقع
                        </span>
                      </label>
                      <Input
                        type="shopTermsFile"
                        {...register("shopTermsFile")}
                        // value={"لم يتم اختيار ملف"}
                        className="hidden"
                        accept="image/*"
                        placeholder="إرفاق الشروط والاحكام الخاصة بالموقع"
                        labelPlacement="outside"
                        startContent={
                          <CiImageOn size={23} className="text-border" />
                        }
                        classNames={{
                          inputWrapper:
                            "bg-transparent shadow-none p-6 border-1 border-border text-4xl ",
                          input: "text-sm placeholder:text-default-400",
                        }}
                      />
                      {errors.shopTermsFile && (
                        <p className="mt-1 text-sm text-red-500 mr-7">
                          {errors.shopTermsFile.message}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* ✅ الأزرار */}
                <div className="flex flex-col items-center justify-between gap-4 mt-20 md:flex-row">
                  <div className="flex items-center">
                    {Object.keys(methods.formState.errors).length > 0 && (
                      <p className="p-2 mt-2 text-sm text-red-500 border-red-500 border-1 rounded-2xl">
                        يرجى مراجعة البيانات، هناك حقول غير صحيحة!
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-end gap-4">
                    {step < 3 ? (
                      <Button
                        type="button"
                        onPress={() => {
                          // تحقق من الخطوة الحالية فقط قبل الانتقال
                          const fields = [
                            "name",
                            "email",
                            "password",
                            "phone",
                            "repassword",
                            "acceptTerms",
                            "shopName",
                            "shopLogo",
                            "shopIBAN",
                            "shopIBANConfirm",
                            "shopCRFile",
                            "shopWebsite",
                            "shopAddress",
                            "shopDescription",
                            "City",
                          ];
                          const currentField = fields[
                            step - 1
                          ] as keyof FormData;

                          methods.trigger(currentField).then((valid) => {
                            if (valid) nextStep();
                          });
                        }}
                        className="px-4 py-2 text-white rounded-lg w-[150px] bg-primary hover:bg-transparent hover:text-primary border-1 border-primary hover:border-primary"
                        // isDisabled={!methods.formState.isValid}
                      >
                        التالي
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onPress={() => methods.handleSubmit(onSubmit)()}
                        className="px-4 py-2 text-white bg-primary w-[150px] rounded-lg"
                      >
                        إرسال
                      </Button>
                    )}

                    {step > 1 && (
                      <Button
                        type="button"
                        onPress={prevStep}
                        className="px-4 py-2 text-white rounded-lg bg-secondary hover:bg-transparent border-1 border-secondary dark:text-[#000] dark:hover:bg-[#eee] hover:text-secondary"
                      >
                        رجوع
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </FormProvider>
        </div>
      </div>
    </DefaultLayout>
  );
}
