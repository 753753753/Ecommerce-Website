/* eslint-disable react/prop-types */
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineClose } from 'react-icons/ai'; // Import the close icon
import { fireDB } from "../../../firebase/FirebaseConfig";

const PaymentModal = ({ open, setOpen, buyNowFunction , userInfo , setUserInfo , cartItems }) => {
    console.log(userInfo)
    const [cardInfo, setCardInfo] = useState({
        cardNumber: "",
        cardHolderName: "",
        expiryDate: "",
        cvv: "",
    });

    const handlePayment = async () => {
        // Validate card information
        if (!cardInfo.cardNumber || !cardInfo.cardHolderName || !cardInfo.expiryDate || !cardInfo.cvv) {
            return toast.error("All fields are required");
        } else {
            // Call the buyNowFunction to process the order

            setOpen(false); // Close the modal after successful payment
            toast.success("Your Order is confirmed");
        }
                // Create order info and attempt to add to Firestore
                const orderInfo = {
                    addressInfo: {
                        pincode: userInfo.pincode, // Include pincode in addressInfo
                        date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
                        name: userInfo.name,
                        time: Timestamp.now(), // Store the current timestamp
                        mobileNumber: userInfo.phone,
                    },
                    cartItems,
                    date: new Date().toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }),
                    email: userInfo.email,
                    id: "", // Generate an ID if needed or leave as empty
                    status: "confirmed",
                    time: Timestamp.now(), // Store the current timestamp
                    userid: "yourUserId", // Replace with actual user ID if available
                };
        
                try {
                    const orderRef = collection(fireDB, 'order'); // Corrected typo
                    await addDoc(orderRef, orderInfo); // Use await here
                    toast.success("Order Placed Successfully");
                    setUserInfo({ name: '', address: '', email: '', phone: '', pincode: '' }); // Reset user info
                } catch (error) {
                    console.error("Error adding document: ", error);
                    toast.error("Failed to place order. Please try again.");
                }
    };

    return (
        <>
            <Dialog
                open={open}
                handler={() => setOpen(!open)}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 m-0 rounded-none"
            >
                <DialogBody className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                    <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                        onClick={() => setOpen(false)}
                    >
                        <AiOutlineClose size={24} />
                    </button>
                    <h3 className="text-center text-lg font-semibold text-black mb-4">Payment Details</h3>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="cardNumber"
                            value={cardInfo.cardNumber}
                            onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
                            placeholder='Card Number'
                            className='bg-gray-100 border border-gray-300 px-2 py-2 w-full rounded-md outline-none text-black placeholder-gray-500'
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="cardHolderName"
                            value={cardInfo.cardHolderName}
                            onChange={(e) => setCardInfo({ ...cardInfo, cardHolderName: e.target.value })}
                            placeholder='Card Holder Name'
                            className='bg-gray-100 border border-gray-300 px-2 py-2 w-full rounded-md outline-none text-black placeholder-gray-500'
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="expiryDate"
                            value={cardInfo.expiryDate}
                            onChange={(e) => setCardInfo({ ...cardInfo, expiryDate: e.target.value })}
                            placeholder='MM/YY'
                            className='bg-gray-100 border border-gray-300 px-2 py-2 w-full rounded-md outline-none text-black placeholder-gray-500'
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="cvv"
                            value={cardInfo.cvv}
                            onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                            placeholder='CVV'
                            className='bg-gray-100 border border-gray-300 px-2 py-2 w-full rounded-md outline-none text-black placeholder-gray-500'
                        />
                    </div>
                    <Button
                        type="button"
                        onClick={handlePayment}
                        className="w-full px-4 py-3 text-center bg-orange-500 hover:bg-orange-600 text-white font-bold rounded mt-4"
                    >
                        Confirm Payment
                    </Button>
                </DialogBody>
            </Dialog>
        </>
    );
};

export default PaymentModal;
