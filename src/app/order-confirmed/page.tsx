"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function OrderConfirmedContent() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const order = searchParams.get('order');
    if (order) {
      setOrderNumber(order);
    } else {
      setOrderNumber('TRECHI-' + Math.random().toString(36).substr(2, 9).toUpperCase());
    }
  }, [searchParams]);

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
            You can track your order status anytime using the order number above. We'll also send updates to your email.
          </p>
        </div>

        <div className="space-y-3">
          <Link 
            href={`/track-order?order=${orderNumber}`} 
            className="btn-primary w-full block"
          >
            Track Your Order
          </Link>
          <Link href="/shop" className="btn-secondary w-full block">
            Continue Shopping
          </Link>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            A confirmation email has been sent to your email address.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <OrderConfirmedContent />
    </Suspense>
  );
}
