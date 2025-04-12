import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return ( 
        <div className='side-bar'>
           <Link className='calendar' to="1"></Link>
           <Link></Link>
           <Link></Link>
           <Link></Link>
           <Link></Link>
           <Link></Link>
           <Link></Link>
       </div>
    );
}
 
export default SideBar;