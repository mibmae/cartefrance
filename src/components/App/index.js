// == Import npm
import React from 'react';
import {
  Switch,
  Route,
  Routes,
  BrowserRouter as Router,
} from 'react-router-dom';

// == Import
import Map from 'src/components/Map';
import Header from 'src/components/Header';
import Search from 'src/components/Search';
import './styles.css';

// == Composant
const App = () => (
  <div className="app">
    <Router>
    <Header /> {/* Toujours visible  */}
    <Routes>
      <Route path="/" element={<><Map /></>}/>
    </Routes>
    </Router>
  </div>
);

// == Export
export default App;
