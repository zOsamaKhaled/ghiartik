import LoginModal from "./Auth/LoginModal";
import SignUpModal from "./Auth/SignUpModal";
import ForgotModal from "./Auth/ForgotModal";
import { closeModal, openModal } from "../features/mainModal/mainModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";

import { motion, AnimatePresence } from "framer-motion";
import AddressModal from "./Modals/AddressModal";
import CarModal from "./Modals/CarModal";
import InvoiceModal from "./Modals/InvoiceModal";
import SignOutModal from "./Auth/SignOutModal";
import PriceReqModal from "./Modals/PriceReqModal";
import ComplainModal from "./Modals/ComplainModal";
import PayModal from "./Modals/PayModal";
export default function MainModal() {
  const dispatch = useDispatch();
  const { isOpen, type } = useSelector((state: RootState) => state.mainModal);
  const editCarId =
    typeof window !== "undefined" ? localStorage.getItem("editCarId") : null;
  const editAddressId =
    typeof window !== "undefined"
      ? localStorage.getItem("editAddressId")
      : null;

  if (!isOpen) return null;

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // الكليك برا المودال
    if (e.target === e.currentTarget) {
      dispatch(closeModal());
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        onClick={handleOutsideClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {type === "login" && (
            <div className="bg-white p-8 rounded-2xl w-[400px]">
              <LoginModal
                onSwitch={() => dispatch(openModal("register"))}
                onForgot={() => dispatch(openModal("forgot"))}
              />
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {type === "register" && (
            <div className="bg-white p-8 rounded-2xl w-[400px]">
              <SignUpModal
                onSwitch={() => dispatch(openModal("login"))}
                onForgot={() => dispatch(openModal("forgot"))}
              />
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {type === "forgot" && (
            <div className="bg-white p-8 rounded-2xl w-[400px]">
              <ForgotModal onSwitch={() => dispatch(openModal("login"))} />
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {type === "addCarModal" && (
            <div className="bg-white p-8 rounded-2xl md:w-[750px] w-full">
              <CarModal mode="add" />
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {type === "editCarModal" && (
            <div className="bg-white p-8 rounded-2xl md:w-[750px] w-full">
              <CarModal mode="edit" carId={editCarId} />
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {type === "addAddressModal" && (
            <div className="bg-white p-8 rounded-2xl md:w-[750px] w-full">
              <AddressModal mode="add" />
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {type === "editAddressModal" && (
            <div className="bg-white p-8 rounded-2xl  md:w-[750px] w-full">
              <AddressModal mode="edit" addressId={editAddressId} />
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {type === "invoiceModal" && (
            <div className="bg-[#ebebeb] p-8 rounded-2xl md:w-[400px] w-full">
              <InvoiceModal />
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {type === "signOutModal" && (
            <div className="bg-[#ebebeb] p-8 rounded-2xl w-[400px]">
              <SignOutModal />
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {type === "priceReqModal" && (
            <div className="bg-[#ebebeb] p-8 rounded-2xl w-[400px]">
              <PriceReqModal />
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {type === "complainModal" && (
            <div className="bg-[#ebebeb] p-8 rounded-2xl w-[600px]">
              <ComplainModal />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {type === "payModal" && (
            <div className="bg-[#ebebeb] p-8 rounded-2xl w-[600px]">
              <PayModal />
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
