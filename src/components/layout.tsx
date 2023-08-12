import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimationRoutes, Box } from "zmp-ui";
import { Navigation } from "./navigation";
import HomePage from "pages/index";
import CategoryPage from "pages/category/category";
import CartPage from "pages/cart";
import GroupPage from "pages/group/group";
import ExpensePage from "pages/expense/expense";
import ProfilePage from "pages/profile/profile";
import SearchPage from "pages/search";
import { getSystemInfo } from "zmp-sdk";
import { ScrollRestoration } from "./scroll-restoration";
import CreateGroup from "pages/group/creategroup";
import NotificationPage from "pages/notification";
import ReportPage from "pages/report/report";

if (getSystemInfo().platform === "android") {
  const androidSafeTop = Math.round(
    (window as any).ZaloJavaScriptInterface.getStatusBarHeight() /
      window.devicePixelRatio
  );
  document.body.style.setProperty(
    "--zaui-safe-area-inset-top",
    `${androidSafeTop}px`
  );
}

export const Layout: FC = () => {
  return (
    <Box flex flexDirection="column" className="h-screen">
      <ScrollRestoration />
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/creategroup" element={<CreateGroup />}></Route>
          <Route path="/category" element={<CategoryPage />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/notification" element={<ExpensePage />}></Route>
          <Route path="/expense" element={<ExpensePage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/report" element={<ReportPage />}></Route>
        </Routes>
      </Box>
    </Box>
  );
};
