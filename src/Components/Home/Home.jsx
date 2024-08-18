import React, { useEffect, useState } from 'react';
import Products from './Products/Products';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
    const totalProducts = useLoaderData()
    const distinctBrands = [...new Set(totalProducts.map(product => product.brandName))];
    const distinctCategories = [...new Set(totalProducts.map(product => product.category))];
    const [products, setProducts] = useState([]);
    const totalItems = totalProducts.length;
    const [totalItemsPerPage, setTotalItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [brand, setBrand] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [categoryName, setCategoryName] = useState('');
    const totalPages = Math.ceil(totalItems / totalItemsPerPage);
    const pages = [];
    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&items=${totalItemsPerPage}&brand=${brand}&categoryName=${categoryName}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [currentPage, totalItemsPerPage, brand, categoryName, minPrice, maxPrice])
    const handlePrevButton = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextButton = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1)
        }
    }
    const handleItemsPerPage = e => {
        const items = parseInt(e.target.value);
        setTotalItemsPerPage(items);
        setCurrentPage(1);
    }
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    const handleBrandName = e => {
        setBrand(e.target.value);
    }
    const handleCategoryName = e => {
        setCategoryName(e.target.value);
    }
    const handlePriceRange = e => {
        const opt = e.target.value;
        switch (opt) {
            case 'a':
                setMinPrice(0);
                setMaxPrice(20);
                break;
            case 'b':
                setMinPrice(21);
                setMaxPrice(50);
                break;
            case 'c':
                setMinPrice(51);
                setMaxPrice(80);
                break;
            case 'd':
                setMinPrice(81);
                setMaxPrice(150);
                break;
            case 'e':
                setMinPrice(151);
                setMaxPrice(200);
                break;
            case 'f':
                setMinPrice(201);
                setMaxPrice(1000);
                break;
            default:
                setMinPrice(0);
                setMaxPrice(1000);
        }
    }
    console.log(minPrice, maxPrice)
    return (
        <div>
            {/* Category According to Brand Name */}
            <select onChange={handleBrandName} defaultValue='' className="select select-info w-full max-w-xs">
                <option disabled value=''>Select Brand Name</option>
                {
                    distinctBrands.map((brand, idx) => <option key={idx} value={brand}>{brand}</option>)
                }
            </select>
            {/* Categorization According to Category Name */}
            <select onChange={handleCategoryName} defaultValue='' className="select select-info w-full max-w-xs">
                <option disabled value=''>Select Category Name</option>
                {
                    distinctCategories.map((category, idx) => <option key={idx} value={category}>{category}</option>)
                }
            </select>
            {/* Price Range Categorization */}
            <select onChange={handlePriceRange} defaultValue='' className="select select-info w-full max-w-xs">
                <option disabled value=''>Price Range</option>
                <option value='a'>0-20</option>
                <option value='b'>21-50</option>
                <option value='c'>51-80</option>
                <option value='d'>81-150</option>
                <option value='e'>151-200</option>
                <option value='f'>Above 200</option>
                <option value='h'>All</option>
            </select>
            <Products products={products}></Products>
            <div className='flex justify-center'>
                <select onChange={handleItemsPerPage} defaultValue='' className="select select-ghost w-full max-w-xs mb-4 bg-gray-300">
                    <option disabled value=''>Number of Items Per Page</option>
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='20'>20</option>
                    <option value='40'>40</option>
                </select>
            </div>
            <div className='flex justify-center mb-10'>
                <button onClick={handlePrevButton} className='btn btn-info text-white mr-2'>Prev</button>
                {pages.map(page => <button onClick={() => setCurrentPage(page)} className={currentPage === page ? 'btn bg-sky-600 text-white mr-2' : 'btn btn-info text-white mr-2'} key={page}>{page}</button>)}
                <button onClick={handleNextButton} className='btn btn-info text-white mr-2'>Next</button>
            </div>
        </div>
    );
};

export default Home;