
"use client"
import { useEffect } from "react";
import { getAllProducts } from "../../api/services/stocks";
export default function Home() {


const loadAllProducts = () => {
  return Promise.all([]).then(() => {
    getAllProducts().then(data => {
      console.log(data);
    });
  });
}



useEffect(() => {
  loadAllProducts();
}, []);




  return (
    <div className="flex justify-center items-center flex-col h-[80vh]">
      <h1>Hi there! This is the FinusasdASDus!</h1>
    </div>
  );
}
