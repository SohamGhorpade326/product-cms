// my-app/app/admin/edit/[id]/page.tsx

'use client'; // This is a Client Component

import ProductForm from '@/components/ProductForm'; // Adjust path
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/products/${id}`)
        .then(res => setProduct(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleEditProduct = async (productData: any) => {
    try {
      await axios.put(`http://localhost:3001/api/products/${id}`, productData);
      router.push('/admin');
    } catch (error) {
      console.error('Failed to update product:', error);
      alert('Error updating product!');
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="header">
        <h1>Edit Product</h1>
        <Link href="/" className="btn">
          ← Back to Live Site
        </Link>
      </div>
      <ProductForm onSubmit={handleEditProduct} initialData={product} />
    </div>
  );
};

export default EditProductPage;