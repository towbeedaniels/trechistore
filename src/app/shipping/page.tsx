import Link from 'next/link';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Shipping Information</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Fast, reliable delivery to your doorstep.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Free Shipping Banner */}
        <div className="bg-gold-50 border border-gold-200 rounded-xl p-6 mb-12 text-center">
          <svg className="w-12 h-12 mx-auto mb-4 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Free Shipping on Orders Over $100</h2>
          <p className="text-gray-600">Enjoy complimentary standard shipping on all orders above $100 within the United States.</p>
        </div>

        {/* Shipping Zones */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Shipping Zones & Rates</h2>
          
          <div className="space-y-6">
            <div className="border-b pb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Domestic (United States)</h3>
              </div>
              <div className="ml-13 pl-13">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-600 border-b">
                      <th className="pb-2 font-medium">Service</th>
                      <th className="pb-2 font-medium">Delivery Time</th>
                      <th className="pb-2 font-medium">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b">
                      <td className="py-3">Standard Shipping</td>
                      <td className="py-3">5-7 business days</td>
                      <td className="py-3">$15 (Free over $100)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Express Shipping</td>
                      <td className="py-3">2-3 business days</td>
                      <td className="py-3">$25</td>
                    </tr>
                    <tr>
                      <td className="py-3">Overnight Shipping</td>
                      <td className="py-3">1 business day</td>
                      <td className="py-3">$45</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border-b pb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">International</h3>
              </div>
              <div className="ml-13 pl-13">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-600 border-b">
                      <th className="pb-2 font-medium">Region</th>
                      <th className="pb-2 font-medium">Delivery Time</th>
                      <th className="pb-2 font-medium">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b">
                      <td className="py-3">Canada</td>
                      <td className="py-3">7-10 business days</td>
                      <td className="py-3">$25</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Europe & UK</td>
                      <td className="py-3">10-14 business days</td>
                      <td className="py-3">$35</td>
                    </tr>
                    <tr>
                      <td className="py-3">Rest of World</td>
                      <td className="py-3">14-21 business days</td>
                      <td className="py-3">$45</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Processing Time */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Order Processing</h2>
          <p className="text-gray-600 mb-4">
            All orders are processed within 1-2 business days (excluding weekends and holidays) after receiving your order confirmation email.
          </p>
          <p className="text-gray-600">
            You will receive another notification when your order has shipped. If you are not receiving emails, please check your spam folder.
          </p>
        </div>

        {/* Tracking */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Track Your Order</h2>
          <p className="text-gray-600 mb-6">
            Once your order has shipped, you'll receive a tracking number via email. You can use this number to track your package's journey.
          </p>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter tracking number"
              className="flex-1 input-field"
            />
            <button className="btn-primary">Track</button>
          </div>
        </div>

        {/* Special Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Important Notes
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Perfumes contain alcohol and may be subject to shipping restrictions in some countries.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Signature may be required upon delivery for high-value orders.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Customs duties and taxes may apply for international orders.</span>
            </li>
          </ul>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
            Have questions? Contact us →
          </Link>
        </div>
      </div>
    </div>
  );
}
