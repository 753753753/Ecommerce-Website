// main.jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import AddProductPage from './Component/Home/Admin/AddProductPage';
import Admindashboard from './Component/Home/Admin/Admindashboard';
import UpdateProductPage from './Component/Home/Admin/UpdateProductPage';
import AllProductsByCategory from './Component/Home/AllCategory/AllProductsByCategory';
import CategoryPage from './Component/Home/CategoryProduct/CategoryPage';
import { SelectedDataProvider } from './Component/Home/Contextapi/Context';
import Home from './Component/Home/Home/Home';
import Product from './Component/Home/Home/Product';
import Productdetail from './Component/Home/Home/Productdetail';
import Userdashboard from './Component/Home/User/Userdashboard';
import Wishlist from './Component/Home/Wishlist/Wishlist';
import CartPage from './Component/Home/cart/CartPage';
import Login from './Component/Home/register/Login';
import Signup from './Component/Home/register/Signup';
import Layout from './Layout/Layout';
import WelcomeAnimation from './WelcomeAnimation'; // Import the welcome animation component
import { MyContextDataProvider } from './context/myContext';
import './index.css';
import { ProtectedRouteForAdmin } from './protectedRoute/ProtectedRouteForAdmin';
import { ProtectedRouteForUser } from './protectedRoute/ProtectedRouteForUser';
import { store } from "./redux/store";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='/wishlist' element={<Wishlist />} />
      <Route path='Productdetail/:id' element={<Productdetail />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path="/products/:category" element={<AllProductsByCategory />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />}></Route>
      <Route path='/category' element={<CategoryPage />}></Route>
      <Route path='/allproduct' element = {<Product></Product>}></Route>
      <Route path = "/categorypage" element = {<CategoryPage></CategoryPage>}></Route>
      <Route path='/userdashboard' element={
        <ProtectedRouteForUser>
          <Userdashboard />
        </ProtectedRouteForUser>
      }>
      </Route>

      <Route path='/admindashboard' element={
        <ProtectedRouteForAdmin>
          <Admindashboard />
        </ProtectedRouteForAdmin>
      }>
      </Route>

      <Route path='/addproduct' element={
        <ProtectedRouteForAdmin>
          <AddProductPage />
        </ProtectedRouteForAdmin>
      }>
      </Route>

      <Route path='/updateproduct/:id' element={
        <ProtectedRouteForAdmin>
          <UpdateProductPage />
        </ProtectedRouteForAdmin>
      }>
      </Route>

    </Route>
  )
);

const App = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  const handleAnimationEnd = () => setShowAnimation(false);

  return (
    <>
      {showAnimation ? (
        <WelcomeAnimation onAnimationEnd={handleAnimationEnd} />
      ) : (
        <Provider store={store}>
          <MyContextDataProvider>
            <SelectedDataProvider>
              <RouterProvider router={router} />
            </SelectedDataProvider>
          </MyContextDataProvider>
          <Toaster />
        </Provider>
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
