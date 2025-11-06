import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { closeModal } from "../../features/mainModal/mainModalSlice";
import { Input, Select, SelectItem, Button } from "@heroui/react";
import { car_data } from "@/config/car_data";
import { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  addCarToSavedList,
  editCarFromSavedList,
} from "@/features/savedCars/savedCarsSlice";

interface Car {
  id: string;
  brand: string;
  model: string;
  year: string;
  VIN?: string;
  VRN?: string;
  image?: string;
}

interface CarModalProps {
  mode: "add" | "edit"; // 👈 يحدد نوع العملية
  carId?: string | null; // 👈 لو تعديل نمرر id
}

export default function CarModal({ mode, carId }: CarModalProps) {
  const dispatch = useDispatch();
  const savedCars = useSelector((state: RootState) => state.savedCars.cars);

  // السيارة المطلوب تعديلها (إن وجدت)
  const carToEdit = carId ? savedCars.find((c) => c.id === carId) : null;

  const [carData, setCarData] = useState<Car>({
    id: "",
    brand: "",
    model: "",
    year: "",
    VIN: "",
    VRN: "",
    image: "",
  });

  const [fileName, setFileName] = useState("لم يتم اختيار ملف");

  // في حالة التعديل: تعبئة البيانات القديمة
  useEffect(() => {
    if (mode === "edit" && carToEdit) {
      setCarData({
        id: carToEdit.id,
        brand: carToEdit.brand || "",
        model: carToEdit.model || "",
        year: carToEdit.year || "",
        VIN: carToEdit.VIN || "",
        VRN: carToEdit.VRN || "",
        image: carToEdit.image || "",
      });
      setFileName(
        carToEdit.image ? "تم تحميل صورة مسبقًا" : "لم يتم اختيار ملف"
      );
    } else {
      // حالة الإضافة
      setCarData({
        id: "",
        brand: "",
        model: "",
        year: "",
        VIN: "",
        VRN: "",
        image: "",
      });
      setFileName("لم يتم اختيار ملف");
    }
  }, [mode, carToEdit]);

  const selectedCar = car_data.find((car) => car.brand === carData.brand);
  const models = selectedCar ? selectedCar.models : [];

  const handleSave = () => {
    if (!carData.brand || !carData.model || !carData.year) {
      alert("من فضلك أكمل البيانات الأساسية");
      return;
    }

    if (mode === "add") {
      const id =
        typeof crypto !== "undefined" && (crypto as any).randomUUID
          ? (crypto as any).randomUUID()
          : Date.now().toString() + Math.random().toString(36).slice(2);

      const newCar = { ...carData, id };
      dispatch(addCarToSavedList(newCar));
    } else if (mode === "edit" && carId) {
      dispatch(editCarFromSavedList({ id: carId, updatedCar: carData }));
    }

    dispatch(closeModal());
  };

  return (
    <div className="relative">
      <h2 className="text-xl font-medium">
        {mode === "add" ? "إضافة سيارة جديدة" : "تعديل بيانات السيارة"}
      </h2>

      <div className="flex flex-col gap-4 mt-6">
        {/* النوع والموديل */}
        <div className="flex gap-4 ">
          <Select
            className="w-full"
            label="نوع السيارة"
            labelPlacement={"outside"}
            selectedKeys={[carData.brand]}
            classNames={{ label: "font-medium" }}
            placeholder="مثال: تويوتا"
            onChange={(e) => {
              setCarData({ ...carData, brand: e.target.value, model: "" });
            }}
          >
            {car_data.map((car) => (
              <SelectItem
                key={car.brand}
                dir="rtl"
                startContent={<img src={car.logo} className="w-5" />}
              >
                {car.brand}
              </SelectItem>
            ))}
          </Select>

          <Select
            className="w-full"
            label="موديل السيارة"
            labelPlacement={"outside"}
            selectedKeys={[carData.model]}
            classNames={{ label: "font-medium" }}
            placeholder="مثال: كامري"
            onChange={(e) => {
              setCarData({ ...carData, model: e.target.value });
            }}
            isDisabled={!carData.brand}
          >
            {models.map((model) => (
              <SelectItem key={model} dir="rtl">
                {model}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* باقي الحقول */}
        <Input
          type="string"
          placeholder="مثال : 2020"
          label="سنة الصنع"
          labelPlacement="outside"
          classNames={{ label: "font-medium" }}
          value={carData.year}
          onChange={(e) => setCarData({ ...carData, year: e.target.value })}
        />

        <Input
          type="string"
          placeholder="مثال : WSA18754df1610"
          label="رقم الهيكل (إختياري)"
          labelPlacement="outside"
          classNames={{ label: "font-medium" }}
          value={carData.VIN}
          onChange={(e) => setCarData({ ...carData, VIN: e.target.value })}
        />

        <Input
          type="string"
          placeholder="مثال : WSA18754df1610"
          label="رقم الإستمارة / الرقم التسلسلي (إختياري)"
          labelPlacement="outside"
          classNames={{ label: "font-medium" }}
          value={carData.VRN}
          onChange={(e) => setCarData({ ...carData, VRN: e.target.value })}
        />

        {/* الصورة */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">صورة السيارة (اختياري)</label>
          <div className="flex flex-col justify-start gap-3">
            <input
              id="carImage"
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setFileName(file ? file.name : "لم يتم اختيار ملف");
                setCarData({
                  ...carData,
                  image: file ? URL.createObjectURL(file) : carData.image,
                });
              }}
            />
            <Button
              as="label"
              htmlFor="carImage"
              variant="flat"
              className="w-full text-right! bg-transparent border-dashed border-1 border-primary text-primary cursor-pointer hover:bg-primary hover:border-white hover:text-white"
            >
              اضغط {mode === "edit" ? "لتغيير" : "لرفع"} الصورة
            </Button>
            <span className="text-sm text-gray-500">
              {"الصورة الحالية: " + fileName}
            </span>
          </div>
        </div>
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
          onPress={() => dispatch(closeModal())}
        >
          إلغاء
        </Button>
      </div>

      <RxCross1
        className="absolute top-[-20px] left-[-20px] p-1 text-xl text-white rounded-full cursor-pointer border-1 bg-primary border-primary hover:bg-white hover:text-primary"
        onClick={() => dispatch(closeModal())}
      />
    </div>
  );
}
