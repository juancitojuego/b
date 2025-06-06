// src/app/admin/page.tsx
import React from 'react';

const AdminPage = () => {
  // Hardcoded comic titles for the dropdown
  const comicTitles = [
    'Comic Book Title 1',
    'The Adventures of Code Man',
    'Graphic Novel X',
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <h1>Admin Panel</h1>

      <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '5px' }}>
        <h2>Manage Inventory</h2>
        <form>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="comicSelectInventory" style={{ marginRight: '10px' }}>Select Comic:</label>
            <select id="comicSelectInventory" name="comicSelectInventory" style={{ padding: '5px' }}>
              {comicTitles.map((title, index) => (
                <option key={index} value={title}>{title}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="quantity" style={{ marginRight: '10px' }}>Quantity:</label>
            <input type="number" id="quantity" name="quantity" defaultValue="1" min="0" style={{ padding: '5px' }} />
          </div>
          <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '10px' }}>Increase Inventory</button>
          <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Decrease Inventory</button>
        </form>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
        <h2>Set Price</h2>
        <form>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="comicSelectPrice" style={{ marginRight: '10px' }}>Select Comic:</label>
            <select id="comicSelectPrice" name="comicSelectPrice" style={{ padding: '5px' }}>
              {comicTitles.map((title, index) => (
                <option key={index} value={title}>{title}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="price" style={{ marginRight: '10px' }}>Price ($):</label>
            <input type="number" id="price" name="price" defaultValue="9.99" min="0" step="0.01" style={{ padding: '5px' }} />
          </div>
          <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Set Price</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
