import React from 'react';
import { useData } from '../../../context/myContext';

function Userdashboard() {
    const user = JSON.parse(localStorage.getItem('users'));
    const { loading, getorder , deleteorder} = useData();
    console.log(user)
    console.log(getorder)
    return (
        <div className='mb-20'>
            <div className="container mx-auto px-4 py-5 lg:py-8">
                {/* User Info */}
                <div className="top">
                    <div className="bg-gradient-to-r from-gray-800 to-red-600 py-5 rounded-xl border border-pink-100">
                        <div className="flex justify-center">
                            <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="User Avatar" />
                        </div>
                        <div className="">
                            <h1 className="text-center text-lg text-white"><span className="font-bold">Name :</span> {user?.name}</h1>
                            <h1 className="text-center text-lg text-white"><span className="font-bold">Email :</span> {user?.email}</h1>
                            <h1 className="text-center text-lg text-white"><span className="font-bold">Date :</span> {user?.date}</h1>
                            <h1 className="text-center text-lg text-white"><span className="font-bold">Role :</span> {user?.role}</h1>
                        </div>
                    </div>
                </div>

                {/* Orders */}
                <div className="bottom mt-8">
                    <h2 className="text-2xl lg:text-3xl font-bold">Order Details</h2>
                    {loading ? (
                        <p className="text-center">Loading orders...</p>
                    ) : getorder && getorder.length === 0 ? (
                        <p>No orders found.</p>
                    ) : (
                        getorder.map((order, index) => (
                                <div key={index} className="mt-5">
                                    {/* Map through cartItems */}
                                    {order.cartItems.map((item, itemIndex) => {
                                        const { quantity, price, title, productImageUrl, category } = item;
                                        const { status, date } = order;

                                        return (
                                            <div key={itemIndex} className="mt-5 flex flex-col overflow-hidden rounded-xl border border-pink-100 md:flex-row">
                                                {/* Left Side: Order Info */}
                                                <div className="w-full border-r border-pink-100 bg-pink-50 md:max-w-xs">
                                                    <div className="p-8">
                                                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold text-black">Order Id</div>
                                                                <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                                                            </div>
                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold">Date</div>
                                                                <div className="text-sm font-medium text-gray-900">{date}</div>
                                                            </div>
                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold">Total Amount</div>
                                                                <div className="text-sm font-medium text-gray-900">₹ {(parseFloat(price) * quantity).toFixed(2)}</div>
                                                            </div>
                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold">Order Status</div>
                                                                <div className="text-sm font-medium text-green-800 first-letter:uppercase">{status}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right Side: Product Info */}
                                                <div className="flex-1">
                                                    <div className = "text-end">
                                                        <h1 onClick={() => deleteorder(order.id)} className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-red-500 cursor-pointer">Delete
                                                        </h1>
                                                    </div>
                                                    <div className="p-8">
                                                        <ul className="-my-7 divide-y divide-gray-200">
                                                            <li className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                                                                <div className="flex flex-1 items-stretch">
                                                                    <div className="flex-shrink-0">
                                                                        <img
                                                                            className="h-40 w-40 rounded-lg border border-gray-200 object-fill"
                                                                            src={productImageUrl}
                                                                            alt="Product"
                                                                        />
                                                                    </div>
                                                                    <div className="ml-5 flex flex-col justify-between">
                                                                        <div className="flex-1">
                                                                            <p className="text-sm font-bold text-gray-900">{title}</p>
                                                                            <p className="mt-1.5 text-sm font-medium text-gray-500">{category}</p>
                                                                        </div>
                                                                        <p className="mt-4 text-sm font-medium text-gray-500">x {quantity}</p>
                                                                    </div>
                                                                </div>
                            
                                                                <div className="ml-auto flex flex-col items-end justify-between">
                                                                    <p className="text-right text-sm font-bold text-gray-900">₹ {price}</p>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Userdashboard;
