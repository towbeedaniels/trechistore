"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function OrderConfirmedPage() {
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    setOrderNumber('TRECHI-' + Math.random().toString(36).substr(2, 9).toUpperCase());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-500 mb-1">Order Number</p>
          <p className="text-lg font-semibold text-gray-900">{orderNumber}</p>
        </div>

        <div className="text-left bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>What's Next?</strong>
            <br />
            A confirmation email has been sent to your email address. We'll notify you once your order ships.
          </p>
        </div>

        <div className="space-y-3">
          <Link href="/shop" className="btn-primary w-full block">
            Continue Shopping
          </Link>
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
