import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Card, CardHeader, Image, Button } from "@heroui/react";
import { about_data } from "@/config/about_data";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center w-full py-10">
        <h1 className={title()}>حول المنصة</h1>
        {/* About Us */}
        <div className="flex flex-col w-full gap-6 p-4 my-8 md:p-12 border-y-1 border-border rounded-3xl about_us">
          <h3 className="text-3xl font-normal">حول المنصة</h3>
          <p className="text-light-black">
            منصة غيّار تك هي وجهتك الأولى لشراء قطع غيار السيارات الأصلية
            والمضمونة عبر الإنترنت. نسعى لتوفير تجربة تسوّق سهلة، آمنة، وسريعة
            لجميع العملاء من مختلف أنحاء المملكة ودول الخليج، من خلال ربط
            المستخدمين بأفضل الموردين والمتاجر المتخصصة في قطع الغيار. هدفنا أن
            نوفر لك القطعة المناسبة لسيارتك بأفضل سعر وبأقصر وقت ممكن.
          </p>
        </div>
        {/* Why Us */}
        <div className="flex flex-col w-full gap-12 p-0 mb-8 md:p-12 rounded-3xl border-y-1 border-border why_us">
          <h3 className={"text-3xl font-normal"}>لماذا تختار غيّار تك؟</h3>
          <div className="grid grid-cols-12 grid-rows-2 gap-2 ">
            {about_data.map((item, index) => (
              <Card
                key={index}
                className="col-span-12 md:col-span-6 lg:col-span-4 h-[300px] group "
              >
                <CardHeader className="absolute z-10 top-1 flex-col items-start!">
                  <p className="font-bold uppercase transition-colors duration-300 text-tiny text-white/60 group-hover:text-white">
                    {item.sub_title}
                  </p>
                  <h4 className="font-medium text-white transition-colors duration-300 text-large group-hover:text-primary">
                    {item.text}
                  </h4>
                </CardHeader>
                <Image
                  removeWrapper
                  alt="Card background"
                  className="z-0 object-cover w-full h-full transition-all duration-700 group-hover:blur-sm group-hover:scale-101 group-hover:rotate-2"
                  src={item.image}
                />
              </Card>
            ))}
          </div>
        </div>
        {/* Join Us */}
        <div className="flex flex-col items-center justify-center w-full gap-6 p-4 mb-8 md:p-12 border-y-1 border-border rounded-3xl join_us">
          <h3 className="text-3xl font-normal">انضم إلينا</h3>
          <p className="text-light-black">
            سواء كنت تاجرًا، ميكانيكيًا، أو صاحب سيارة تبحث عن الراحة، غيار تك
            هو المكان المناسب لك. انضم إلينا وابدأ رحلتك في عالم القطع الأصلية
            الموثوقة.
          </p>
          <div className="flex items-center justify-center gap-2 bottom">
            <Button
              startContent={<AiOutlineUsergroupAdd size={20} />}
              className="bg-white border-1 text-primary border-[#D9D9D9] hover:text-white hover:bg-primary hover:border-primary"
              onPress={() => navigate("/be-vendor")}
            >
              انضم إلينا الآن
            </Button>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
