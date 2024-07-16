import React from "react";

const Footer = () => {
  return (
    <div className='border-t-2 border-gradient-to-tr from-[#FF3131] to-[#F1EFE7] w-full'>
    <footer className="footer footer-center bg-white text-base-content p-4">
      <aside>
        <p>
          Copyright © ${new Date().getFullYear()} - All right reserved by Mimma Akter
        </p>
      </aside>
    </footer>
    </div>
  );
};

export default Footer;
