import DefaultLayout from "@/layouts/default";
import Slider from "@/components/slider";
import { DollarSign } from "lucide-react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import {
  Pagination,
  Card,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@heroui/react";
import { CiTrash } from "react-icons/ci";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { setPage } from "../features/vendors/vendorsSlice.tsx";
import { Link } from "react-router-dom";
import Filters from "../components/filters.tsx";
import {
  removeVendorFromFav,
  removeAllVendorsFromFav,
} from "../features/vendors/vendorsSlice.tsx";

export default function Favorites() {
  const dispatch = useDispatch<AppDispatch>();
  const { allVendors, filter, page, itemsPerPage } = useSelector(
    (state: any) => state.vendors
  );

  const sortedVendors = [...allVendors].sort((a, b) => {
    if (filter === "rating") {
      return b.rating - a.rating;
    } else if (filter === "lowestBudget") {
      return a.lowestBudget - b.lowestBudget;
    } else if (filter === "distance") {
      return a.distance - b.distance;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedVendors.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const currentVendors = sortedVendors.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  //   render stars
  const renderStars = (rate: number) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5;
    const totalStars = 5;

    return (
      <div
        className="flex flex-row-reverse items-center justify-center gap-1"
        dir="rtl"
      >
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

        <span className="text-xs text-default-400">{rate}</span>
      </div>
    );
  };

  //   render budget
  const renderBudget = (budget: number) => {
    let filled = 0;

    if (budget > 300) filled = 3;
    else if (budget > 100) filled = 2;
    else filled = 1;

    return (
      <div className="flex items-center gap-0.5 flex-row-reverse" dir="ltr">
        {[...Array(filled)].map((_, i) => (
          <DollarSign key={i} className="w-3 h-3 text-primary" />
        ))}
        {[...Array(3 - filled)].map((_, i) => (
          <DollarSign key={i + filled} className="w-3 h-3 text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <DefaultLayout>
      <Slider />
      <>
        {/* Filter Start */}

        <div className="flex flex-col items-center w-full gap-2 pb-8 md:pb-0 md:flex-row md:gap-4">
          <div className="w-full">
            <Filters />
          </div>

          <div className="flex">
            <Button
              className="p-2 text-red-500 transition-all duration-300 bg-transparent border-red-500 rounded-lg md:p-5 border-1 hover:text-white hover:bg-red-500"
              size="sm"
              endContent={
                <CiTrash
                  className="w-5 h-5 "
                  aria-label="حذف الجميع من المفضلة"
                  title="حذف الجميع من المفضلة"
                />
              }
              onPress={() => dispatch(removeAllVendorsFromFav())}
            >
              حذف الكل
            </Button>
          </div>
        </div>

        {/* Filter End */}

        {/* Vendor Cards Start */}

        {currentVendors.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {currentVendors.map((item, index) => (
              <Card key={index} shadow="sm">
                <Link to={`/vendors/${item.id}`}>
                  <CardBody className="p-0 overflow-visible">
                    <Image
                      alt={item.name_ar}
                      className="w-full object-contain h-[180px] p-4"
                      radius="lg"
                      shadow="sm"
                      src={item.image_url}
                      width="100%"
                    />
                  </CardBody>
                </Link>
                <CardFooter className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center lg:gap-0 text-small">
                  <Link to={`/vendors/${item.id}`}>
                    <div className="flex flex-col items-center gap-2 lg:items-start ">
                      <b>{item.name_ar}</b>
                      {/* <p className="text-default-500">{item.rating}</p> */}
                      <div className="flex flex-col items-center gap-2 lg:items-start rate-budget lg:flex-col lg:gap-2">
                        {renderStars(item.rating)}
                        {renderBudget(item.lowestBudget)}
                      </div>
                    </div>
                  </Link>
                  <div className="flex items-center justify-center p-1 ">
                    <Button
                      className="text-red-500 transition-all duration-300 bg-transparent border-red-500 rounded-lg border-1 hover:text-white hover:bg-red-500"
                      size="sm"
                      isIconOnly
                      endContent={
                        <CiTrash
                          className="w-5 h-5 "
                          aria-label="حذف من المفضلة"
                          title="حذف من المفضلة"
                        />
                      }
                      onPress={() => {
                        dispatch(removeVendorFromFav(item.id));
                      }}
                    ></Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col w-full gap-6 p-2 my-8 md:p-12 md:py-24 border-y-1 border-border rounded-3xl ">
            <div className="flex flex-col items-center w-full gap-6">
              <div>
                {/* <CiLocationOff size={150} className="text-primary" /> */}
                <img src="/fav-icon.svg" />
              </div>
              <h4 className="text-3xl font-bold text-black">
                لا يوجد تجار مضافون إلى المفضلة
              </h4>
              <p>أضف تجارك المفضلين لسهولة الوصول إليهم بسرعة.</p>
            </div>
          </div>
        )}

        {/* Vendor Cards End */}
        <Pagination
          className="my-10"
          total={totalPages}
          page={page}
          onChange={(page) => dispatch(setPage(page))}
          color="primary"
        />
      </>
    </DefaultLayout>
  );
}
