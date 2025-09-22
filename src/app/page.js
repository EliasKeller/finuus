
"use client"
import { useEffect } from "react";
import { getStocks } from "../../api/services/stocks";
export default function Home() {


const loadCSV = () => {

  return Promise.all([]).then(() => {
    getStocks().then(data => {
      console.log(data);
    });
  });
}



useEffect(() => {
  loadCSV();
}, []);




  return (
    <div className="flex justify-center items-center flex-col h-[80vh]">
      <h1>Hi there! This is the Finuus!</h1>
    </div>
  );
}
