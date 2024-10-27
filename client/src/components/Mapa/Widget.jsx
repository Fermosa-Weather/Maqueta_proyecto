import React from "react";
import "../../stilos/witged.css";

export const Widget = ({ selectedStation }) => {
  return (
    <div className="widget-container">
      <h3>{selectedStation.name}</h3>
      <p>{selectedStation.info}</p>
      <div className="widget-data">
        <span className="widget-temp">
          <i className="fas fa-thermometer-half"></i>{" "}
          {selectedStation.temperature}°C
        </span>
        <span className="widget-humidity">
          <i className="fas fa-tint"></i> {selectedStation.humidity}%
        </span>
      </div>
    </div>
  );
};
