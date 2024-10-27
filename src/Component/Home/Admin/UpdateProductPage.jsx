import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../../context/myContext";
import { fireDB } from "../../../firebase/FirebaseConfig";

const categoryList = [
  { name: 'fashion' },
  { name: 'Phones' },
  { name: 'Computers' },
  { name: 'SmartWatch' },
  { name: 'Camera' },
  { name: 'HeadPhones' },
  { name: 'Gaming' },
];

const UpdateProductPage = () => {
  const { loading, setloading, getAllProduct } = useData();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    productBrand: "",
    productcolor: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    quantity: "", // Initialize quantity
  });

  const getSingleProductFunction = async () => {
    setloading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      const productData = productTemp.data();
      
      setProduct({
        title: productData?.title || "",
        price: productData?.price || "",
        productImageUrl: productData?.productImageUrl || "",
        productBrand: productData?.productBrand || "",
        productcolor: productData?.productcolor || "",
        category: productData?.category || "",
        description: productData?.description || "",
        quantity: productData?.quantity || "",
        time: productData?.time || Timestamp.now(),
        date: productData?.date || new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load product. Please try again.");
    } finally {
      setloading(false);
    }
  };

  const updateProduct = async () => {
    if (!product.title || !product.price || !product.category) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setloading(true);
    try {
      await setDoc(doc(fireDB, 'products', id), product);
      toast.success("Product updated successfully");
      getAllProduct();
      navigate('/admindashboard');
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getSingleProductFunction();
  }, [id]); // Add id as dependency

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="login_Form bg-gradient-to-r from-gray-800 to-red-600 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
        <h2 className='text-center text-2xl font-bold text-white'>Update Product</h2>
        <div className="flex flex-row gap-3">
            <div>
              {/* Input Three  */}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder='Product image'
                  className='bg-gradient-to-r from-gray-800 to-red-600 text-white border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-white'
                  value={product.productImageUrl}
                  onChange={(e) => {
                    setProduct({
                      ...product, productImageUrl: e.target.value
                    })
                  }}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  placeholder='Product image 1'
                  className='bg-gradient-to-r from-gray-800 to-red-600 text-white border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-white'
                  value={product.productImageUrl1}
                  onChange={(e) => {
                    setProduct({
                      ...product, productImageUrl1: e.target.value
                    })
                  }}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  placeholder='Product image 2'
                  className='bg-gradient-to-r from-gray-800 to-red-600 text-white border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-white'
                  value={product.productImageUrl2}
                  onChange={(e) => {
                    setProduct({
                      ...product, productImageUrl2: e.target.value
                    })
                  }}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  placeholder='Product image 3'
                  className='bg-gradient-to-r from-gray-800 to-red-600 text-white border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-white'
                  value={product.productImageUr3}
                  onChange={(e) => {
                    setProduct({
                      ...product, productImageUrl3: e.target.value
                    })
                  }}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  placeholder='Product image 4'
                  className='bg-gradient-to-r from-gray-800 to-red-600 text-white border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-white'
                  value={product.productImageUrl4}
                  onChange={(e) => {
                    setProduct({
                      ...product, productImageUrl4: e.target.value
                    })
                  }}
                />
              </div>
            </div>
            <div>
              {/* Input One  */}
              <div className="mb-3">
                <input
                  type="text"
                  name="title"
                  placeholder='Product Title'
                  className='bg-gradient-to-r from-gray-800 to-red-600 text-white border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-white'
                  value={product.title}
                  onChange={(e) => {
                    setProduct({
                      ...product, title: e.target.value
                    })
                  }}
                />
              </div>
              {/* Input Two  */}
              <div className="mb-3">
                <input
                  type="number"
                  placeholder='Product Price'
                  className='bg-gradient-to-r from-gray-800 to-red-600 text-white border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-white'
                  value={product.price}
                  onChange={(e) => {
                    setProduct({
                      ...product, price: e.target.value
                    })
                  }}
                />
              </div>
              {/* Input four  */}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder='Product Brand'
                  className='bg-gradient-to-r from-gray-800 to-red-600 text-white border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-white'
                  value={product.productBrand}
                  onChange={(e) => {
                    setProduct({
                      ...product, productBrand: e.target.value
                    })
                  }}
                />
              </div>
              {/* Input five  */}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder='Product color'
                  className='bg-gradient-to-r from-gray-800 to-red-600 text-white border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-white'
                  value={product.productcolor}
                  onChange={(e) => {
                    setProduct({
                      ...product, productcolor: e.target.value
                    })
                  }}
                />
              </div>
              {/* Input six  */}
              <div className="mb-3">
                <select
                  value={product.category}
                  onChange={(e) => {
                    setProduct({
                      ...product, category: e.target.value
                    })
                  }}
                  className="w-full px-1 py-2 text-white bg-gradient-to-r from-gray-800 to-red-600 border border-pink-200 rounded-md outline-none  ">
                  <option disabled>Select Product Category</option>
                  {categoryList.map((value, index) => {
                    const { name } = value
                    return (
                      <option className=" first-letter:uppercase text-black" key={index} value={name}>{name}</option>
                    )
                  })}
                </select>
              </div>
              {/* Input seven  */}
              <div className="mb-3">
                <textarea name="description" placeholder="Product Description" rows="5" className=" w-full px-2 py-1 text-white bg-gradient-to-r from-gray-800 to-red-600 border border-pink-200 rounded-md outline-none placeholder-white"
                  value={product.description}
                  onChange={(e) => {
                    setProduct({
                      ...product, description: e.target.value
                    })
                  }}
                >
                </textarea>
              </div>
            </div>
          </div>
        <button
          type='button'
          className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md'
          onClick={updateProduct}
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default UpdateProductPage;
