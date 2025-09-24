
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
  console.log("Loading all products...");
  loadAllProducts();
}, []);




  return (
    <div className="flex justify-center items-center flex-col h-[80vh]">
      <h1>Hi there! This is the FinusasdASDusasdfasdfasdf!</h1>
      <h1>The value of TWELVE_DATA_API_KEY is: {process.env.TWELVE_DATA_API_KEY}</h1>
    </div>
  );
}
