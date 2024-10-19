import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';
import ThemeSettings from './ThemeSettings';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { useStateContext } from '../../contexts/ContextProvider';

const Layout = ({ account }) => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/profile/${account}`);
        setUserData(response.data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchUserData();
  }, [account]);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  return (

<div className={currentMode === 'Dark' ? 'dark' : ''}>

  <div className="flex relative dark:bg-main-dark-bg">
    <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
      <TooltipComponent
        content="Settings"
        position="Top"
      >
        <button
          type="button"
          onClick={() => setThemeSettings(true)}
          style={{ background: currentColor, borderRadius: '50%' }}
          className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
        >
          <FiSettings />
        </button>

      </TooltipComponent>
    </div>
    {activeMenu ? (
      <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
        {userData && <Sidebar role={userData.role} />}
      </div>
    ) : (
      <div className="w-0 dark:bg-secondary-dark-bg">
        {userData && <Sidebar role={userData.role} />}
      </div>
    )}
    <div
      className={
        activeMenu
          ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
          : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
      }
    >
      <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
        <Navbar account={account}/>
      </div>
      <div>
        {themeSettings && (<ThemeSettings />)}
        <Outlet />
        
      </div>
      {/* <Footer /> */}
    </div>
  </div>

</div>
    
  );
};

export default Layout;
