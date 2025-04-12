import React from 'react';

import { Route, Routes } from 'react-router-dom';
import './App.css';
import SideBar from './components/ui/sideBar';
import NotFoundPage from './components/layouts/notFoundPage';
import Calendar from './components/layouts/calendar';
import Tasks from './components/layouts/tasks';
import Basket from './components/layouts/basket';
import Friends from './components/layouts/friends';
import Money from './components/layouts/money';
import Summary from './components/layouts/summary';
import Settings from './components/layouts/settings';

function App() {
  return (
    <div className='conteiner'>
      <SideBar/>
      <Routes>
        <Route  path="/" element={<Calendar/>}/>
        <Route path="/tasks" element={<Tasks/>}/>
        <Route  path="/basket" element={<Basket/>}/>
        <Route path="/friends" element={<Friends/>}/>
        <Route  path="/money" element={<Money/>}/>
        <Route path="/summary" element={<Summary/>}/>
        <Route  path="/settings" element={<Settings/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
