import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom"; //this is for the routing add the links for the menulist options
import ContactUsPage from "../pages/ContactUsPage/ContactUsPage";
import HomePage from "../pages/HomePage/HomePage";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import ProductDetails from "../pages/Products/ProductDetails/ProductDetails";
import Products from "../pages/Products/Products";
//Lazy loading importing the components
const AboutPage = React.lazy(() => import("../pages/AboutPage/AboutPage"));

const appRoutes = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="spinner-border text-primary text center"></div>
        }
      >
        <Routes>
          {/*URL configuration*/}
          <Route path="/" element={<HomePage />} />
          {/* Nested routing */}
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/product-details/:productId"
            element={<ProductDetails />}
          />
          {/* Lazy loading with the help of suspense here */}
          <Route path="/aboutus/content" element={<AboutPage />} />
          <Route path="/contactus/content" element={<ContactUsPage />} />
          {/* page not found routing */}
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default appRoutes;
