import React from "react";
import "./Footer.css";
const Footer = ({ children }) => {
  return <div className="footer">{children.map((item) => item)}</div>;
};
export default Footer;
