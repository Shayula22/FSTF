import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import './fontawesome';
import '../styles/App.css';

import Navbar from './Navbar';
import Contact from './Contact';
import Terminal from './Terminal';
import News from './News';
import About from './About';
import Landing from './Landing'

const App = () => {
    return (
     <Router>
               <Navbar />
               <Routes>
                    <Route path="/" element={<Landing/>}/>
                    <Route path="/terminal" element={<Terminal/>} />
                    <Route path="/news" element={<News/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/contact" element={<Contact />} />
               </Routes>
     </Router>
    );
};

export default App;
