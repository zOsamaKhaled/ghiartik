import { DollarSign } from "lucide-react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Pagination, Card, CardBody, CardFooter, Image } from "@heroui/react";

import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../features/vendors/vendorsSlice.tsx";
import { Link } from "react-router-dom";
import Filters from "./filters.tsx";

export default function VendorCards() {
  const dispatch = useDispatch();
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
    <>
      {/* Filter Start */}

      <Filters />

      {/* Filter End */}

      {/* Vendor Cards Start */}

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {currentVendors.map((item, index) => (
          <Card key={index} isPressable shadow="sm">
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
              <CardFooter className="flex flex-col justify-between gap-4 lg:flex-row lg:gap-0 text-small">
                <b>{item.name_ar}</b>
                {/* <p className="text-default-500">{item.rating}</p> */}
                <div className="flex flex-col items-center gap-2 rate-budget lg:flex-row lg:gap-2">
                  {renderStars(item.rating)}
                  {renderBudget(item.lowestBudget)}
                </div>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>

      {/* Vendor Cards End */}
      <Pagination
        className="my-10"
        total={totalPages}
        page={page}
        onChange={(page) => dispatch(setPage(page))}
        color="primary"
      />
    </>
  );
}
