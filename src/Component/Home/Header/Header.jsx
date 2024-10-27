import React from 'react';
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useSelectedData } from '../Contextapi/Context';
import SearchBar from './SearchBar';

const Header = () => {
  const { clickedIds } = useSelectedData();
  console.log(clickedIds.length);

  let user;
  try {
    user = JSON.parse(localStorage.getItem('users'));
  } catch (e) {
    user = null;
  }

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('users');
    navigate('/login');
  };
  
  const cartItems = useSelector((state) => state.cart);

  // Function to handle wishlist and cart access
  const handleAuthNavigation = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate('/signup');
    }
  };

  return (
    <header className='border'>
      <nav className="bg-white-800 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex flex-col md:flex-col items-center justify-between lg:flex-row">
          {/* Logo */}
          <Link to="/" className="text-black text-[1.6rem] font-bold px-8">
            Snap<span className='text-secondary'>Market</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 static sm:text-[13px] md:text-[18px] md:my-3 lg:text-[15px] xl:text-[18px]">
            <Link to="/" className="text-black hover:text-gray-300 font-poppins">
              Home
            </Link>
            <Link to="/category" className="text-black hover:text-gray-300 font-poppins">
              All category
            </Link>
            {
              !user ? <Link to="/signup" className="text-black hover:text-gray-300 font-poppins">Signup</Link> : ""
            }

            {
              !user ? <Link to="/login" className="text-black hover:text-gray-300 font-poppins">Login</Link> : ""
            }

            {
              user?.role === "user" && <Link to="/userdashboard" className="text-black hover:text-gray-300 font-poppins">{user.name}</Link>
            }

            {
              user?.role === "admin" && <Link to="/admindashboard" className="text-black hover:text-gray-300 font-poppins">Admin</Link>
            }
            
            {
              user && <Link className="text-black hover:text-gray-300 font-poppins" onClick={logout}>Logout</Link>
            }
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* Icons */}
          <div className="flex items-center space-x-2 mt-4 md:mt-3">
            {/* Wishlist Icon */}
            <div onClick={() => handleAuthNavigation('/wishlist')} className="relative cursor-pointer">
              <div className="w-[2rem] h-[2rem] text-black relative">
                <div className='w-[1.2rem] h-[1.2rem] bg-secondary text-white absolute top-0 right-0 rounded-full flex items-center justify-center'>
                  {clickedIds.length}
                </div>
                <CiHeart className='w-[2rem] h-[2rem]' />
              </div>
            </div>

            {/* Cart Icon */}
            <div onClick={() => handleAuthNavigation('/cart')} className="relative cursor-pointer">
              <div className="w-[2rem] h-[2rem] text-black">
                <div className='w-[1.2rem] h-[1.2rem] bg-secondary text-white absolute top-0 right-0 rounded-full flex items-center justify-center'>
                  {cartItems.length}
                </div>
                <CiShoppingCart className='w-[2rem] h-[2rem]' />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
