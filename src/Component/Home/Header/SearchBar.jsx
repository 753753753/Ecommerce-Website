import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { useData } from '../../../context/myContext';

function SearchBar() {
    const { getproduct } = useData();
    const [search, setSearch] = useState("");
    const [filterSearchData, setFilterSearchData] = useState([]);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        const inputValue = e.target.value;
        setSearch(inputValue);
        // Filter the products based on the search input
        const filteredData = getproduct.filter((obj) => obj.category.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 8);
        setFilterSearchData(filteredData);
    };

    const handleProductClick = (productId) => {
        // Navigate to the product detail page
        navigate(`/Productdetail/${productId}`);
        // Reset the search input
        setSearch("");
        setFilterSearchData([]);
    };

    return (
        <div>
            <div className="mt-2 md:mt-0 lg:mt-0 xl:mt-0">
                {/* search input */}
                <div className="input flex justify-center">
                    <input
                        type="text"
                        placeholder='Search here'
                        value={search}
                        onChange={handleSearchChange}
                        className=' bg-gray-200 placeholder-gray-400 rounded-lg px-2 py-2 xl:w-96 w-72 lg:w-80 md:w-96 outline-none text-black'
                    />
                </div>
                {/* search drop-down */}
                <div className="flex justify-center">
                    {search && (
                        <div className="block absolute bg-gray-200 w-96 md:w-96 xl:w-96 lg:w-80 z-50 my-1 rounded-lg px-2 py-2 ">
                            {filterSearchData.length > 0 ? (
                                filterSearchData.map((item, index) => (
                                    <div key={index} className="py-2 px-2 cursor-pointer" onClick={() => handleProductClick(item.id)}>
                                        <div className="flex items-center gap-2">
                                            <img className="w-10" src={item.productImageUrl} alt="" />
                                            {item.title}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex justify-center">
                                    <img className="w-20" src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png" alt="img" />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchBar;
