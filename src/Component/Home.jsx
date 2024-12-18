// src/Home.jsx
import React from 'react';
import StoreData from '../Buttons/StoreData';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-invoice-bg bg-cover bg-center"></div>
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">INVOICE SYSTEM</h1>
          <StoreData />
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
      </div>
    </div>
  );
};

export default Home;
