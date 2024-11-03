// src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start mt-auto">
      <div className="text-center p-3">
        © {new Date().getFullYear()} MY_TODOS. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
