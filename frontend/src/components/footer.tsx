import { Link } from "react-router-dom";
import FooterLogo from "../assets/footer-logo.svg";
import WadyLogo from "../assets/wady-w-logo.svg";

import { useLocation } from "react-router-dom";
import { siteConfig } from "../config/site.tsx";
export default function Footer() {
  const location = useLocation();
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full bg-default-100">
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="flex flex-col items-center justify-between gap-8 footer max-w-7xl">
            <div className="footer-logo">
              <Link to="/">
                <img src={FooterLogo} alt="logo" className="w-32 md:w-45 " />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 md:gap-4 md:flex footer-links">
              {siteConfig.footerItems.map((item) => (
                <Link
                  key={item.href}
                  className={
                    location.pathname === item.href ? "menu-active" : ""
                  }
                  color="foreground"
                  to={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between w-full bg-primary">
        <div className="flex flex-col items-center justify-between w-full max-w-3xl gap-4 py-4 xl:w-7xl lg:w-4xl md:w-2xl md:flex-row lg:max-w-7xl md:py-4">
          <div className="text-white rights-text">
            جميع الحقوق محفوظة لدى متجر غيار تك © 2025
          </div>
          <div className="rights-logo ">
            <Link to="https://wady.sa">
              <img src={WadyLogo} alt="logo" className="w-20 md:w-25 " />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
