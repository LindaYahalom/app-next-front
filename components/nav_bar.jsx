import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

// Navigation Bar
const NavBar = styled.nav`
  width: 100%;
  background: linear-gradient(90deg, #4b79a1, #283e51);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;



// Navigation Links
const NavLinks = styled.div`
  display: flex;
  a {
    color: #fff;
    margin-left: 2rem;
    text-decoration: none;
    font-weight: bold;
  }
`;
const NavBarApp = () => {
    return(
          <NavBar>
          {/* Navigation Links */}
          <NavLinks>
            <Link href="/">Home</Link>
            <Link href="/destination">Destinations</Link>
            <Link href="/contact">Contact</Link>
          </NavLinks>
        </NavBar>
)}
export default NavBarApp;