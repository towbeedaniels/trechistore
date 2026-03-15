"use client";

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, categories, brands } from '@/data/products';
import ProductCard from '@/components/ProductCard';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesCategory && matchesBrand && matchesSearch && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result = [...result].filter((p) => p.new).concat(result.filter((p) => !p.new));
        break;
      default:
        result = [...result].filter((p) => p.featured).concat(result.filter((p) => !p.featured));
    }

    return result;
  }, [selectedCategory, selectedBrand, searchQuery, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Collection</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Explore our complete range of luxury fragrances for every occasion.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Search</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search fragrances..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700 group-hover:text-primary-600 transition-colors">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Brand</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="brand"
                      checked={selectedBrand === brand}
                      onChange={() => setSelectedBrand(brand)}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700 group-hover:text-primary-600 transition-colors">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>₦{priceRange[0].toLocaleString()}</span>
                  <span className="font-medium text-primary-600">₦{priceRange[1].toLocaleString()}+</span>
                </div>
              </div>
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedBrand('All');
                setSearchQuery('');
                setPriceRange([0, 200000]);
                setSortBy('featured');
              }}
              className="w-full btn-secondary py-2"
            >
              Reset Filters
            </button>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products found
              </p>
              <div className="flex items-center gap-3">
                <label htmlFor="sort" className="text-gray-700 whitespace-nowrap">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg
                  className="w-20 h-20 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedBrand('All');
                    setSearchQuery('');
                    setPriceRange([0, 200000]);
                  }}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
