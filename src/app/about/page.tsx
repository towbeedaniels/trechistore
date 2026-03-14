import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1615160849325-7c9398d5e6e7?w=1920&h=1080&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">Our Story</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            The art of perfumery, perfected over generations.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 text-center">
              Welcome to TréchiStore
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Founded in 2024, TréchiStore was born from a passion for the art of perfumery and a desire to make 
              luxury fragrances accessible to discerning customers worldwide. Our name, "Tréchi," represents our 
              commitment to treasuring each scent as a precious memory.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              We believe that a fragrance is more than just a scent—it's an expression of identity, a trigger for 
              memories, and a form of self-care. That's why we've curated an exceptional collection of perfumes 
              from renowned houses and emerging perfumers, each selected for its quality, uniqueness, and ability 
              to tell a story.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-gold-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Authenticity Guaranteed</h3>
              <p className="text-gray-600">
                Every fragrance in our collection is 100% authentic, sourced directly from trusted perfumers and distributors.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-gold-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Curated with Love</h3>
              <p className="text-gray-600">
                Our collection is carefully curated to include only the finest fragrances that meet our high standards.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-gold-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Customer First</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We offer personalized recommendations and exceptional customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                The Tréchi Promise
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                At TréchiStore, we understand that choosing a fragrance is a deeply personal experience. 
                That's why we've created an environment where you can explore, discover, and find scents 
                that resonate with your unique personality and style.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our team of fragrance experts is dedicated to helping you navigate our collection, 
                offering personalized recommendations based on your preferences, occasion, and the 
                impression you wish to create.
              </p>
              <ul className="space-y-3">
                {[
                  'Free shipping on orders over $100',
                  'Secure packaging to preserve fragrance integrity',
                  'Easy returns within 30 days',
                  'Expert customer support',
                  'Exclusive access to limited editions',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600&h=800&fit=crop"
                alt="Luxury perfumes"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Ready to Find Your Signature Scent?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Explore our collection and discover fragrances that tell your story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-primary bg-gold-500 hover:bg-gold-600 px-8">
              Shop Now
            </Link>
            <Link href="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-gray-900 px-8">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
