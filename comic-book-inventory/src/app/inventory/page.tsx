// src/app/inventory/page.tsx
import React from 'react';

const comicBooks = [
  {
    title: 'Comic Book Title 1',
    author: 'Author Name 1',
    description: 'This is a brief description of the first comic book. It involves superheroes and thrilling adventures.',
  },
  {
    title: 'The Adventures of Code Man',
    author: 'Dev Eloper',
    description: 'Join Code Man as he battles bugs and syntax errors in the digital world!',
  },
  {
    title: 'Graphic Novel X',
    author: 'Artist Extraordinaire',
    description: 'A visually stunning graphic novel that explores complex themes with beautiful artwork.',
  },
];

const InventoryPage = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <h1>Comic Book Inventory</h1>
      {comicBooks.map((comic, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
          <h2 style={{ marginTop: 0 }}>{comic.title}</h2>
          <p><strong>Author:</strong> {comic.author}</p>
          <p><em>{comic.description}</em></p>
        </div>
      ))}
    </div>
  );
};

export default InventoryPage;
