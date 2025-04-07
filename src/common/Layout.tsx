import './Layout.css';

import { Outlet } from 'react-router-dom';

import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <>
      <Header />
      <main className="layout">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
