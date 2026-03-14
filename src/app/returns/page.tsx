import Link from 'next/link';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Returns & Exchanges</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Hassle-free returns within 30 days.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Return Policy Summary */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-12 text-center">
          <svg className="w-12 h-12 mx-auto mb-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">30-Day Return Policy</h2>
          <p className="text-gray-600">Not satisfied with your purchase? Return it within 30 days for a full refund or exchange.</p>
        </div>

        {/* How to Return */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">How to Return or Exchange</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Request Return</h3>
              <p className="text-gray-600 text-sm">
                Contact our customer service team with your order number and reason for return.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ship Item Back</h3>
              <p className="text-gray-600 text-sm">
                Pack the item securely and ship it back using the prepaid label we provide.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Receive Refund</h3>
              <p className="text-gray-600 text-sm">
                Once received, we'll process your refund or send your exchange within 5-7 days.
              </p>
            </div>
          </div>
        </div>

        {/* Return Conditions */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Return Conditions</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900">Item Condition</h3>
                <p className="text-gray-600">
                  Items must be unused, in original packaging, and in the same condition as received.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900">Time Frame</h3>
                <p className="text-gray-600">
                  Returns must be initiated within 30 days of delivery date.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900">Proof of Purchase</h3>
                <p className="text-gray-600">
                  Original order confirmation email or receipt is required for all returns.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900">Sealed Products</h3>
                <p className="text-gray-600">
                  For hygiene reasons, perfumes must be sealed and unopened for returns.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Non-Returnable Items */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Non-Returnable Items</h2>
          <p className="text-gray-600 mb-4">The following items cannot be returned:</p>
          <ul className="space-y-2">
            {[
              'Opened or used fragrances',
              'Gift cards',
              'Sale or clearance items (final sale)',
              'Limited edition or discontinued products',
              'Items damaged due to customer misuse',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Refund Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Refund Information</h2>
          
          <div className="space-y-4 text-gray-600">
            <p>
              <strong className="text-gray-900">Processing Time:</strong> Once we receive your return, please allow 5-7 business days for us to inspect the item and process your refund.
            </p>
            <p>
              <strong className="text-gray-900">Refund Method:</strong> Refunds will be issued to the original payment method used at the time of purchase.
            </p>
            <p>
              <strong className="text-gray-900">Bank Processing:</strong> Please allow an additional 3-5 business days for your bank to process the refund and post it to your account.
            </p>
            <p>
              <strong className="text-gray-900">Shipping Costs:</strong> Original shipping charges are non-refundable unless the return is due to our error or a defective product.
            </p>
          </div>
        </div>

        {/* Exchange Policy */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Exchange Policy</h2>
          <p className="text-gray-600 mb-4">
            Want to exchange your item for a different size, scent, or product? We're happy to help!
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-1">•</span>
              <span>Exchanges are subject to product availability.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-1">•</span>
              <span>If the exchange item is of higher value, you'll pay the difference.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-1">•</span>
              <span>If lower value, we'll refund the difference.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-1">•</span>
              <span>Exchange shipping is free for defective or wrong items.</span>
            </li>
          </ul>
        </div>

        {/* Start Return */}
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Ready to Start a Return?</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Contact our customer service team and we'll guide you through the simple return process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
            <a href="mailto:returns@trechistore.com" className="btn-secondary">
              Email Returns Team
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Questions? Call us at <a href="tel:+15551234567" className="text-primary-600 hover:underline">(555) 123-4567</a>
          </p>
        </div>
      </div>
    </div>
  );
}
