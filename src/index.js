import React from 'react';
import ReactDOM from 'react-dom/client';
import Memo from './pages/Memo';
import MemoModify from './pages/MemoModify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Memo />}></Route>
        <Route path="/memo" element={< Memo />}></Route>
        <Route path="/modify/:id" element={< MemoModify />}></Route>
      </Routes>
    </BrowserRouter>
);
