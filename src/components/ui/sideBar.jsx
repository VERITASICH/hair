import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return ( 
        <div className='side-bar'>
           <Link 
                className='side-bar-calendar'
                to="/"
            >
           </Link>
           <Link
                className='side-bar-tasks'
                to="/tasks"
            >
           </Link>
           <Link
                className='side-bar-basket'
                to="/basket"
           >
           </Link>
           <Link
                className='side-bar-friends'
                to="/friends"
           >
           </Link>
           <Link
                className='side-bar-money'
                to="/money"
           >
           </Link>
           <Link
                className='side-bar-summary'
                to="/summary"
           >
           </Link>
           <Link
                className='side-bar-settings'
                to="/settings"
           >
           </Link>
       </div>
    );
}
 
export default SideBar;