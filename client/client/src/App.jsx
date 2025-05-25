import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ResetPassword from "./auth/ResetPassword";
import ForgetPassword from "./auth/ForgetPassword";
import VerifyEmail from "./auth/VerifyEmail";

import MainLayOut from "./layout/MainLayOut";
import HeroSection from "./components/ui/HeroSection";
import FilterPage from "./components/ui/FilterPage";
import RestaurantDetails from "./components/ui/RestaurantDetails";
import Profile from "./components/ui/Profile";
import SearchPage from "./components/ui/SearchPage";
import Cart from "./components/ui/Cart";
import Restaurant from "./admin/Restaurant";
import AddMenu from "./admin/AddMenu";
import Orders from "./admin/Orders";
import Success from "./components/ui/Success";
import Preloader from "./components/ui/Preloader"; // ✅ Import Preloader

import { useUserStore } from "./store/useUserStore";
import { useThemeStore } from "./store/useThemeStore";
import ShowPage from "./components/ui/ShowPage";

// ✅ Protected route checks
const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to={"/logout-page"} replace />;
  }
  if (!user?.isverified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const AuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isverified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to={"/logout-page"} replace />;
  }
  if (!user?.admin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const location = useLocation();
  const { checkAuthentication, isCheckingAuth, isAuthenticated, user } = useUserStore();
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    checkAuthentication();
    initializeTheme();
  }, [checkAuthentication]);

  // ✅ Preloader shows once after first verified login
  useEffect(() => {
    if (isAuthenticated && user?.isverified) {
      const hasLoggedIn = localStorage.getItem("hasLoggedInOnce");
      if (!hasLoggedIn) {
        setShowPreloader(true);
        localStorage.setItem("hasLoggedInOnce", "true");
        const timer = setTimeout(() => setShowPreloader(false), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated, user]);

  if (isCheckingAuth || showPreloader) {
    return <Preloader />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <MainLayOut />
            </ProtectedRoutes>
          }
        >
          <Route index element={<HeroSection />} />
          <Route path="/filter" element={<FilterPage />} />
          <Route path="/restaurant-details/:id" element={<RestaurantDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search/:text" element={<SearchPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order/status" element={<Success />} />
          <Route path="/admin/restaurant" element={<AdminRoute><Restaurant /></AdminRoute>} />
          <Route path="/admin/menu" element={<AdminRoute><AddMenu /></AdminRoute>} />
          <Route path="/admin/orders" element={<AdminRoute><Orders /></AdminRoute>} />
        </Route>

        <Route
          path="/login"
          element={
            <AuthenticatedUser>
              <Login />
            </AuthenticatedUser>
          }
        />
        <Route
        path="logout-page" element={
          
            <ShowPage></ShowPage>
          
        }/>
        <Route
          path="/signup"
          element={
            <AuthenticatedUser>
              <Signup />
            </AuthenticatedUser>
          }
        />
        <Route
          path="/forget-password"
          element={
            <AuthenticatedUser>
              <ForgetPassword />
            </AuthenticatedUser>
          }
        />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
