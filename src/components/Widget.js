
import React from "react";
import './Widget.css';
import upArrow from '../images/up-arrow.svg'; // Ruta del ícono hacia arriba
import downArrow from '../images/down-arrow.svg'; // Ruta del ícono hacia abajo

const Widget = ({ title, value, change, isPositive, unit, color }) => {
  return (
    <div className="widget" style={{ backgroundColor: color }}>
      <div className="widget-content">
        <div className="widget-info">
          <h4 className="widget-title">{title}</h4>
          <h2 className="widget-value">{value}{unit}</h2>
        </div>
        <div className="widget-icon-container">
          <div className="widget-icon-frame">
            <img
              src={isPositive ? upArrow : downArrow}
              alt={isPositive ? "Increase" : "Decrease"}
              className="widget-icon"
            />
          </div>
          <p className="widget-change">
            {isPositive ? "+" : "-"}{change}{unit}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Widget;
