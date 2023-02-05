import React from 'react';
import './style.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
const Search = () => {
    return (
        <>
           <div className="search">
            <div className="search_container">
                <SearchOutlinedIcon/>
                <input type="text" placeholder='search'/>
            </div>
            </div> 
        </>
    );
};

export default Search;