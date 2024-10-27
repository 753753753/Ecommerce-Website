import React from 'react';
import toast from 'react-hot-toast';
import { CiHeart } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../../context/myContext';
import { addToCart, deleteFromCart } from '../../../redux/cartSlice';
import { useSelectedData } from '../Contextapi/Context';

const ProductCard = ({ product }) => {
  const { loading } = useData();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigation to login
  const { handleClick, clickedIds } = useSelectedData();
  const isProductLiked = clickedIds.includes(product.id);
  const isProductInCart = cartItems.some((item) => item.id === product.id);

  // Function to handle adding item to the cart
  const handleAddToCart = (item) => {
    if (user) {
      dispatch(addToCart(item));
      toast.success("Added to cart");
    } else {
      toast.error("Please log in to add items to your cart");
      navigate('/login'); // Redirect to login page if not logged in
    }
  };

  // Function to handle deleting item from the cart
  const handleDeleteFromCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart");
  };


  let user = null;

  try {
    const userData = localStorage.getItem('users');
    user = userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.error("Error parsing user data from localStorage", e);
  }

  // Function to handle clicking on the heart icon for wishlist
  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      handleClick(product.id); // Call the function to handle wishlist action
      toast.success(isProductLiked ? "Removed from wishlist" : "Added to wishlist");
    } else {
      toast.error("Please log in to manage your wishlist");
      navigate('/login'); // Redirect to login page if not logged in
    }
  };

  return (
    <div className="product-card">
      <Link to={`/productdetail/${product.id}`} className="product-link">
        <div className="relative bg-gray-50 p-4 shadow-md rounded-md mt-8 h-[15rem] hover:bg-gray-100">
          <div
            className="absolute top-4 right-4 cursor-pointer"
            onClick={handleHeartClick}
          >
            <CiHeart
              className={`w-10 h-10 border-2 rounded-full p-2 ${isProductLiked ? "bg-secondary text-white" : "bg-gray-200 text-black"}`}
            />
          </div>
          <div className="flex items-center justify-center">
            <img src={product.productImageUrl} alt={product.title} className="h-32 object-cover rounded-md mt-[3rem]" />
          </div>
        </div>
        <div className="pl-[4px] mt-4">
          <h3 className="font-poppins text-base font-medium leading-6">{product.title}</h3>
          <p className="font-poppins text-base font-medium leading-6 text-secondary">Price: ₹ {product.price}</p>
        </div>
      </Link>
      {isProductInCart ? (
        <button
          onClick={() => handleDeleteFromCart(product)}
          className="bg-secondary hover:bg-red-700 text-white font-bold py-1 px-4 rounded mt-2"
        >
          Remove from Cart
        </button>
      ) : (
        <button
          onClick={() => handleAddToCart(product)}
          className="bg-secondary hover:bg-red-700 text-white font-bold py-1 px-4 rounded mt-2"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
