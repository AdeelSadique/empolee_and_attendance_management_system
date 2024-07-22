import { useState } from 'react';
import Home from './components/Home';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import PageNotFound from './components/PageNotFound';
import Login from './components/Login';
import Auth from './components/Auth';
import Logout from './components/Logout';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/admin' element={<Dashboard />} />
          <Route path='/admin/*' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
