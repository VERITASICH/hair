import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../../styles/SideBar.module.css';

const SideBar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return ( 
        <nav className={styles['side-bar']} aria-label="Main navigation">
           <Link 
                className={`${styles['side-bar-calendar']} ${isActive('/') ? styles.active : ''}`}
                to="/"
                aria-label="Calendar"
            >
           </Link>
           <Link
                className={`${styles['side-bar-tasks']} ${isActive('/tasks') ? styles.active : ''}`}
                to="/tasks"
                aria-label="Tasks"
            >
           </Link>
           <Link
                className={`${styles['side-bar-basket']} ${isActive('/basket') ? styles.active : ''}`}
                to="/basket"
                aria-label="Basket"
           >
           </Link>
           <Link
                className={`${styles['side-bar-friends']} ${isActive('/friends') ? styles.active : ''}`}
                to="/friends"
                aria-label="Friends"
           >
           </Link>
           <Link
                className={`${styles['side-bar-money']} ${isActive('/money') ? styles.active : ''}`}
                to="/money"
                aria-label="Money"
           >
           </Link>
           <Link
                className={`${styles['side-bar-summary']} ${isActive('/summary') ? styles.active : ''}`}
                to="/summary"
                aria-label="Summary"
           >
           </Link>
           <Link
                className={`${styles['side-bar-settings']} ${isActive('/settings') ? styles.active : ''}`}
                to="/settings"
                aria-label="Settings"
           >
           </Link>
       </nav>
    );
}
 
export default SideBar;