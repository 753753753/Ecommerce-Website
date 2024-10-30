import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CiHeart } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../../context/myContext';
import { fireDB } from '../../../firebase/FirebaseConfig';
import { addToCart, deleteFromCart } from '../../../redux/cartSlice';
import { useSelectedData } from '../Contextapi/Context';
import Loader from '../loader/Loader';

function Productdetail() {
    const { id } = useParams();
    const { loading, setloading } = useData();
    const [product, setproduct] = useState('');
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const getproductdata = async () => {
        setloading(true);
        try {
            const producttemp = await getDoc(doc(fireDB, "products", id));
            setproduct({ ...producttemp.data(), id: producttemp.id });
        } catch (error) {
            console.log(error);
            toast.error("Failed to load product details. Please try again later.");
        } finally {
            setloading(false);
        }
    };
    let user = null;

    try {
      const userData = localStorage.getItem('users');
      user = userData ? JSON.parse(userData) : null;
    } catch (e) {
      console.error("Error parsing user data from localStorage", e);
    }
    const addCart = (item) => {
        if (user) {
            dispatch(addToCart(item));
            toast.success("Added to cart");
        } else {
            toast.error("Please log in to add items to your cart");
            navigate('/login');
        }
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from cart");
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        getproductdata();
    }, []);

    const [activeImg, setActiveImage] = useState('');
    const [amount, setAmount] = useState(1);

    const { handleClick, clickedIds } = useSelectedData();
    const isProductClicked = clickedIds.includes(product?.id);

    try {
      const userData = localStorage.getItem('users');
      user = userData ? JSON.parse(userData) : null;
    } catch (e) {
      console.error("Error parsing user data from localStorage", e);
    }
    const toggleWishlist = () => {
        if (user) {
            handleClick(product.id);
            toast.success(isProductClicked ? "Removed from wishlist" : "Added to wishlist");
        } else {
            toast.error("Please log in to manage your wishlist");
            navigate('/login');
        }
    };

    // Collect images in an array
    const imageUrls = [
        product?.productImageUrl1,
        product?.productImageUrl2,
        product?.productImageUrl3,
        product?.productImageUrl4,
        product?.productImageUrl
    ].filter(Boolean);

    const mainImage = activeImg || imageUrls[0];

    return (
        <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
            {loading ? (
                <div className="flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
                    <div className="flex flex-col gap-6 lg:w-2/4 mx-8">
                        <img
                            src={mainImage}
                            alt={`${product?.title} - ${product?.description}`}
                            className="w-full h-full aspect-square rounded-xl"
                        />
                        <div className="flex flex-row justify-between h-24">
                            {imageUrls.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt=""
                                    className="w-24 h-24 rounded-md cursor-pointer"
                                    onClick={() => setActiveImage(image)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 lg:w-2/4 md:text-sm p-3 text-[12px]">
                        <div>
                            <span className="text-pink-600 font-semibold">{product?.category}</span>
                            <h1 className="text-3xl font-bold">{product?.title}</h1>
                        </div>
                        <p className="text-gray-700">{product?.description}</p>
                        <h6 className="text-2xl font-semibold">₹ {product?.price}</h6>
                        <div className="flex flex-row items-center gap-12">
                            {cartItems.some((p) => p.id === product.id) ? (
                                <button
                                    className="bg-pink-600 text-white font-semibold py-3 px-16 rounded-xl h-full"
                                    onClick={() => deleteCart(product)}
                                >
                                    Delete from cart
                                </button>
                            ) : (
                                <button
                                    className="bg-secondary text-white font-semibold py-3 px-16 rounded-xl h-full"
                                    onClick={() => addCart(product)}
                                >
                                    Add to Cart
                                </button>
                            )}
                            <CiHeart
                                className={`w-10 h-10 border-2 bg-${isProductClicked ? 'secondary' : 'gray'} rounded-full p-2 hover:bg-secondary cursor-pointer text-${isProductClicked ? 'white' : 'black'}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleWishlist();
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Productdetail;
