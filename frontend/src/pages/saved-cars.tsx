import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { IoCarSportOutline } from "react-icons/io5";
import { Button } from "@heroui/button";
import { IoAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { openModal } from "@/features/mainModal/mainModalSlice";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";

import { removeCarFromSavedList } from "@/features/savedCars/savedCarsSlice";

export default function SavedCars() {
  const savedCars = useSelector((state: RootState) => state.savedCars.cars);
  const dispatch = useDispatch();
  //   const { isOpen, type } = useSelector((state: RootState) => state.mainModal);
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center w-full py-10">
        <div className="flex flex-col items-center">
          <h1 className={`${title()} text-center`}>السيارات المحفوظة</h1>
        </div>
        {/* Add Car */}
        <div className="flex flex-col w-full gap-6 p-2 my-8 md:p-12 border-y-1 border-border rounded-3xl ">
          <div className="flex flex-col items-center justify-center gap-6 text-lg text-center text-gray-500">
            {savedCars.length > 0 ? (
              <div className="flex flex-col w-full gap-2">
                {savedCars.map((car) => (
                  <div
                    key={car.id}
                    className="flex flex-col items-center justify-center w-full gap-2 p-2 md:justify-start border-1 border-border rounded-3xl md:flex-row"
                  >
                    <div className="flex items-center justify-center w-full md:w-max">
                      <img
                        src={car.image}
                        alt=""
                        className="object-cover w-25 h-25 rounded-2xl"
                      />
                    </div>
                    <div className="md:w-[100%] flex flex-col md:items-start items-center justify-center  w-full text-right">
                      <h4 className="font-medium text-black">
                        {car.model} {car.year}
                      </h4>
                      <p className="text-sm text-icon">رقم الهيكل: {car.VIN}</p>
                      <p className="text-sm text-icon">
                        رقم الاستمارة: {car.VRN}
                      </p>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-2 md:w-max w-max md:flex-col md:items-end ">
                      <Button
                        isIconOnly
                        className="w-2 bg-transparent md:w-4 text-primary border-1 border-primary hover:text-white hover:bg-primary hover:border-primary"
                        endContent={<CiEdit className="text-lg md:text-2xl" />}
                        onPress={() => {
                          dispatch(openModal("editCarModal"));
                          // Pass the car ID to EditCarModal via state or props
                          localStorage.setItem("editCarId", car.id);
                        }}
                      ></Button>
                      <Button
                        isIconOnly
                        className="text-red-500 bg-transparent border-red-500 border-1 hover:text-white hover:bg-red-500 hover:border-red-500"
                        endContent={<CiTrash size={20} />}
                        onPress={() => dispatch(removeCarFromSavedList(car.id))}
                      ></Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6">
                <div>
                  <IoCarSportOutline size={150} className="text-primary" />
                </div>
                <h4 className="text-3xl font-bold text-black">
                  لا توجد سيارات محفوظة
                </h4>
                <p>يمكنك إضافة سيارتك الأولى</p>
              </div>
            )}
            <div>
              <Button
                className="bg-transparent text-primary border-1 border-primary hover:text-white hover:bg-primary hover:border-primary"
                endContent={<IoAdd size={20} />}
                onPress={() => dispatch(openModal("addCarModal"))}
              >
                إضافة سيارة
              </Button>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
