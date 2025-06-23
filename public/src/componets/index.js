import React from 'react';
import ReactDOM from 'react-dom/client';
import { Ms_Inventaris } from './ms_nventaris/Ms_Inventaris.jsx';

// Pastikan HTML sudah punya elemen dengan id="root"
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  if (container) {
   
    const root = ReactDOM.createRoot(container);
    root.render(<Ms_Inventaris />);
  } else {
    console.error('Element with id="root" not found.');
  }
});
