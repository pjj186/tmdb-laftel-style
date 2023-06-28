import React from 'react';
import { GlobalStyles } from './styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
