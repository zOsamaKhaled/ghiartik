import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Button, Form, Input, Checkbox, Textarea } from "@heroui/react";

import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { BsEnvelopeAt } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { TfiTime } from "react-icons/tfi";

import React from "react";

interface FormErrors {
  name?: string;
  email?: string;
  terms?: string;
  [key: string]: string | undefined;
}

export default function Contact() {
  const [submitted, setSubmitted] = React.useState<any>(null);
  const [errors, setErrors] = React.useState<FormErrors>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const newErrors: FormErrors = {};

    // Username validation
    if (data.name === "admin") {
      newErrors.name = "ياحلو يا جميل ومالو";
    }

    // Email validation
    if (!data.email) {
      newErrors.email = "الرجاء إدخال بريدك الإلكتروني";
    } else if (
      typeof data.email === "string" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    ) {
      newErrors.email = "الرجاء كتابة بريد إلكتروني صالح";
    }

    // Terms checkbox
    if (data.terms !== "true") {
      newErrors.terms = "الرجاء قبول الشروط";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and submit
    setErrors({});
    setSubmitted(data);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center w-full py-10">
        <h1 className={title()}>تواصل معنا</h1>
        <p className="mt-4 text-center text-light-black">
          إذا كان لديك أي استفسارات أو تحتاج إلى مساعدة، لا تتردد في التواصل
          معنا عبر القنوات التالية:
        </p>
        <div className="flex flex-col items-start justify-center w-full lg:flex-row">
          {/* Contact Form */}
          <div className="flex flex-col items-center justify-center w-full gap-4 mt-8 h-[500px]">
            <Form
              className="items-center justify-center w-full space-y-4"
              onReset={() => setSubmitted(null)}
              onSubmit={onSubmit}
            >
              <div className="flex flex-col w-full gap-6">
                <Input
                  isRequired
                  classNames={{
                    inputWrapper: "p-6", // البادينج حوالين المحتوى كله
                    input: "text-right",
                    // لتغيير اتجاه النص
                  }}
                  label="الاسم"
                  labelPlacement="outside"
                  name="name"
                  placeholder="أدخل اسمك"
                  errorMessage={({ validationDetails }) =>
                    validationDetails.valueMissing
                      ? "ادخل اسمك من فضلك"
                      : errors.name
                  }
                />

                <Input
                  isRequired
                  label="البريد الإلكتروني"
                  labelPlacement="outside"
                  classNames={{
                    inputWrapper: "p-6", // البادينج حوالين المحتوى كله
                    input: "text-right",
                    // لتغيير اتجاه النص
                  }}
                  name="email"
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  errorMessage={({ validationDetails }) => {
                    if (validationDetails.valueMissing)
                      return "الرجاء إدخال بريدك الإلكتروني";
                    if (validationDetails.typeMismatch)
                      return "الرجاء كتابة بريد إلكتروني صالح";
                    return errors.email;
                  }}
                />

                <Textarea
                  isRequired
                  classNames={{
                    inputWrapper: "p-6", // البادينج حوالين المحتوى كله
                    input: "text-right",
                    // لتغيير اتجاه النص
                  }}
                  label="الرسالة"
                  labelPlacement="outside"
                  placeholder="اكتب رسالتك هنا"
                  errorMessage={({ validationDetails }) =>
                    validationDetails.valueMissing
                      ? "اكتب الرسالة من فضلك"
                      : errors.message
                  }
                />

                <Checkbox
                  isRequired
                  classNames={{ label: "text-small" }}
                  name="terms"
                  value="true"
                  onValueChange={() =>
                    setErrors((prev) => ({ ...prev, terms: undefined }))
                  }
                >
                  أوافق على الشروط والأحكام
                </Checkbox>
                {errors.terms && (
                  <span className="text-danger text-small">{errors.terms}</span>
                )}

                <div className="flex gap-4">
                  <Button
                    className="w-full"
                    color="primary"
                    type="submit"
                    onPress={() => console.log(submitted)}
                  >
                    إرسال
                  </Button>
                  <Button type="reset" variant="bordered">
                    إعادة تعيين
                  </Button>
                </div>
              </div>
            </Form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center justify-start w-full gap-4 mt-8 h-[500px]">
            <h3 className="text-2xl font-normal">معلومات الاتصال</h3>
            <div className="flex flex-col ">
              <div className="grid grid-flow-row grid-cols-2 gap-4">
                <a
                  href="tel:+966000000000"
                  target="_blank"
                  className="h-[200px] flex flex-col justify-center items-center gap-6 p-4 py-8 mt-2 text-sm font-normal transition-all duration-300 border-1 border-border rounded-3xl text-default-600 group hover:bg-primary"
                >
                  <HiOutlineDevicePhoneMobile className="text-[60px] text-primary group-hover:text-white" />
                  <p className="group-hover:text-white">+966000000000</p>
                </a>
                <a
                  href="mailto:info@gmail.com.sa"
                  target="_blank"
                  className=" h-[200px] flex flex-col justify-center items-center gap-6 p-4 py-8 mt-2 text-sm font-normal transition-all duration-300 border-1 border-border rounded-3xl text-default-600 group hover:bg-primary"
                >
                  <BsEnvelopeAt className="text-[60px] text-primary group-hover:text-white" />
                  <p className="group-hover:text-white">info@gmail.com.sa</p>
                </a>
                <a className="h-[200px] flex flex-col justify-center items-center gap-4 p-4 py-8 mt-2 text-sm font-normal transition-all duration-300 cursor-text border-1 border-border rounded-3xl text-default-600 group hover:bg-primary">
                  <TfiTime className="text-[60px] text-primary group-hover:text-white" />

                  <h4 className="group-hover:text-white">ساعات العمل</h4>
                  <p className="group-hover:text-white">
                    الأحد - الخميس: 9 صباحًا – 6 مساءً
                  </p>
                </a>
                <a
                  href="https://maps.app.goo.gl/giYsA3nBUe5HQyE76"
                  target="_blank"
                  className="h-[200px] flex flex-col justify-center items-center gap-6 p-4 py-8 mt-2 text-sm font-normal transition-all duration-300 border-1 border-border rounded-3xl text-default-600 group hover:bg-primary"
                >
                  <FiMapPin className="text-[60px] text-primary group-hover:text-white" />
                  <p className="group-hover:text-white">
                    الرياض - المملكة العربية السعودية
                  </p>
                </a>
              </div>

              {/* <div className="flex items-center justify-center gap-1 mt-4 ml-6 social">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-sm-icons"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-sm-icons"
                >
                  <AiFillTikTok />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-sm-icons"
                >
                  <FaWhatsapp />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-sm-icons"
                >
                  <FaSquareFacebook />
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
