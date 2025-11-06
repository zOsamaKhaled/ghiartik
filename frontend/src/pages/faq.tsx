import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Button, Accordion, AccordionItem } from "@heroui/react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { faq_data } from "@/config/faq_data";
export default function FAQ() {
  const navigate = useNavigate();
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center w-full py-10">
        <h1 className={title()}>الأسئلة الشائعة</h1>
        {/* About Us */}
        <div className="flex flex-col w-full gap-6 p-4 my-8 md:p-12 border-y-1 border-border rounded-3xl about_us">
          <h3 className="text-3xl font-normal">الأسئلة الشائعة</h3>
          <p className="text-light-black">
            نهدف في "غيارتِك" إلى توفير تجربة تسوّق سلسة وواضحة، لذلك جمعنا لك
            أكثر الأسئلة التي تَرِدنا من العملاء مع إجاباتها المفصلة لتساعدك في
            الحصول على المعلومات التي تحتاجها بسرعة. إذا لم تجد سؤالك هنا، لا
            تتردد في التواصل معنا مباشرة عبر خدمة العملاء.
          </p>
          <Accordion showDivider={false}>
            {faq_data.map((item, index) => (
              <AccordionItem
                key={index}
                className="px-4 mb-4 rounded-lg border-1 border-border"
                title={item.question}
                startContent={<HiOutlineWrenchScrewdriver size={25} />}
              >
                <p className="pb-6 text-light-black">{item.answer}</p>
              </AccordionItem>
            ))}
          </Accordion>
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
