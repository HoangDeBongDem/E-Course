import React from 'react';
import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    /*<footer className="bg-[#00000040] text-[#000000] py-4 border-b border-[#6D28D9]"> */
    <footer className="bg-[#00000040] dark:bg-[#6d28d2] text-black dark:text-white py-4 mt-0 border-b border-[#6D28D9] dark:border-[#6d28d2]F">

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between">

          <div className="mb-4 md:mb-0"> 

            <h2 className="text-2xl text-black dark:text-white font-semibold">E-Course</h2>

          </div>

          <ul className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0"> 
            <li><a href="#About" className="text-sm text-black dark:text-white hover:underline">About</a></li>
            <li><a href="#Help" className="text-sm text-black dark:text-white hover:underline">Help</a></li>
            <li><a href="#Contact" className="text-sm text-black dark:text-white hover:underline">Contact</a></li>
          </ul>

        </div>

        <div className="flex items-center justify-between mt-6 mb-4 md:mb-0"> 
          <p className="text-xs opacity-90">© Copyright 2025, All Rights Reserved by T-Course group</p>

          <div className="flex gap-3">
            <a href="https://facebook.com">
              <FacebookOutlined className="text-black dark:text-white w-6 h-6" />
            </a>
            <a href="https://instagram.com">
              <InstagramOutlined className="text-black dark:text-white w-6 h-6" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;