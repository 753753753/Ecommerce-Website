import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../../context/myContext';
import { addToCart, deleteFromCart } from '../../../redux/cartSlice';
import { useSelectedData } from '../Contextapi/Context';

const CategoryProduct = () => {
    const { selectedData } = useSelectedData();
    const { getproduct } = useData();
    const filteredProducts = getproduct.filter(product => product.category === selectedData);
    
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Add to cart function with user check
    let user = null;
    try {
        const userData = localStorage.getItem('users');
        user = userData ? JSON.parse(userData) : null;
      } catch (e) {
        console.error("Error parsing user data from localStorage", e);
      }

    const addCart = (item) => {
        console.log(user)
        if (user) {
            dispatch(addToCart(item));
            toast.success("Added to cart");
        } else {
            toast.error("Please log in to add items to your cart");
            navigate('/login');
        }
    };

    // Delete from cart function
    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from cart");
    };

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);
    
      
    return (
        <div className="container mx-auto p-4">
            <div className='text-black font-sans font-bold text-xl mx-10 my-3'>
                <h1>Recommended For You</h1>
            </div>
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.slice(0, 8).map((product) => (
                        <Product 
                            key={product.id} 
                            {...product} 
                            addCart={addCart} 
                            cartItems={cartItems} 
                            deleteCart={deleteCart} 
                        />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center">
                    <img className="mb-2" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="No Products" />
                </div>
            )}
            <Link 
                to={`/products/${selectedData}`} 
                className='w-[12rem] h-[2.4rem] bg-secondary mx-auto flex justify-center text-center items-center mt-12 hover:bg-red-400 text-white'>
                View All Products
            </Link>
        </div>
    );
};

const Product = ({ id, title, price, productImageUrl, addCart, cartItems, deleteCart, category, quantity }) => {
    const { handleClick, clickedIds } = useSelectedData();
    const navigate = useNavigate();

    const isProductClicked = clickedIds.includes(id);

    // Toggle wishlist functionality with user check
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
            toast.success(isProductClicked ? "Removed from wishlist" : "Added to wishlist");
        } else {
            toast.error("Please log in to manage your wishlist");
            navigate('/login');
        }
    };

    return (
        <div>
            <Link to={`/productdetail/${id}`} className="product-link">
                <div>
                    <div className="relative bg-gray-50 p-4 shadow-md rounded-md mt-8 h-[15rem] hover:bg-gray-100">
                        <div className="absolute top-4 right-4">
                            <CiHeart
                                className={`w-10 h-10 border-2 rounded-full p-2 cursor-pointer bg-${isProductClicked ? 'secondary' : 'gray'} text-${isProductClicked ? 'white' : 'black'}`}
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
                </div>
            </Link>
            {cartItems.some((p) => p.id === id) ? (
                <button
                    onClick={() => deleteCart({ id, title, price, productImageUrl, category, quantity })}
                    className="bg-secondary hover:bg-red-700 text-white font-bold py-1 px-4 rounded mt-2"
                >
                    Delete from Cart
                </button>
            ) : (
                <button
                    onClick={() => addCart({ id, title, price, productImageUrl, category, quantity })}
                    className="bg-secondary hover:bg-red-700 text-white font-bold py-1 px-4 rounded mt-2"
                >
                    Add to Cart
                </button>
            )}
        </div>
    );
};

export default CategoryProduct;
