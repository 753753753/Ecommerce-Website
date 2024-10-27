/* eslint-disable react/prop-types */
import {
    Button,
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineClose } from 'react-icons/ai'; // Import the close icon
import PaymentModal from './PaymentModal'; // Import the PaymentModal

const BuyNowModal = ({ buyNowFunction, cartItems }) => {
    const [open, setOpen] = useState(false);
    const [openPayment, setOpenPayment] = useState(false); // State for Payment Modal
    const [userInfo, setUserInfo] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
        pincode: '', // Add pincode to userInfo
    });

    const handleOpen = () => {
        // Check if there are items in the cart
        if (cartItems.length === 0) {
            toast.error("No items in the cart. Please select an item.");
        } else {
            setOpen(!open);
        }
    };

    const handlePaymentOpen = async () => {
        // Validate all user information
        if (!userInfo.name || !userInfo.address || !userInfo.email || !userInfo.phone || !userInfo.pincode) {
            return toast.error("Please fill in all fields before proceeding to payment.");
        }

        setOpen(false); // Close address modal
        setOpenPayment(true); // Open payment modal
    };

    return (
        <>
            <Button
                type="button"
                onClick={handleOpen}
                className="w-full px-4 py-3 text-center bg-orange-500 hover:bg-orange-600 text-white font-bold rounded mt-2"
            >
                Buy now
            </Button>

            {/* User Information Modal */}
            <Dialog
                open={open}
                handler={handleOpen}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 m-0 rounded-none"
            >
                <DialogBody className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                    <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                        onClick={handleOpen}
                    >
                        <AiOutlineClose size={24} />
                    </button>
                    <h3 className="text-center text-lg font-semibold text-black mb-4">Enter Your Information</h3>

                    {/* Name Input */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="name"
                            value={userInfo.name}
                            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                            placeholder='Enter your name'
                            className='bg-gray-100 border border-gray-300 px-2 py-2 w-full rounded-md outline-none text-black placeholder-gray-500'
                        />
                    </div>

                    {/* Address Input */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="address"
                            value={userInfo.address}
                            onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                            placeholder='Enter your address'
                            className='bg-gray-100 border border-gray-300 px-2 py-2 w-full rounded-md outline-none text-black placeholder-gray-500'
                        />
                    </div>

                    {/* Email Input */}
                    <div className="mb-3">
                        <input
                            type="email"
                            name="email"
                            value={userInfo.email}
                            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                            placeholder='Enter your email'
                            className='bg-gray-100 border border-gray-300 px-2 py-2 w-full rounded-md outline-none text-black placeholder-gray-500'
                        />
                    </div>

                    {/* Phone Number Input */}
                    <div className="mb-3">
                        <input
                            type="tel"
                            name="phone"
                            value={userInfo.phone}
                            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                            placeholder='Enter your phone number'
                            className='bg-gray-100 border border-gray-300 px-2 py-2 w-full rounded-md outline-none text-black placeholder-gray-500'
                        />
                    </div>

                    {/* Pincode Input */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="pincode"
                            value={userInfo.pincode}
                            onChange={(e) => setUserInfo({ ...userInfo, pincode: e.target.value })}
                            placeholder='Enter your pincode'
                            className='bg-gray-100 border border-gray-300 px-2 py-2 w-full rounded-md outline-none text-black placeholder-gray-500'
                        />
                    </div>

                    <Button
                        type="button"
                        onClick={handlePaymentOpen}
                        className="w-full px-4 py-3 text-center bg-orange-500 hover:bg-orange-600 text-white font-bold rounded mt-4"
                    >
                        Proceed to Payment
                    </Button>
                </DialogBody>
            </Dialog>

            {/* Payment Modal */}
            <PaymentModal 
                open={openPayment} 
                setOpen={setOpenPayment} 
                buyNowFunction={buyNowFunction} 
                userInfo={userInfo} // Pass user info to the payment modal
                setUserInfo={setUserInfo}
                cartItems = {cartItems}
            />
        </>
    );
};

export default BuyNowModal;
