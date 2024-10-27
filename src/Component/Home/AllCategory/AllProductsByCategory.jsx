import React from 'react';
import toast from 'react-hot-toast';
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../../context/myContext';
import { addToCart, deleteFromCart } from '../../../redux/cartSlice';
import { useSelectedData } from '../Contextapi/Context';

function AllProductsByCategory() {
  const { category } = useParams();
  const { selectedData } = useSelectedData();
  const { getproduct } = useData();
  const filteredProducts = getproduct.filter(product => product.category === selectedData);

  return (
    <div className="container mx-auto p-4">
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <img className="mb-2" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="No products found" />
        </div>
      )}
    </div>
  );
}

const Product = ({ id, title, price, productImageUrl }) => {
  const { handleClick, clickedIds } = useSelectedData();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  let user = null;

  try {
    const userData = localStorage.getItem('users');
    user = userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.error("Error parsing user data from localStorage", e);
  }

  const isProductClicked = clickedIds.includes(id);
  const isProductInCart = cartItems.some((p) => p.id === id);

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart");
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please log in to add items to your cart");
      navigate('/login');
      return false; // Indicate that the user is not logged in
    }
    return true; // User is logged in
  };

  const toggleWishlist = () => {
    if (user) {
      handleClick(id);
      toast.success(isProductClicked ? "Removed from wishlist" : "Added to wishlist");
    } else {
      toast.error("Please log in to add items to your wishlist");
      navigate('/login');
    }
  };

  return (
    <div>
      <Link to={`/productdetail/${id}`} className="product-link">
        <div>
          <div className="relative p-4 shadow-md rounded-md mt-8 h-[15rem] hover:bg-gray-100">
            <div className="absolute top-4 right-4">
              <CiHeart
                className={`w-10 h-10 border-2 ${isProductClicked ? 'bg-secondary' : 'bg-gray'} rounded-full p-2 hover:bg-secondary cursor-pointer text-${isProductClicked ? 'white' : 'black'}`}
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
          <div className="pl-[4px] mt-4">
            <h3 className="font-poppins text-base font-medium leading-6">{title}</h3>
            <p className="font-poppins text-base font-medium leading-6 text-secondary">Price: ${price}</p>
          </div>
        </div>
      </Link>
      {isProductInCart ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            if (handleAddToCart()) { // Check if user is logged in
              deleteCart({ id, title, price, productImageUrl });
            }
          }}
          className="bg-secondary hover:bg-red-700 text-white font-bold py-1 px-4 rounded mt-2"
        >
          Remove from Cart
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            if (handleAddToCart()) { // Check if user is logged in
              addCart({ id, title, price, productImageUrl });
            }
          }}
          className="bg-secondary hover:bg-red-700 text-white font-bold py-1 px-4 rounded mt-2"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default AllProductsByCategory;
