import React from 'react';
import { FaMoneyCheckDollar } from 'react-icons/fa6';
import { MdCategory, MdRateReview } from 'react-icons/md';
import { SiBrandfolder } from 'react-icons/si';

const Product = ({ product }) => {
    const { productName, productImage, description, price, category, ratings, brandName } = product;
    return (
        <div className="p-6 bg-gray-100 transform transition-transform hover:scale-105">
            <div className='flex-grow'>
                <img className='rounded-lg mx-auto' src={productImage} alt={productName} />
                <h2 className="text-2xl font-bold my-3">{productName}</h2>
                <p>About {productName}: {description}</p>
                <div className='my-4 flex justify-between'>
                    <div className='flex items-center'>
                        <FaMoneyCheckDollar className='text-lg mr-2'></FaMoneyCheckDollar>
                        <p>$ {price}</p>
                    </div>
                    <div className='flex items-center'>
                        <MdCategory className='text-lg mr-2'></MdCategory>
                        <p>{category}</p>
                    </div>
                </div>
                <div className='my-4 flex justify-between'>
                    <div className='flex items-center'>
                        <MdRateReview  className='text-lg mr-2'></MdRateReview >
                        <p>{ratings}</p>
                    </div>
                    <div className='flex items-center'>
                        <SiBrandfolder className='text-lg mr-2'></SiBrandfolder>
                        <p>{brandName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;