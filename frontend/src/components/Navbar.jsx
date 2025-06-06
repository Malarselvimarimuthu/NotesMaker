import React, { useState } from 'react'
import ProfileInfo from './Cards/ProfileInfo';
import { SearchBar } from './SearchBar/SearchBar';
import {useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Navbar = ({ userInfo, onSearchNote , handleClearSearch }) => {

  const [searchQuery,setSearchQuery] = useState("");
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if(userInfo){
      setIsLoggedIn(true);
    }

    return () => {
      
    }
  }, [])
  
  
  const onLogout = () =>{
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () =>{
    if(searchQuery){
      onSearchNote(searchQuery);
    }
  };

  
  const onClearSearch = () =>
  {
    setSearchQuery("");
    handleClearSearch();
  }

  
  return (
    <div className="bg-white flex items-center justify-between px-2 py-2 drop-shadow">
        <h2 className='text-xl font-medium text-black py-2'>Notes</h2>
        {isLoggedIn &&  <SearchBar
         value = {searchQuery}
         onChange={({ target }) =>{
          setSearchQuery(target.value);
         }}
         handleSearch={handleSearch}
         onClearSearch={onClearSearch}
        />}
        {isLoggedIn &&
        <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>}
    </div>
  )
}

export default Navbar;

