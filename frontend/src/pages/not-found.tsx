import { Link } from "react-router-dom";
import DefaultLayout from "@/layouts/default";

export default function NotFound() {
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
        <p className="mb-8 text-2xl text-gray-600">الصفحة غير موجودة</p>
        <Link
          to="/"
          className="px-6 py-3 text-white transition border rounded bg-primary hover:bg-white hover:text-primary border-primary hover:border-primary"
        >
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    </DefaultLayout>
  );
}
