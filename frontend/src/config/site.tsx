import {
  CiUser,
  CiLocationOn,
  CiHeart,
  CiPhone,
  CiFileOn,
  CiChat1,
  CiStar,
  CiCircleQuestion,
  CiReceipt,
  CiCircleAlert,
} from "react-icons/ci";

import { LiaCarSideSolid } from "react-icons/lia";

export const siteConfig = {
  name: "Ghiar-Tech",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "الرئيسية",
      href: "/",
    },
    {
      label: "حول المنصة",
      href: "/about",
    },
    {
      label: "طلباتي",
      href: "/myOrders",
    },
  ],
  footerItems: [
    {
      label: "حول المنصة",
      href: "/about",
    },
    {
      label: "الاسئلة الشائعة",
      href: "/faq",
    },
    {
      label: "الشروط والأحكام",
      href: "/terms",
    },
    {
      label: "اتصل بنا",
      href: "/contact",
    },
  ],
  navMenuItems: [
    {
      label: "الرئيسية",
      href: "/",
    },
    {
      label: "حول المنصة",
      href: "/about",
    },
    {
      label: "طلباتي",
      href: "/myOrders",
    },
    {
      label: "الاسئلة الشائعة",
      href: "/faq",
    },
    {
      label: "الشروط والأحكام",
      href: "/terms",
    },
    {
      label: "اتصل بنا",
      href: "/contact",
    },
  ],
  sideMenuItems: [
    {
      label: "حسابي",
      href: "/profile",
      icon: <CiUser />,
    },
    {
      label: "كن مقدم خدمة",
      href: "/be-vendor",
      icon: <CiStar />,
    },
    {
      label: "السيارات المحفوظة",
      href: "/saved-cars",
      icon: <LiaCarSideSolid />,
    },
    {
      label: "العنواين المحفوظة",
      href: "/saved-addresses",
      icon: <CiLocationOn />,
    },
    {
      label: "المفضلة",
      href: "/favorites",
      icon: <CiHeart />,
    },
    {
      label: "فواتيري",
      href: "/my-invoices",
      icon: <CiReceipt />,
    },
    {
      label: "الشكاوى",
      href: "/complaints",
      icon: <CiChat1 />,
    },
    {
      label: "تواصل معنا",
      href: "/contact",
      icon: <CiPhone />,
    },
    {
      label: "اسئلة متكررة",
      href: "/faq",
      icon: <CiCircleQuestion />,
    },
    {
      label: "حول المنصة",
      href: "/about",
      icon: <CiCircleAlert />,
    },
    {
      label: "الشروط والأحكام",
      href: "/terms",
      icon: <CiFileOn />,
    },
  ],

  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
