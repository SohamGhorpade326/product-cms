// my-app/components/ProductForm.tsx

'use client'; // This is a Client Component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' in App Router

// Define types for component props
interface ProductData {
  product_name: string;
  product_desc: string;
  status: 'Draft' | 'Published' | 'Archived';
}

interface ProductFormProps {
  onSubmit: (data: ProductData) => void;
  initialData?: ProductData & { product_id?: number };
}

const ProductForm = ({ onSubmit, initialData }: ProductFormProps) => {
  const [product, setProduct] = useState<ProductData>({
    product_name: '',
    product_desc: '',
    status: 'Draft'
  });

  const router = useRouter();

  useEffect(() => {
  if (initialData) { 
    setProduct({
      product_name: initialData.product_name || '',
      product_desc: initialData.product_desc || '',
      status: initialData.status || 'Draft'
    });
  }
}, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value as any }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="product_name">Product Name</label>
        <input
          type="text"
          id="product_name"
          name="product_name"
          value={product.product_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="product_desc">Product Description</label>
        <textarea
          id="product_desc"
          name="product_desc"
          rows={5}
          value={product.product_desc}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={product.status}
          onChange={handleChange}
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
          <option value="Archived">Archived</option>
        </select>
      </div>
      <button type="submit" className="btn">
  {initialData ? 'Update Product' : 'Add Product'}
</button>
      <button type="button" className="btn btn-danger" style={{ marginLeft: '10px' }} onClick={() => router.push('/admin')}>
        Cancel
      </button>
    </form>
  );
};

export default ProductForm;