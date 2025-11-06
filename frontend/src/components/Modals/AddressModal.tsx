import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { closeModal } from "../../features/mainModal/mainModalSlice";
import { Input, Select, SelectItem, Button } from "@heroui/react";
import { addresses_data } from "@/config/addresses_data";
import { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  addAddressToSavedList,
  editAddressFromSavedList,
} from "@/features/savedAddresses/savedAddressesSlice";

interface Address {
  id: string;
  region: string;
  city: string;
  district: string;
  details: string;
  map: string;
}

interface AddressModalProps {
  mode: "add" | "edit"; // 👈 يحدد نوع العملية
  addressId?: string | null; // 👈 لو تعديل نمرر id
}

export default function AddressModal({ mode, addressId }: AddressModalProps) {
  const dispatch = useDispatch();
  const savedAddresses = useSelector(
    (state: RootState) => state.savedAddresses.addresses
  );

  // العنوان المطلوب تعديلها (إن وجدت)
  const addressToEdit = addressId
    ? savedAddresses.find((a) => a.id === addressId)
    : null;

  const [addressData, setAddressData] = useState<Address>({
    id: "",
    region: "",
    city: "",
    district: "",
    details: "",
    map: "",
  });

  // في حالة التعديل: تعبئة البيانات القديمة
  useEffect(() => {
    if (mode === "edit" && addressToEdit) {
      setAddressData({
        id: addressToEdit.id,
        region: addressToEdit.region || "",
        city: addressToEdit.city || "",
        district: addressToEdit.district || "",
        details: addressToEdit.details || "",
        map: addressToEdit.map || "",
      });
    } else {
      // حالة الإضافة
      setAddressData({
        id: "",
        region: "",
        city: "",
        district: "",
        details: "",
        map: "",
      });
    }
  }, [mode, addressToEdit]);

  const selectedAddress = addresses_data.find(
    (a) => a.region === addressData.region
  );
  const cities = selectedAddress ? selectedAddress.cities : [];

  const handleSave = () => {
    if (!addressData.region || !addressData.city || !addressData.district) {
      alert("من فضلك أكمل البيانات الأساسية");
      return;
    }

    if (mode === "add") {
      const id =
        typeof crypto !== "undefined" && (crypto as any).randomUUID
          ? (crypto as any).randomUUID()
          : Date.now().toString() + Math.random().toString(36).slice(2);

      const newAddress = { ...addressData, id };
      dispatch(addAddressToSavedList(newAddress));
    } else if (mode === "edit" && addressId) {
      dispatch(
        editAddressFromSavedList({ id: addressId, updatedAddress: addressData })
      );
    }

    // cleanup any temporary edit id stored in localStorage
    if (typeof window !== "undefined") localStorage.removeItem("editAddressId");
    dispatch(closeModal());
  };

  return (
    <div className="relative">
      <h2 className="text-xl font-medium">
        {mode === "add" ? "إضافة عنوان جديد" : "تعديل العنوان"}
      </h2>

      <div className="flex flex-col gap-4 mt-6">
        {/*المنطقة والمدينة */}
        <div className="flex gap-4 ">
          <Select
            className="w-full"
            label="المنطقة"
            labelPlacement={"outside"}
            selectedKeys={[addressData.region]}
            classNames={{ label: "font-medium" }}
            placeholder="اختر المنطقة"
            onChange={(e) => {
              setAddressData({
                ...addressData,
                region: e.target.value,
                city: "",
              });
            }}
          >
            {addresses_data.map((a) => (
              <SelectItem key={a.region} dir="rtl">
                {a.region}
              </SelectItem>
            ))}
          </Select>

          <Select
            className="w-full"
            label="المدينة"
            labelPlacement={"outside"}
            selectedKeys={[addressData.city]}
            classNames={{ label: "font-medium" }}
            placeholder="اختر المدينة"
            onChange={(e) => {
              setAddressData({ ...addressData, city: e.target.value });
            }}
            isDisabled={!addressData.region}
          >
            {cities.map((city) => (
              <SelectItem key={city} dir="rtl">
                {city}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* باقي الحقول */}
        <Input
          type="string"
          placeholder="مثال : حي الرمال"
          label="اسم الحي"
          labelPlacement="outside"
          classNames={{ label: "font-medium" }}
          value={addressData.district}
          onChange={(e) =>
            setAddressData({ ...addressData, district: e.target.value })
          }
        />

        <Input
          type="string"
          placeholder="العنوان بالتفصيل"
          label="العنوان التفصيلي"
          labelPlacement="outside"
          classNames={{ label: "font-medium" }}
          value={addressData.details}
          onChange={(e) =>
            setAddressData({ ...addressData, details: e.target.value })
          }
        />

        <Input
          type="string"
          placeholder=""
          label="الموقع على الخريطة"
          labelPlacement="outside"
          classNames={{ label: "font-medium" }}
          value={addressData.map}
          onChange={(e) =>
            setAddressData({ ...addressData, map: e.target.value })
          }
        />
      </div>

      {/* الأزرار */}
      <div className="flex justify-end gap-4 mt-6">
        <Button
          className="px-20 text-white bg-primary hover:bg-transparent border-1 hover:text-primary hover:border-primary"
          onPress={handleSave}
        >
          {mode === "add" ? "حفظ" : "حفظ التعديل"}
        </Button>
        <Button
          className="bg-white text-primary border-1 hover:text-white hover:bg-primary"
          onPress={() => {
            if (typeof window !== "undefined")
              localStorage.removeItem("editAddressId");
            dispatch(closeModal());
          }}
        >
          إلغاء
        </Button>
      </div>

      <RxCross1
        className="absolute top-[-20px] left-[-20px] p-1 text-xl text-white rounded-full cursor-pointer border-1 bg-primary border-primary hover:bg-white hover:text-primary"
        onClick={() => {
          if (typeof window !== "undefined")
            localStorage.removeItem("editAddressId");
          dispatch(closeModal());
        }}
      />
    </div>
  );
}
