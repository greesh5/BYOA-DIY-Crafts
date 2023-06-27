import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/header/header.js';
import LoginForm from './components/auth/login.js';
import RegistrationForm from './components/auth/signup.js';
import ListingPage from './components/pages/listingpage.js';
import DetailPage from "./components/pages/detailpage.js";
import CraftForm from './components/pages/createcraft.js';
import HomePage from './components/pages/homepage.js';
import { AuthProvider } from './context/authcontext.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <AuthProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm setLoggedIn={setLoggedIn} />} />
          <Route path="/register" element={<RegistrationForm setLoggedIn={setLoggedIn} />} />
          <Route path="/listings" element={<ListingPage />} />
          <Route path="/crafts/:category" element={<DetailPage />} />
          <Route path="/createcraft" element={<CraftForm/>} />
        </Routes>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
