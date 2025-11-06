import DefaultLayout from "@/layouts/default";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults } from "@/features/search/searchSlice";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Input,
  Pagination,
} from "@heroui/react";

import { Link } from "react-router-dom";
import { SearchIcon } from "@/components/icons";
import { setPage } from "@/features/search/searchSlice";
import { FiShoppingCart } from "react-icons/fi";
import { LuPackageSearch } from "react-icons/lu";

import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { results, itemsPerPage, page } = useSelector(
    (state: any) => state.search
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(getSearchResults(value) as any);
  };

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = results.slice(startIndex, startIndex + itemsPerPage);
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center w-full gap-10 py-10">
        <h1 className="text-4xl font-bold">صفحة البحث</h1>
        <p className="mt-4 text-center text-light-black">
          هنا يمكنك البحث عن التجار أو قطع الغيار التي تحتاجها لسيارتك بسهولة
          وسرعة. استخدم شريط البحث أدناه للعثور على المنتجات المناسبة بناءً على
          الموديل، النوع، أو الرقم التسلسلي.
        </p>

        <Input
          placeholder="ابحث عن تاجر معين، قطع الغيار، الموديل"
          startContent={
            <SearchIcon className="text-2xl pointer-events-none text-default-400 " />
          }
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          classNames={{
            inputWrapper: "p-8", // البادينج حوالين المحتوى كله
            input: "text-right", // لتغيير اتجاه النص
          }}
        />
        {/* Search Cards Start */}
        <div className="container p-4 mx-auto">
          {searchTerm ? (
            currentItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {currentItems.map((item: any, index: number) => (
                  <Card key={index} shadow="sm">
                    {item.type === "vendor" ? (
                      <Link to={`/vendors/${item.id}`}>
                        <CardBody className="p-0 overflow-visible">
                          <Image
                            alt={item.name_ar || item.name_en}
                            className="w-full object-contain h-[180px] p-4"
                            radius="lg"
                            shadow="sm"
                            src={item.image_url || item.image || item.logo}
                            width="100%"
                          />
                        </CardBody>
                        <CardFooter className="flex flex-col justify-between gap-4 lg:flex-row lg:gap-0 text-small">
                          <b>{item.name_ar || item.name_en}</b>
                        </CardFooter>
                      </Link>
                    ) : item.type === "part" ? (
                      <>
                        <CardBody className="p-0 overflow-visible">
                          <Image
                            alt={
                              item.name ||
                              item.brand ||
                              item.models ||
                              item.id ||
                              item.type
                            }
                            className="w-full object-contain h-[180px] p-4"
                            radius="lg"
                            shadow="sm"
                            src={item.image_url || item.image || item.logo}
                            width="100%"
                          />
                        </CardBody>
                        <CardFooter className="flex flex-col justify-between gap-4 lg:flex-row lg:gap-0 text-small">
                          <b>
                            {item.name ||
                              item.brand ||
                              item.models ||
                              item.id ||
                              item.type}
                          </b>
                          <Button
                            startContent={<FiShoppingCart size={16} />}
                            color="primary"
                            size="sm"
                            onPress={() => navigate("/price-request")}
                          >
                            طلب القطعة
                          </Button>
                        </CardFooter>
                      </>
                    ) : (
                      <>
                        <CardBody className="p-0 overflow-visible">
                          <Image
                            alt={
                              item.name ||
                              item.brand ||
                              item.models ||
                              item.id ||
                              item.type
                            }
                            className="w-full object-contain h-[180px] p-4"
                            radius="lg"
                            shadow="sm"
                            src={item.image_url || item.image || item.logo}
                            width="100%"
                          />
                        </CardBody>
                        <CardFooter className="flex flex-col justify-between gap-4 lg:flex-row lg:gap-0 text-small">
                          <b>
                            {item.name ||
                              item.brand ||
                              item.models ||
                              item.id ||
                              item.type}
                          </b>
                        </CardFooter>
                      </>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-6 py-10 text-lg text-center text-gray-500">
                <div>
                  <img
                    src="/not-found-search.svg"
                    alt="Not Found"
                    className="w-40 h-40 mx-auto mb-4"
                  />
                </div>
                <div className="flex flex-col items-center gap-6">
                  <h4 className="text-3xl font-bold text-black">
                    لم يتم العثور على نتائج بحث لـ "{searchTerm}"
                  </h4>
                  <p>
                    يرجى التحقق من صحة الكلمة التي أدخلتها، أو جرّب البحث بكلمة
                    أخرى أكثر تحديدًا.
                  </p>
                </div>
              </div>
            )
          ) : (
            // الحالة قبل أي بحث
            <div className="flex flex-col items-center justify-center gap-6 py-10 text-lg text-center text-gray-500">
              <div>
                <LuPackageSearch className="text-[200px] text-primary" />
              </div>
              <div className="flex flex-col items-center gap-6">
                <h4 className="text-3xl font-bold text-black">
                  ابحث عن قطعة غيار أو بائع أو سيارة
                </h4>
                <p>اكتب الكلمة التي تريد البحث عنها في مربع البحث أعلاه.</p>
              </div>
            </div>
          )}
        </div>

        {/* Search Cards End */}

        {searchTerm ? (
          <Pagination
            className="my-10"
            total={totalPages}
            page={page}
            onChange={(page) => dispatch(setPage(page))}
            color="primary"
          />
        ) : (
          ""
        )}
      </section>
    </DefaultLayout>
  );
}
