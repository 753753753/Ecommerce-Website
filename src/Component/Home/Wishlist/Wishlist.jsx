import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useData } from '../../../context/myContext';
import { addToCart, deleteFromCart } from '../../../redux/cartSlice';
import { useSelectedData } from '../Contextapi/Context';

function Wishlist() {
  const { clickedIds } = useSelectedData();
  const { loading, getproduct } = useData();

  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems)
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item))
    toast.success("Add to cart")
  }

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete from cart")
  }

  const user = JSON.parse(localStorage.getItem('users'))

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems])


  // Filter products based on the target IDs
  const targetProducts = getproduct.filter(product => clickedIds.includes(product.id));

  // Print the filtered products 
  return (
    <div>
      {user ?
        <div className=' mb-20 mt-5 container mx-auto p-4'>
          <div className={`${targetProducts.length == 0 ? "block" : "hidden"} text-center mt-8 w-[14rem] m-auto bg-secondary p-[8px] drop-shadow-sm shadow-2xl text-white`}>
            <h2 className=' uppercase font-serif text-xl'>No Wishlist Item</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {targetProducts.map((product) => (
              <Product key={product.id} {...product} addCart={addCart} cartItems={cartItems} deleteCart={deleteCart} />
            ))}
          </div>
        </div>

        :

        <Navigate to={'/login'}/>
    }

    </div>

  )
}
const Product = ({ id, title, price, productImageUrl, addCart, cartItems, deleteCart, category, quantity }) => {
  // Assuming your image path is public/img/{img}
  const { handleClick, clickedIds } = useSelectedData()
  const isproductid = clickedIds.includes(id);
  const handleAddToCart = () => {
    // Implement your add to cart logic here
    console.log(`Added ${name} to cart`);
  };
  const isProductClicked = clickedIds.includes(id);
  return (
    <div>
      <Link to={`/productdetail/${id}`} className="product-link">
        <div>
          <div className={`relative  p-4 shadow-md rounded-md mt-8 h-[15rem] hover:bg-gray-100`}>
            <div className="absolute top-4 right-4">
              <CiHeart
                className={`w-10 h-10 border-2 bg-${isProductClicked ? 'secondary' : 'gray'} rounded-full p-2 hover:bg-secondary cursor-pointer text-${isProductClicked ? 'white' : 'black'}`}
                onClick={(e) => {
                  handleClick(id);
                  e.preventDefault(); // Prevent the default link behavior
                  e.stopPropagation(); // Stop the click event from propagating to the parent link
                  // Set pointerEvents to "none" after the click to disable further clicks
                  e.currentTarget.style.pointerEvents = "none";
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
      {cartItems.some((p) => p.id === id)
        ?
        <button
          onClick={() => deleteCart({ id, title, price, productImageUrl, category, quantity })}
          className="bg-secondary hover:bg-red-700 text-white font-bold py-1 px-4 rounded mt-2"
        >
          Delete from Cart
        </button>
        :
        <button
          onClick={() => addCart({ id, title, price, productImageUrl, category, quantity })}
          className="bg-secondary hover:bg-red-700 text-white font-bold py-1 px-4 rounded mt-2"
        >
          Add to Cart
        </button>
      }
    </div>
  )
}
export default Wishlist
