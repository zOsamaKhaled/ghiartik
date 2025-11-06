import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { terms_data } from "@/config/terms_data";
import { useNavigate } from "react-router-dom";
export default function Terms() {
  const navigate = useNavigate();
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center w-full py-10">
        <h1 className={title()}>الشروط والأحكام</h1>
        {/* About Us */}
        <div className="flex flex-col w-full gap-6 p-4 my-8 md:p-12 border-y-1 border-border rounded-3xl about_us">
          {terms_data.map((item, index) => (
            <div key={index} className="flex flex-col gap-4 py-4">
              <h3 className="text-2xl font-normal">
                {index + 1}.{item.title}
              </h3>
              <p className="text-light-black">{item.content}</p>
            </div>
          ))}
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
