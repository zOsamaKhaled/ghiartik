import { Select, SelectItem } from "@heroui/select";
import { useDispatch } from "react-redux";
import { setFilter } from "@/features/vendors/vendorsSlice";
import { SearchIcon } from "@/components/icons";

export default function Filters() {
  const dispatch = useDispatch();

  return (
    <>
      {/* Filter Start */}

      <section className="flex flex-col items-start justify-start gap-4 py-8 md:py-10">
        <div className="flex items-center w-full gap-4 ">
          <h4 className="w-[40%] md:w-25">أفضل التجار</h4>
          <Select
            dir="rtl"
            size="md"
            className="w-full basis-3/3"
            defaultSelectedKeys={["distance"]}
            aria-label="اختر التصنيف"
            placeholder="اختر التصنيف"
            startContent={<SearchIcon />}
            // selectedKeys={[filter]}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              dispatch(setFilter(selected));
            }}
          >
            <SelectItem key="distance" dir="rtl">
              الأقرب
            </SelectItem>
            <SelectItem key="lowestBudget" dir="rtl">
              السعر
            </SelectItem>
            <SelectItem key="rating" dir="rtl">
              التقييم
            </SelectItem>
          </Select>
        </div>
      </section>

      {/* Filter End */}
    </>
  );
}
