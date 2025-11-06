import DefaultLayout from "@/layouts/default";
import Slider from "@/components/slider";

import VendorCards from "@/components/vendorCards";
export default function IndexPage() {
  return (
    <DefaultLayout>
      <Slider />
      <VendorCards />
    </DefaultLayout>
  );
}
