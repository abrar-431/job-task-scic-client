import React, { useEffect, useState } from 'react';
import Product from './Product';

const Products = ({products}) => {
    // const [products, setProducts] = useState([]);
    // useEffect(()=>{
    //     fetch('https://scic-job-task-server-lovat.vercel.app/products')
    //     .then(res=>res.json())
    //     .then(data=>setProducts(data))
    // },[])

    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 my-10'>
            {
                products.map(product=><Product product={product} key={product._id}></Product>)
            }
        </div>
    );
};

export default Products;