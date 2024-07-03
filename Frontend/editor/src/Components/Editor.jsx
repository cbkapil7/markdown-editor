import React from "react";
import "./Editor.css";

const Editor = ({ value, onChange, placeholder, style }) => {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="card">
      <div className="tools">
        <div className="circle">
          <span className="red box"></span>
        </div>
        <div className="circle">
          <span className="yellow box"></span>
        </div>
        <div className="circle">
          <span className="green box"></span>
        </div>
      </div>
      <div className="card__content">
        <textarea
          className="textprop"
          // style={style}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
        ></textarea>
      </div>
    </div>
  );
};

export default Editor;
