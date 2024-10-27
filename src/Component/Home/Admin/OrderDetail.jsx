import { useData } from "../../../context/myContext";

const OrderDetail = () => {
    const { getorder, deleteorder } = useData();
    console.log(getorder); // Log the orders data

    return (
        <div>
            <div className="py-5">
                <h1 className="text-xl text-secondary font-bold">All Orders</h1>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
                    <tbody>
                        <tr>
                            {["S.No.", "Order Id", "Image", "Title", "Category", "Price", "Quantity", "Total Price", "Status", "Name", "Address", "Pincode", "Phone Number", "Email", "Date", "Action"].map((heading) => (
                                <th key={heading} className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-white bg-secondary font-bold fontPara">
                                    {heading}
                                </th>
                            ))}
                        </tr>

                        {getorder.map((order, index) => (
                            order.cartItems.map((item) => {
                                console.log("dsksdkds")
                                return (
                                    <tr className="text-pink-300" key={item.id}>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-black">{index + 1}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-black">{order.id}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-black">
                                            <img src={item.productImageUrl} alt={item.title} />
                                        </td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-black">{item.title}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-black">{item.category}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-black">₹ {item.price}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-black">{item.quantity}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-black">₹ {item.quantity * item.price}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-black">{order.status}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-black">{order.addressInfo
                                            .name}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-black">{order.addressInfo
                                            .address}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-black">{order.addressInfo
                                            .pincode}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-black">{order.addressInfo
                                            .phone}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-black">{order.addressInfo
                                            .email}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-black">{order.date}</td>
                                        <td onClick={() => deleteorder(order.id)} className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-red-500 cursor-pointer">Delete</td>
                                    </tr>
                                )
                            })

                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetail;
