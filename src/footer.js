import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        © 2024 SmartFarm
      </div>
      <div className="footer-right">
        <a href="#about">Acerca de</a>
        <a href="#support">Soporte</a>
        <a href="#contact">Contáctanos</a>
      </div>
    </footer>
  );
};

export default Footer;
