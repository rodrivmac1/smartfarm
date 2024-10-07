import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        © 2024 SmartFarm
      </div>
      <div className="footer-right">
        <a href="#about">About</a>
        <a href="#support">Support</a>
        <a href="#contact">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;
