import MenuBar from './menubar';
import React, { useState } from 'react';
import './header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
        <h2>DIY Crafts</h2>
      <MenuBar/>
    </header>
  );
}

export default Header;