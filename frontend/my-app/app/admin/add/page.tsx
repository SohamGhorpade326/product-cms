// my-app/app/admin/add/page.tsx

'use client'; // This is a Client Component

import ProductForm from '@/components/ProductForm'; // Adjust path
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const AddProductPage = () => {
  const router = useRouter();

  const handleAddProduct = async (productData: any) => {
    try {
      await axios.post('/api/products', productData);
      router.push('/admin');
    } catch (error) {
      console.error('Failed to add product:', error);
      alert('Error adding product!');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Add New Product</h1>
        <Link href="/" className="btn">
          ← Back to Live Site
        </Link>
      </div>
      <ProductForm onSubmit={handleAddProduct} />
    </div>
  );
};

export default AddProductPage;