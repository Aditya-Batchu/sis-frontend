import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased">
      <Header />
      <Sidebar />
      <div className="pl-72">
        <main className="relative w-full pt-16 bg-surface min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
