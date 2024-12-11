import { Route, Routes, Outlet } from "react-router-dom";
import SignIn from "./app/(auth)/signin/page";
import SignUp from "./app/(auth)/signup/page";
import VerifyOTP from "./app/(auth)/verify/page";
import ForgotPassword from "./app/(auth)/forgot-password/page";
import ChangePassword from "./app/(auth)/change-password/page";
import SuccessPage from "./app/(auth)/change-password/success-page";

import LayoutProvider from "./providers/LayoutProvider";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

import ProtectedRoute from "./ProtectedRoute";
import AuthProtectedRoute from "./AuthProtectedRoute";
import ErrorBoundary from "./components/fallback/Error";
import NotFound from "./layouts/NotFound";
import ScrollToTop from "./layouts/ScrollToTop";

import Home from "./app/(home)/page";
import Listing from "./app/listing/page";
import Details from "./app/details/page";
import Ads from "./app/ads/page";
import FAQS from "./app/faqs/FAQs";
import Profile from "./app/settings/page";
import Reviews from "./app/review/page";
import WishLists from "./app/wishlists/page";
import PostAds from "./app/ads/PostAds";
import Messaging from "./app/messaging/page";
import PrivacyPolicy from "./app/policy/page";
import MyHotelListings from "./app/hotel/page";
import AddRoom from "./app/hotel/AddRoom";
import ManageHotel from "./app/hotel/ManageHotel";

const AppRouter = () => {
  return (
    <>
      <ErrorBoundary>
        <ScrollToTop />
        <Routes>
          <Route element={<LayoutProvider />}>
            <Route path="*" element={<NotFound />} />

            <Route
              element={
                <AuthProtectedRoute>
                  <AuthLayout />
                </AuthProtectedRoute>
              }
            >
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/recover-password" element={<ForgotPassword />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/change-password/success" element={<SuccessPage />} />
            </Route>

            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Home />} />

              <Route path="/listings">
                <Route index element={<Listing />} />
                <Route path=":id" element={<Details />} />
              </Route>

              <Route path="/hotels">
                {/* <Route index element={<HotelListings />} /> */}
                <Route path=":id" element={<Details />} />
              </Route>

              <Route path="/faqs" element={<FAQS />} />
              <Route path="/reviews/:id" element={<Reviews />} />
              <Route path="/policy" element={<PrivacyPolicy />} />

              <Route
                element={
                  <ProtectedRoute>
                    <Outlet />
                  </ProtectedRoute>
                }
              >
                <Route path="/my-ads">
                  <Route index element={<Ads />} />
                  <Route path="post" element={<PostAds />} />
                  <Route path="edit-advert/:id" element={<PostAds />} />
                </Route>

                <Route path="/my-hotels">
                  <Route index element={<MyHotelListings />} />
                  <Route path="post" element={<ManageHotel />} />
                  <Route path="edit-hotel/:id" element={<ManageHotel />} />
                  <Route path="add-room" element={<AddRoom />} />
                </Route>

                <Route path="/chats">
                  <Route index element={<Messaging />} />
                  <Route path=":id" element={<Messaging />} />
                </Route>

                <Route path="/wishlist" element={<WishLists />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default AppRouter;
