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
        <Route  path="/1" element={<Calendar/>}/>
        <Route path="/2" element={<Tasks/>}/>
        <Route  path="/3" element={<Basket/>}/>
        <Route path="/4" element={<Friends/>}/>
        <Route  path="/5" element={<Money/>}/>
        <Route path="/6" element={<Summary/>}/>
        <Route  path="/7" element={<Settings/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
