import { addToast } from "@heroui/toast";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
type ProtectedRouteProps = {
  children: ReactNode; // النوع اللي ممكن يكون JSX أو عناصر React
};
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");

  if (token) {
    return <>{children}</>;
  } else {
    useEffect(() => {
      if (!token) {
        addToast({
          title: "يجب تسجيل الدخول للذهاب إلى الصفحة المطلوبة",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      }
    }, [token]);
    return <Navigate to="/" />;
  }
}
