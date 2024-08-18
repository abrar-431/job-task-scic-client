import React, { useEffect, useState } from 'react';
import Products from './Products/Products';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
    const totalProducts = useLoaderData()
    const [products, setProducts] = useState([]);
    const totalItems = totalProducts.length;
    const [totalItemsPerPage, setTotalItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalItems / totalItemsPerPage);
    const pages = [];
    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&items=${totalItemsPerPage}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [currentPage, totalItemsPerPage])
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
    return (
        <div>
            <Products products={products}></Products>
            <div className='flex justify-center'>
                <select onChange={handleItemsPerPage} className="select select-ghost w-full max-w-xs mb-4 bg-gray-300">
                    <option disabled selected>Number of Items Per Page</option>
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