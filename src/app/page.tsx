import Link from 'next/link';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const featuredProducts = products.filter(p => p.featured);
const newProducts = products.filter(p => p.new);

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1615160849325-7c9398d5e6e7?w=1920&h=1080&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <p className="text-lg md:text-xl font-light mb-4 tracking-wider uppercase">
            Welcome to TréchiStore
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight">
            Discover Your
            <br />
            <span className="text-gold-400">Signature Scent</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Explore our curated collection of luxury fragrances crafted for those who dare to be remembered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-primary text-lg px-8">
              Shop Now
            </Link>
            <Link href="/about" className="btn-secondary border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8">
              Our Story
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gold-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Authentic Products</h3>
              <p className="text-gray-600">100% genuine fragrances sourced directly from renowned perfumers.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gold-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Complimentary delivery on all orders over $100 worldwide.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gold-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Personalized fragrance recommendations from our experts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Featured Fragrances</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most coveted scents, carefully selected for their exceptional quality and timeless appeal.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/shop" className="btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the perfect fragrance for every occasion and personality.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Women */}
            <Link
              href="/shop?category=Women"
              className="relative h-80 rounded-xl overflow-hidden group"
            >
              <img
                src="https://images.unsplash.com/photo-1594035910387-fea4779426e9?w=600&h=800&fit=crop"
                alt="Women's Fragrances"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-serif font-bold mb-2">Women</h3>
                <span className="text-gold-300 group-hover:translate-x-2 transition-transform inline-block">
                  Shop Now →
                </span>
              </div>
            </Link>

            {/* Men */}
            <Link
              href="/shop?category=Men"
              className="relative h-80 rounded-xl overflow-hidden group"
            >
              <img
                src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&h=800&fit=crop"
                alt="Men's Fragrances"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-serif font-bold mb-2">Men</h3>
                <span className="text-gold-300 group-hover:translate-x-2 transition-transform inline-block">
                  Shop Now →
                </span>
              </div>
            </Link>

            {/* Unisex */}
            <Link
              href="/shop?category=Unisex"
              className="relative h-80 rounded-xl overflow-hidden group"
            >
              <img
                src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=800&fit=crop"
                alt="Unisex Fragrances"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-serif font-bold mb-2">Unisex</h3>
                <span className="text-gold-300 group-hover:translate-x-2 transition-transform inline-block">
                  Shop Now →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">New Arrivals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Be the first to experience our latest creations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Join the Tréchi Family
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Subscribe to receive exclusive offers, early access to new releases, and personalized fragrance recommendations.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:ring-2 focus:ring-gold-400 focus:outline-none"
            />
            <button type="submit" className="btn-primary bg-gold-500 hover:bg-gold-600 px-8">
              Subscribe
            </button>
          </form>
          <p className="text-sm text-gray-400 mt-4">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <svg className="w-12 h-12 mx-auto text-gold-400 mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-5.465c0-1.632.555-2.957 1.666-3.954C16.795 10.587 18.286 10 20 10c.22 0 .444.008.666.023V5.259C20.448 5.09 20.224 5 20 5c-2.813 0-5.092.993-6.833 2.98C11.444 9.94 10.5 12.48 10.5 15.5V21h3.517zM5 21v-5.465c0-1.632.555-2.957 1.666-3.954C7.778 10.587 9.269 10 11 10c.22 0 .444.008.666.023V5.259C11.448 5.09 11.224 5 11 5c-2.813 0-5.092.993-6.833 2.98C2.444 9.94 1.5 12.48 1.5 15.5V21H5z" />
          </svg>
          <blockquote className="text-2xl md:text-3xl font-serif italic text-gray-700 mb-6">
            "TréchiStore has transformed the way I experience fragrances. Their curated selection and expert guidance helped me find my signature scent. The quality is exceptional, and every purchase feels like a luxury experience."
          </blockquote>
          <cite className="not-italic">
            <p className="font-semibold text-gray-900">Alexandra M.</p>
            <p className="text-gray-500">Verified Customer</p>
          </cite>
        </div>
      </section>
    </>
  );
}
