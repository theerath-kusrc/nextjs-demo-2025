"use client";

import { useRouter } from "next/navigation";
import React,{useEffect,useState} from "react";
import Header from "../components/Header";
import FormComponent from "@/components/FormComponent";

export default function Home() {
  const rounter = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);

  const  getAllProduct = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");

      if(!response.ok) throw new Error("Failed")
  
      const allProduct = await response.json();
      setProducts(allProduct.products);
      setFilteredProduct(allProduct.products);
    } catch (error) {
      setProducts([]);
      setFilteredProduct([]);
    }
  };

  console.log('-products-',products);
  console.log('-filteredProduct-',filteredProduct);

  useEffect(() => {
    getAllProduct();
  },[]);

  const handleSearch = (text) => {
    const filteredProduct = products.filter((p) => 
      p.title.toLowerCase().includes(text.toLowerCase()));

    setFilteredProduct(filteredProduct);
  }

  return (
    <div>
      <Header />
      <FormComponent onSearch={handleSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-10">
        {filteredProduct.map((item) => (
          <div 
            key={item.id}  
            className="flex flex-col items-center border border-gray-300 rounded-3xl hover:shadow-lg cursir-poiner"
            onClick={() => rounter.push(` /products/${item.id}`) }
            >
              <img
                alt={item.title}
                src={item.thumbnail}
              />
            <p className="text-[16px] font-bold">{item.title}</p>
            <p className="text-[16px] font-bold">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
