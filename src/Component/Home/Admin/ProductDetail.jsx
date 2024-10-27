import { deleteDoc, doc } from 'firebase/firestore';
import { Loader } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../../context/myContext';
import { fireDB } from '../../../firebase/FirebaseConfig';

function ProductDetail() {

    const { loading, getproduct, setloading, getAllProduct } = useData();
    console.log(getproduct)
    const navigate = useNavigate();

    const deleteProduct = async (id) => {
        setloading(true)

        try {
            await deleteDoc(doc(fireDB, 'products', id));
            toast.success('Product Deleted successfully')
            getAllProduct();
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }

    return (
        <div>
            <div className="py-5 flex justify-between items-center">
                {/* text  */}
                <h1 className=" text-xl text-secondary font-bold">All Product</h1>
                {/* Add Product Button  */}
                <Link to={'/addproduct'}>
                    <button className="px-5 py-2 bg-gradient-to-r from-gray-800 to-red-600 border border-pink-100 rounded-lg text-white">Add Product</button>
                </Link>
            </div>
            <div className='flex justify-center relative top-20'>
                {loading && <div><Loader /></div>}
            </div>
            {/* table  */}
            <div className="w-full overflow-x-auto mb-5">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400" >
                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-white bg-secondary font-bold fontPara">S.No.</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-white bg-secondary font-bold fontPara">Image</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-white bg-secondary">Title</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-white bg-secondary">Price</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-white bg-secondary">Category</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-white bg-secondary">Product Brand</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-white bg-secondary">Product Color</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-white bg-secondary">Date</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-white bg-secondary">Action</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-white bg-secondary">Action</th>
                        </tr>
                        {getproduct.map((item, index) => {
                            const { id, title, price, category, date, productImageUrl , productBrand , productcolor } = item
                            return (
                                <tr className="text-pink-300" key={index}>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-black ">{index + 1}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-black first-letter:uppercase">
                                        <img src={productImageUrl} alt="" class='w-20' onclick="showPopup(this.src)" />
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-black first-letter:uppercase ">
                                        {title}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-black first-letter:uppercase ">
                                        ₹{price}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-black first-letter:uppercase ">
                                        {category}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-black first-letter:uppercase ">
                                        {productBrand}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-black first-letter:uppercase ">
                                        {productcolor}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-black first-letter:uppercase ">
                                        {date}
                                    </td>
                                    <td
                                        onClick={() => navigate(`/updateproduct/${id}`)}
                                        className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500  text-green-500 cursor-pointer"
                                    >
                                        Edit
                                    </td>
                                    <td
                                        onClick={() => deleteProduct(id)}
                                        className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500  text-red-500 cursor-pointer"
                                    >
                                        Delete
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetail
