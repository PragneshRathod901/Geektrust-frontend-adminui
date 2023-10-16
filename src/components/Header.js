import React from 'react';
import ReactDOM from 'react-dom/client';
import { Search as SearchIcon } from '@mui/icons-material';
import './Header.css';
const Header = ({searchValue,SetSearchFn}) => {

    return <div   className='header primary' >
        <form className='SearchBar'
            
        > <input
            
                placeholder="Search"
                value={searchValue}
                onChange={SetSearchFn}
            />
            
        </form>
    </div>
}
export default Header;