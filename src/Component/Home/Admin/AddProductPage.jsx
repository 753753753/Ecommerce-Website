import { Timestamp, addDoc, collection } from "firebase/firestore";
import { Loader } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../context/myContext";
import { fireDB } from "../../../firebase/FirebaseConfig";
const categoryList = [
  {
    name: 'fashion'
  },
  {
    name: 'Phones'
  },
  {
    name: 'Computers'
  },
  {
    name: 'SmartWatch'
  },
  {
    name: 'Camera'
  },
  {
    name: 'HeadPhones'
  },
  {
    name: 'Gaming'
  },
]
const AddProductPage = () => {

  const { loading, setloading } = useData();

  const Navigate = useNavigate();

  // product state
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    productImageUrl1: "",
    productImageUrl2: "",
    productImageUrl3: "",
    productImageUrl4: "",
    productBrand: "",
    productcolor: "",
    category: "",
    description: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
  });

  const addproduct = async () => {
    if (product.title == "" || product.price == "" || product.productImageUrl == "" || product.category == "" || product.description == "") {
      return toast.error("all fields are required")
    }

    setloading(true);

    try {
      const productRef = collection(fireDB, 'products');
      await addDoc(productRef, product);
      toast.success("Add product successfully");
      Navigate('/admindashboard')
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      toast.error("Add product failed");
    }
  }


  return (
    <div>
      <div className='flex justify-center items-center h-screen'>
        {loading && <div className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2"><Loader /></div>}
        {/* Login Form  */}
        <div className="login_Form bg-gradient-to-r from-gray-800 to-red-600 px-8 py-6 border border-pink-100 rounded-xl shadow-md opacity-1">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className='text-center text-2xl font-bold text-pink-500 '>
            </h2>
          </div>

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

          {/* Add Product Button  */}
          <div className="mb-3">
            <button
              type='button'
              className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md ' onClick={addproduct}
            >Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductPage;