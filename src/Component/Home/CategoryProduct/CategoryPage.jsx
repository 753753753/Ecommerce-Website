import React, { useEffect, useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5'; // Import close icon
import { useData } from '../../../context/myContext';
import ProductCard from './ProductCard';
import Sidebar from './Sidebar';

const categories = ['fashion', 'Phones', 'Computers', 'SmartWatch', 'Camera', 'HeadPhones', 'Gaming'];
const prices = ['₹100 - ₹200', '₹1000 - ₹2000', '₹10000 - ₹20000', 'Over ₹20000'];

const CategoryPage = () => {
  const { getproduct } = useData();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleFilterChange = (filterType, filterValue) => {
    switch (filterType) {
      case 'category':
        setSelectedCategories(prevCategories =>
          prevCategories.includes(filterValue)
            ? prevCategories.filter(category => category !== filterValue)
            : [...prevCategories, filterValue]
        );
        break;
      case 'price':
        setSelectedPrices(prevPrices =>
          prevPrices.includes(filterValue)
            ? prevPrices.filter(price => price !== filterValue)
            : [...prevPrices, filterValue]
        );
        break;
      case 'color':
        setSelectedColors(prevColors =>
          prevColors.includes(filterValue)
            ? prevColors.filter(color => color !== filterValue)
            : [...prevColors, filterValue]
        );
        break;
      case 'brand':
        setSelectedBrands(prevBrands =>
          prevBrands.includes(filterValue)
            ? prevBrands.filter(brand => brand !== filterValue)
            : [...prevBrands, filterValue]
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const brands = new Set();
    const colors = new Set();
    getproduct.forEach(product => {
      if (selectedCategories.length === 0 || selectedCategories.includes(product.category)) {
        brands.add(product.productBrand);
        colors.add(product.productcolor);
      }
    });
    setAvailableBrands(Array.from(brands));
    setAvailableColors(Array.from(colors));
  }, [selectedCategories, getproduct]);

  const parsePrice = (price) => {
    return parseInt(price.replace(/[₹,]/g, ''), 10);
  };

  const filterByPriceRange = (price) => {
    const numericPrice = parsePrice(price);
    return selectedPrices.some(range => {
      if (range.startsWith('Over')) {
        const min = parsePrice(range.replace('Over ₹', ''));
        return numericPrice >= min;
      }
      const [min, max] = range.replace(/[₹,]/g, '').split(' - ').map(Number);
      return numericPrice >= min && numericPrice <= max;
    });
  };

  const filteredProducts = getproduct.filter(product => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice = selectedPrices.length === 0 || filterByPriceRange(product.price);
    const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.productcolor || product.color);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.productBrand);

    return matchesCategory && matchesPrice && matchesColor && matchesBrand;
  });

  return (
    <div className="flex h-screen">
      {/* Toggle Button */}
      <button
        className="md:block p-2 text-lg bg-gray-200 rounded-md m-4 z-50 cursor-pointer"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <BiMenu className = "text-secondary"/>
      </button>

      {/* Sidebar (Filter Section) */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setSidebarOpen(false)} // Close sidebar when clicking outside
      ></div>
      <div
        className={`fixed left-0 top-0 w-64 h-full bg-gray-100 p-4 transform transition-transform duration-300 z-50 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
       <IoClose className = "text-secondary cursor-pointer md:size-7" onClick={() => setSidebarOpen(!sidebarOpen)}/>
        <Sidebar
          categories={categories}
          prices={prices}
          colors={availableColors}
          brands={availableBrands}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Products Section */}
      <div className={`flex-1 p-4 overflow-y-scroll h-full transition-opacity duration-300 ${sidebarOpen ? "opacity-50" : "opacity-100"}`}>
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
