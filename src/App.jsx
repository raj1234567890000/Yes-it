import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




import Home from './assets/Home';
import Cart from './assets/Cart';
import { store } from './assets/store';
import { Provider } from 'react-redux';

function App() {
  return (
    < Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  
  );
}

export default App;