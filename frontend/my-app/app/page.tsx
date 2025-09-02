// my-app/app/page.tsx

import axios from 'axios';
import Link from 'next/link';

// Define a type for our product data
interface Product {
  product_id: number;
  product_name: string;
  product_desc: string;
}

// Fetch data directly in the Server Component
async function getLiveProducts(): Promise<Product[]> {
  try {
    const res = await axios.get('/api/products/live');
    return res.data;
  } catch (error) {
    console.error("Failed to fetch live products:", error);
    return []; // Return an empty array on error
  }
}

export default async function LiveSite() {
  const products = await getLiveProducts();

  return (
    <div className="container">
      <div className="header">
        <h1>Live Products</h1>
        <Link href="/admin" className="btn">
          Go to Admin CMS
        </Link>
      </div>

      {products.length > 0 ? (
        products.map(product => (
          <div key={product.product_id} style={{background: '#fff', padding: '1rem', marginBottom: '1rem', borderRadius: '5px'}}>
            <h2>{product.product_name}</h2>
            <p>{product.product_desc}</p>
          </div>
        ))
      ) : (
        <p>No published products yet.</p>
      )}
    </div>
  );
};