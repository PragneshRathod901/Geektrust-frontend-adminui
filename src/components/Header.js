import React from "react";
import "./Header.css";
const Header = ({ searchValue, SetSearchFn }) => {
  return (
    <div className="header">
        <div className='primary'>
      <form className="SearchBar">
        {" "}
        <input
          placeholder="Search"
          value={searchValue}
          onChange={SetSearchFn}
        />
      </form>
      </div>

    </div>
  );
};
export default Header;
