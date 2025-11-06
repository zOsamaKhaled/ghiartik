import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";

import FAQ from "@/pages/faq";
import MyOrders from "@/pages/myOrders";
import About from "@/pages/about";
import VendorPage from "@/pages/vendor";
import SearchPage from "@/pages/search";
import NotFound from "./pages/not-found";
import Terms from "@/pages/terms";
import Contact from "./pages/contact";
import VendorChatPage from "./pages/vendor-chat-page";
import ProtectedRoute from "./pages/protected-route";
import Profile from "./pages/profile";
import BeVendor from "./pages/be-vendor";
import SavedCars from "./pages/saved-cars";
import SavedAddresses from "./pages/saved-addresses";
import Favorites from "./pages/favorites";
import Complaints from "./pages/complaints";
import MyInvoices from "./pages/my-invoices";
import PriceReq from "./pages/price-req";
import QuotesPage from "./pages/quotes";
import OrderDetails from "./pages/order-details";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route path="/vendors/:vendorId" element={<VendorPage />} />
      <Route
        path="/vendors/:vendorId/chat"
        element={
          <ProtectedRoute>
            <VendorChatPage />
          </ProtectedRoute>
        }
      />
      <Route element={<Terms />} path="/terms" />
      <Route element={<FAQ />} path="/faq" />
      <Route
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
        path="/myOrders"
      />
      <Route element={<About />} path="/about" />
      <Route element={<NotFound />} path="*" />
      <Route element={<SearchPage />} path="/search" />
      <Route element={<Contact />} path="/contact" />
      <Route
        element={
          <ProtectedRoute>
            <BeVendor />
          </ProtectedRoute>
        }
        path="/be-vendor"
      />
      <Route
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
        path="/profile"
      />
      <Route
        element={
          <ProtectedRoute>
            <SavedCars />
          </ProtectedRoute>
        }
        path="/saved-cars"
      />
      <Route
        element={
          <ProtectedRoute>
            <SavedAddresses />
          </ProtectedRoute>
        }
        path="/saved-addresses"
      />
      <Route
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
        path="/favorites"
      />
      <Route
        element={
          <ProtectedRoute>
            <Complaints />
          </ProtectedRoute>
        }
        path="/complaints"
      />
      <Route
        element={
          <ProtectedRoute>
            <MyInvoices />
          </ProtectedRoute>
        }
        path="/my-invoices"
      />
      <Route
        element={
          <ProtectedRoute>
            <PriceReq />
          </ProtectedRoute>
        }
        path="/price-request"
      />
      <Route
        element={
          <ProtectedRoute>
            <QuotesPage />
          </ProtectedRoute>
        }
        path="/myOrders/:orderNumber/quotes"
      />
      <Route
        element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }
        path="/myOrders/:orderNumber/order-details"
      />
    </Routes>
  );
}

export default App;
