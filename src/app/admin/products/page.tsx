"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase, Product } from '@/lib/supabase';

export default function AdminProducts() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    original_price: '',
    image: '',
    category: 'Women',
    description: '',
    notes_top: '',
    notes_middle: '',
    notes_base: '',
    size: '100ml',
    rating: '5.0',
    reviews: '0',
    in_stock: true,
    featured: false,
    new: false,
  });

  useEffect(() => {
    const adminUser = localStorage.getItem('adminUser');
    if (!adminUser) {
      router.push('/admin/login');
      return;
    }
    fetchProducts();
    setIsLoading(false);
  }, [router]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Products error:', error);
    }
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        brand: product.brand,
        price: product.price.toString(),
        original_price: product.original_price?.toString() || '',
        image: product.image,
        category: product.category,
        description: product.description,
        notes_top: product.notes_top?.join(', ') || '',
        notes_middle: product.notes_middle?.join(', ') || '',
        notes_base: product.notes_base?.join(', ') || '',
        size: product.size,
        rating: product.rating.toString(),
        reviews: product.reviews.toString(),
        in_stock: product.in_stock,
        featured: product.featured,
        new: product.new,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        brand: '',
        price: '',
        original_price: '',
        image: '',
        category: 'Women',
        description: '',
        notes_top: '',
        notes_middle: '',
        notes_base: '',
        size: '100ml',
        rating: '5.0',
        reviews: '0',
        in_stock: true,
        featured: false,
        new: false,
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      brand: formData.brand,
      price: parseFloat(formData.price),
      original_price: formData.original_price ? parseFloat(formData.original_price) : null,
      image: formData.image,
      category: formData.category,
      description: formData.description,
      notes_top: formData.notes_top.split(',').map(s => s.trim()).filter(Boolean),
      notes_middle: formData.notes_middle.split(',').map(s => s.trim()).filter(Boolean),
      notes_base: formData.notes_base.split(',').map(s => s.trim()).filter(Boolean),
      size: formData.size,
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews),
      in_stock: formData.in_stock,
      featured: formData.featured,
      new: formData.new,
    };

    try {
      if (editingProduct) {
        const { error } = await supabase.from('products').update(productData).eq('id', editingProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert([productData]);
        if (error) throw error;
      }
      
      fetchProducts();
      setShowModal(false);
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save product');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      fetchProducts();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete product');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-800">
            <h1 className="text-xl font-serif font-bold">
              Tréchi<span className="text-gold-400">Admin</span>
            </h1>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/admin/dashboard" className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/orders" className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
              Orders
            </Link>
            <Link href="/admin/products" className="block px-4 py-3 rounded-lg bg-primary-600 text-white">
              Products
            </Link>
            <Link href="/" target="_blank" className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
              View Store
            </Link>
          </nav>
          <div className="p-4 border-t border-gray-800">
            <button onClick={handleLogout} className="w-full px-4 py-3 rounded-lg text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors text-left">
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64">
        <header className="bg-white shadow-sm border-b">
          <div className="px-8 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-gray-900">Products Management</h2>
            <button onClick={() => openModal()} className="btn-primary">
              + Add Product
            </button>
          </div>
        </header>

        <div className="p-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt={product.name} className="w-12 h-14 object-cover rounded" />
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.size}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.brand}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${product.price}
                        {product.original_price && (
                          <span className="ml-2 text-gray-400 line-through text-xs">${product.original_price}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.in_stock ? (
                          <span className="text-green-600 text-sm font-medium">In Stock</span>
                        ) : (
                          <span className="text-red-600 text-sm font-medium">Out of Stock</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-1">
                          {product.featured && (
                            <span className="px-2 py-1 text-xs font-medium rounded bg-gold-100 text-gold-700">Featured</span>
                          )}
                          {product.new && (
                            <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700">New</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button onClick={() => openModal(product)} className="text-primary-600 hover:text-primary-800 font-medium mr-3">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800 font-medium">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 my-8">
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <input type="text" value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} required className="input-field" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (optional)</label>
                  <input type="number" step="0.01" value={formData.original_price} onChange={(e) => setFormData({...formData, original_price: e.target.value})} className="input-field" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input type="url" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} required className="input-field" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="input-field">
                    <option>Women</option>
                    <option>Men</option>
                    <option>Unisex</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                  <input type="text" value={formData.size} onChange={(e) => setFormData({...formData, size: e.target.value})} className="input-field" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required rows={3} className="input-field resize-none" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Top Notes (comma separated)</label>
                  <input type="text" value={formData.notes_top} onChange={(e) => setFormData({...formData, notes_top: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Middle Notes</label>
                  <input type="text" value={formData.notes_middle} onChange={(e) => setFormData({...formData, notes_middle: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Base Notes</label>
                  <input type="text" value={formData.notes_base} onChange={(e) => setFormData({...formData, notes_base: e.target.value})} className="input-field" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <input type="number" step="0.1" min="0" max="5" value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reviews Count</label>
                  <input type="number" value={formData.reviews} onChange={(e) => setFormData({...formData, reviews: e.target.value})} className="input-field" />
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.in_stock} onChange={(e) => setFormData({...formData, in_stock: e.target.checked})} />
                  <span className="text-sm text-gray-700">In Stock</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} />
                  <span className="text-sm text-gray-700">Featured</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.new} onChange={(e) => setFormData({...formData, new: e.target.checked})} />
                  <span className="text-sm text-gray-700">New Arrival</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <button type="submit" className="btn-primary flex-1">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
