import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div className="App">
      <header className="App-header">
        <h1><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Liga Unmatched Ego</Link></h1>
        <nav>
          <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Admin</Link>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
