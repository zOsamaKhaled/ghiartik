import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
// import { link as linkStyles } from "@heroui/theme";
// import clsx from "clsx";

import { siteConfig } from "@/config/site.tsx";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  SearchIcon,
  PriceRequestIcon,
  UserIcon,
  PhoneIcon,
  EmailIcon,
} from "@/components/icons";
import WebsiteLogo from "../assets/logo-green.svg";

import { useLocation, useNavigate } from "react-router-dom";
import "./comps-style.css";

import { openModal } from "../features/mainModal/mainModalSlice";
import { useDispatch } from "react-redux";
import { Avatar, addToast } from "@heroui/react";

export const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return (
    <>
      <HeroUINavbar maxWidth="xl" position="sticky" className="bg-default-100 ">
        <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
          <NavbarItem className="flex ">
            <Button
              isExternal
              as={Link}
              className="hidden text-xs font-normal bg-transparent text-default-600 sm:flex"
              href="tel:+966000000000"
              startContent={<PhoneIcon className="w-5 text-xs text-primary" />}
              variant="flat"
            >
              +966000000000
            </Button>
            <Button
              isExternal
              as={Link}
              className="hidden text-xs font-normal bg-transparent text-default-600 sm:flex"
              href="mailto:info@gmial.com.sa"
              startContent={<EmailIcon className="w-5 text-xs text-primary" />}
              variant="flat"
            >
              info@gmail.com.sa
            </Button>
            {token ? (
              <Link href="/profile">
                <div className="flex items-center justify-start gap-2">
                  <Avatar
                    isBordered
                    src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                  />
                  <p className="text-sm">أسامة خالد</p>
                </div>
              </Link>
            ) : (
              <Button
                isExternal
                as={Link}
                className="text-xs font-normal bg-transparent text-default-600"
                startContent={<UserIcon className="w-5 text-xs text-primary" />}
                variant="flat"
                onPress={() => dispatch(openModal("login"))}
              >
                تسجيل الدخول
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
      </HeroUINavbar>
      <HeroUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarMenuToggle className="hidden cursor-pointer sm:flex"></NavbarMenuToggle>
          <NavbarBrand className="gap-3 max-w-fit">
            <Link
              className="flex items-center justify-start gap-1"
              color="foreground"
              href="/"
            >
              <img src={WebsiteLogo} alt="logo" className="h-12" />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <div className="justify-start hidden gap-4 ml-2 md:flex">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <Link
                  className={
                    location.pathname === item.href ? "menu-active" : ""
                  }
                  color="foreground"
                  href={item.href}
                  onClick={
                    !token && item.href == "/myOrders"
                      ? () => {
                          addToast({
                            title: "يجب تسجيل الدخول لمتابعة طلباتك",
                            color: "danger",
                            timeout: 3000,
                            shouldShowTimeoutProgress: true,
                          });
                          dispatch(openModal("login"));
                        }
                      : () => {}
                  }
                >
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
          </div>
          <NavbarItem className="hidden gap-2 sm:flex">
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem className="hidden md:flex">
            <Link
              href="/search"
              className="p-2 transition duration-500 ease-in-out bg-transparent border-2 rounded-xl border-primary text-primary active:text-white hover:text-white hover:bg-primary active:bg-primary"
            >
              <SearchIcon className="w-6 text-lg " />
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden md:flex">
            <Button
              isExternal
              as={Link}
              className="text-sm font-normal text-default-600 bg-default-100"
              endContent={<PriceRequestIcon className="text-primary" />}
              variant="flat"
              onPress={
                token
                  ? () => navigate("/price-request")
                  : () => {
                      addToast({
                        title: "يجب تسجيل الدخول لعمل طلب سعر",
                        color: "danger",
                        timeout: 3000,
                        shouldShowTimeoutProgress: true,
                      });
                      dispatch(openModal("login"));
                    }
              }
            >
              طلب تسعير
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="pl-4 sm:hidden basis-1" justify="end">
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu dir="rtl">
          <div className="flex flex-col gap-4 mx-4 mt-18">
            {siteConfig.sideMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  href={item.href}
                  size="lg"
                  color="foreground"
                  className={`${location.pathname === item.href ? "menu-active" : ""} hover:text-primary transition duration-500 ease-in-out`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-xl">{item.icon}</p>
                    {item.label}
                  </div>
                </Link>
              </NavbarMenuItem>
            ))}

            <Link
              className="flex gap-2 text-lg transition duration-500 ease-in-out cursor-pointer text-black/80 hover:text-primary"
              onClick={
                token
                  ? () => navigate("/price-request")
                  : () => {
                      addToast({
                        title: "يجب تسجيل الدخول لعمل طلب سعر",
                        color: "danger",
                        timeout: 3000,
                        shouldShowTimeoutProgress: true,
                      });
                      dispatch(openModal("login"));
                    }
              }
            >
              <PriceRequestIcon size={20} />
              طلب تسعير
            </Link>
            <Link
              href="/search"
              className="p-2 transition duration-500 ease-in-out bg-transparent border-2 w-max rounded-xl border-primary text-primary active:text-white hover:text-white hover:bg-primary active:bg-primary"
            >
              <SearchIcon className="w-6 text-lg " />
            </Link>
          </div>
        </NavbarMenu>
      </HeroUINavbar>
    </>
  );
};
