"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { formatCurrency } from '@/lib/currency';

interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_country: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
}

interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
}

const statusSteps = [
  { status: 'pending', label: 'Order Placed', icon: '📦' },
  { status: 'processing', label: 'Processing', icon: '⚙️' },
  { status: 'shipped', label: 'Shipped', icon: '🚚' },
  { status: 'delivered', label: 'Delivered', icon: '✅' },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState(searchParams.get('order') || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchParams.get('order')) {
      fetchOrder(searchParams.get('order')!);
    }
  }, [searchParams]);

  const fetchOrder = async (orderNum: string) => {
    if (!orderNum) return;
    
    setLoading(true);
    setError('');
    
    try {
      if (!supabase) {
        setError('Database not configured. Please try again later.');
        setLoading(false);
        return;
      }

      // Fetch order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', orderNum.toUpperCase())
        .single();

      if (orderError || !orderData) {
        setError('Order not found. Please check your order number.');
        setLoading(false);
        return;
      }

      setOrder(orderData);

      // Fetch order items
      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderData.id);

      if (!itemsError && itemsData) {
        setItems(itemsData);
      }

      setLoading(false);
    } catch (err) {
      console.error('Track order error:', err);
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber) {
      fetchOrder(orderNumber);
      router.push(`/track-order?order=${orderNumber}`);
    }
  };

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex(s => s.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Track Your Order</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Enter your order number to check the status of your delivery.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Order Number
              </label>
              <input
                type="text"
                id="orderNumber"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                placeholder="TRECHI-XXXXX"
                className="input-field"
              />
            </div>
            <div className="flex items-end">
              <button type="submit" className="btn-primary w-full md:w-auto" disabled={loading}>
                {loading ? 'Tracking...' : 'Track Order'}
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8 text-center">
            <svg className="w-12 h-12 mx-auto text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {order && (
          <>
            {/* Order Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-gray-900">Order {order.order_number}</h2>
                  <p className="text-gray-600">Placed on {new Date(order.created_at).toLocaleDateString('en-NG', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="text-3xl font-bold text-primary-600">{formatCurrency(order.total)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
                  <p className="text-gray-600">{order.customer_name}</p>
                  <p className="text-gray-600">{order.customer_email}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
                  <p className="text-gray-600">{order.shipping_address}</p>
                  <p className="text-gray-600">{order.shipping_city}, {order.shipping_state}</p>
                  <p className="text-gray-600">{order.shipping_country}</p>
                </div>
              </div>
            </div>

            {/* Order Status Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">Order Status</h3>
              
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full hidden md:block" />
                <div 
                  className="absolute top-6 left-0 h-1 bg-primary-600 rounded-full hidden md:block transition-all duration-500"
                  style={{ width: `${(getStatusIndex(order.status) / (statusSteps.length - 1)) * 100}%` }}
                />

                {/* Status Steps */}
                <div className="grid grid-cols-4 gap-4 relative">
                  {statusSteps.map((step, index) => {
                    const currentIndex = getStatusIndex(order.status);
                    const isCompleted = index <= currentIndex;
                    const isCurrent = index === currentIndex;

                    return (
                      <div key={step.status} className="text-center">
                        <div
                          className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-2xl relative z-10 transition-all duration-300 ${
                            isCompleted
                              ? isCurrent
                                ? 'bg-primary-600 text-white ring-4 ring-primary-200'
                                : 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          {step.icon}
                        </div>
                        <p className={`mt-3 text-sm font-medium ${
                          isCompleted ? 'text-primary-600' : 'text-gray-400'
                        }`}>
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {order.status === 'cancelled' && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                  <p className="text-red-700 font-medium">This order has been cancelled</p>
                  <p className="text-red-600 text-sm mt-1">Please contact us if you have any questions.</p>
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">Order Items</h3>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 pb-4 border-b last:border-0">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.product_name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-primary-600">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t flex justify-end">
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Total Paid</p>
                  <p className="text-2xl font-bold text-primary-600">{formatCurrency(order.total)}</p>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-8 bg-primary-50 border border-primary-200 rounded-xl p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                If you have any questions about your order, please contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary">
                  Contact Us
                </Link>
                <a href="mailto:support@trechistore.com" className="btn-secondary">
                  Email Support
                </a>
              </div>
            </div>
          </>
        )}

        {!order && !error && (
          <div className="text-center py-12">
            <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-600 text-lg">
              Enter your order number above to track your delivery
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Your order number was provided after checkout
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  );
}
