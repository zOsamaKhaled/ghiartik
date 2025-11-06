import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import AuthModal from "../components/MainModal";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen" dir="rtl">
      <Navbar />
      <main className="container flex-grow px-6 pt-16 mx-auto max-w-7xl">
        <AuthModal />
        {children}
      </main>
      <Footer />
    </div>
  );
}
