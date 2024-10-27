import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../../context/myContext';
import { addToCart, deleteFromCart } from '../../../redux/cartSlice';
import { useSelectedData } from '../Contextapi/Context';
import Loader from '../loader/Loader';

function Allproduct() {
  const navigate = useNavigate();
  const { loading, getproduct } = useData();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  let user = null;
  try {
    const userData = localStorage.getItem('users');
    user = userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.error("Error parsing user data from localStorage", e);
  }

  const handleAddToCart = (item) => {
    console.log(user)
    if (user) {
      dispatch(addToCart(item));
      toast.success("Added to cart");
    } else {
      toast.error("Please log in to add items to your cart");
      navigate('/login');
    }
  };

  const handleDeleteFromCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart");
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="container mx-auto p-4">
      <div className="text w-[629px] h-[108px] gap-20 pl-[5.3rem] mt-10 flex space-x-14">
        <div>
          <div className="flex space-x-2">
            <div className="w-2 h-8 bg-secondary rounded-md md:w-3"></div>
            <div className="font-poppins text-base font-semibold leading-5 pt-2 md:pt-0 text-secondary md:text-xl">
              Our Products
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        {loading && <Loader />}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {getproduct.slice(0, 8).map((product) => (
          <Product
            key={product.id}
            {...product}
            handleAddToCart={handleAddToCart}
            cartItems={cartItems}
            handleDeleteFromCart={handleDeleteFromCart}
          />
        ))}
      </div>
      <Link to="/allproduct">
        <button className='w-[12rem] h-[2.4rem] bg-secondary mx-auto flex justify-center text-center items-center mt-12 hover:bg-red-400 text-white'>View All Products</button>
      </Link>
    </div>
  );
};

const Product = ({ id, title, price, productImageUrl, handleAddToCart, cartItems, handleDeleteFromCart, category, quantity }) => {
  const { handleClick, clickedIds } = useSelectedData();
  const navigate = useNavigate();

  const isProductInWishlist = clickedIds.includes(id);
  const isProductInCart = cartItems.some((p) => p.id === id);
  let user = null;
  try {
      const userData = localStorage.getItem('users');
      user = userData ? JSON.parse(userData) : null;
    } catch (e) {
      console.error("Error parsing user data from localStorage", e);
    }
  const toggleWishlist = () => {
    if (user) {
      handleClick(id);
      toast.success(isProductInWishlist ? "Removed from wishlist" : "Added to wishlist");
    } else {
      toast.error("Please log in to manage your wishlist");
      navigate('/login');
    }
  };

  return (
    <div>
      <Link to={`/productdetail/${id}`} className="product-link">
        <div className="relative bg-gray-50 p-4 shadow-md rounded-md mt-8 h-[15rem] hover:bg-gray-100">
          <div className="absolute top-4 right-4">
            <CiHeart
              className={`w-10 h-10 border-2 rounded-full p-2 hover:bg-secondary cursor-pointer bg-${isProductInWishlist ? "secondary" : "gray"} text-${isProductInWishlist ? "white" : "black"}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist();
              }}
            />
          </div>
          <div className="flex items-center justify-center">
            <img src={productImageUrl} alt={title} className="h-32 object-cover rounded-md mt-[3rem]" />
          </div>
        </div>
        <div className='pl-[4px] mt-4'>
          <h3 className="font-poppins text-base font-medium leading-6">{title}</h3>
          <p className="font-poppins text-base font-medium leading-6 text-secondary">Price: ₹ {price}</p>
        </div>
      </Link>
      {isProductInCart ? (
        <button
          onClick={() => handleDeleteFromCart({ id, title, price, productImageUrl, category, quantity })}
          className="bg-secondary hover:bg-red-700 text-white font-bold py-1 px-4 rounded mt-2"
        >
          Remove from Cart
        </button>
      ) : (
        <button
          onClick={() => handleAddToCart({ id, title, price, productImageUrl, category, quantity })}
          className="bg-secondary hover:bg-red-700 text-white font-bold py-1 px-4 rounded mt-2"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default Allproduct;
