import { Route, Routes } from "react-router-dom";
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

const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <ErrorBoundary>
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

            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<Listing />} />
              <Route path="/listings/:id" element={<Details />} />
              <Route path="/ads" element={<Ads />} />
              <Route path="/ads/post" element={<PostAds />} />
              <Route path="/ads/edit-advert/:id" element={<PostAds />} />
              <Route path="/faqs" element={<FAQS />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/wishlist" element={<WishLists />} />
              <Route path="/chat/:1d" element={<Messaging />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default AppRouter;
