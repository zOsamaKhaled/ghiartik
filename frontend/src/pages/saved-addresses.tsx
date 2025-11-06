import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";

import { Button } from "@heroui/button";
import { IoAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { openModal } from "@/features/mainModal/mainModalSlice";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { CiLocationOff } from "react-icons/ci";
import { TbHomeRibbon } from "react-icons/tb";

import { removeAddressFromSavedList } from "@/features/savedAddresses/savedAddressesSlice";

export default function SavedAddresses() {
  const savedAddresses = useSelector(
    (state: RootState) => state.savedAddresses.addresses
  );
  const dispatch = useDispatch();
  //   const { isOpen, type } = useSelector((state: RootState) => state.mainModal);
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center w-full py-10">
        <div className="flex flex-col items-center">
          <h1 className={`${title()} text-center`}>العناوين المحفوظة</h1>
        </div>
        {/* Add Address */}
        <div className="flex flex-col w-full gap-6 p-2 my-8 md:p-12 border-y-1 border-border rounded-3xl ">
          <div className="flex flex-col items-center justify-center gap-6 text-lg text-center text-gray-500">
            {savedAddresses.length > 0 ? (
              <div className="flex flex-col w-full gap-2">
                {savedAddresses.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-start w-full gap-2 p-2 border-1 border-border rounded-3xl"
                  >
                    <div className="md:w-[5%] w-[10%] flex flex-col items-center">
                      <TbHomeRibbon className="text-3xl" />
                    </div>
                    <div className="w-[85%] text-right">
                      <h4 className="font-normal text-black dark:text-[#fff] md:font-medium text-medium ">
                        {a.region} - {a.city} - {a.district}
                      </h4>
                      <p className="text-sm text-icon">
                        العنوان بالتفصيل: {a.details}
                      </p>
                    </div>
                    <div className="w-[10%] flex flex-col items-end gap-2   ">
                      <Button
                        isIconOnly
                        className="bg-transparent text-primary border-1 border-primary hover:text-white hover:bg-primary hover:border-primary"
                        endContent={<CiEdit size={20} />}
                        onPress={() => {
                          dispatch(openModal("editAddressModal"));
                          // Pass the Address ID to EditAddressModal via state or props
                          localStorage.setItem("editAddressId", a.id);
                        }}
                      ></Button>
                      <Button
                        isIconOnly
                        className="text-red-500 bg-transparent border-red-500 border-1 hover:text-white hover:bg-red-500 hover:border-red-500"
                        endContent={<CiTrash size={20} />}
                        onPress={() =>
                          dispatch(removeAddressFromSavedList(a.id))
                        }
                      ></Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6">
                <div>
                  <CiLocationOff size={150} className="text-primary" />
                </div>
                <h4 className="text-3xl font-bold text-black">
                  لا توجد عناوين محفوظة
                </h4>
                <p>يمكنك إضافة عنوانك الأول</p>
              </div>
            )}
            <div>
              <Button
                className="bg-transparent text-primary border-1 border-primary hover:text-white hover:bg-primary hover:border-primary"
                endContent={<IoAdd size={20} />}
                onPress={() => dispatch(openModal("addAddressModal"))}
              >
                إضافة عنوان
              </Button>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
