// my-app/app/admin/page.tsx

'use client'; // This is a Client Component

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

// Define a type for the full product data
interface Product {
  product_id: number;
  product_name: string;
  status: string;
  updated_at: string;
}

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        fetchProducts(); // Refresh the list after deleting
      } catch (error) {
        console.error("Failed to delete product", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Product Management</h1>
        <div> {/* Group the buttons */}
          <Link href="/" className="btn" style={{ marginRight: '10px' }}>
            ← Back to Live Site
          </Link>
          <Link href="/admin/add" className="btn">
            Add New Product
          </Link>
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.product_id}>
              <td>{product.product_id}</td>
              <td>{product.product_name}</td>
              <td>{product.status}</td>
              <td>{new Date(product.updated_at).toLocaleString()}</td>
              <td className="actions">
                <Link href={`/admin/edit/${product.product_id}`}>Edit</Link>
                <button onClick={() => handleDelete(product.product_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;