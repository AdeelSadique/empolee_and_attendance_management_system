import { useState } from 'react';
import Home from './components/Home';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Home /> */}
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<Dashboard />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
