// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer style={{ marginTop: 30, padding: '20px 0', textAlign: 'center', color: '#6c757d' }}>
      <small>© {new Date().getFullYear()} EvolveHub — construído com ❤️</small>
    </footer>
  );
}
