"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase, Order } from '@/lib/supabase';
import { formatCurrency } from '@/lib/currency';

export default function AdminOrders() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [updateMessage, setUpdateMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const adminUser = localStorage.getItem('adminUser');
    if (!adminUser) {
      router.push('/admin/login');
      return;
    }
    fetchOrders();
    setIsLoading(false);
  }, [router]);

  const fetchOrders = async () => {
    try {
      if (!supabase) {
        setOrders([]);
        return;
      }

      let query = supabase.from('orders').select('*');

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Orders error:', error);
      setUpdateMessage({ type: 'error', text: 'Failed to load orders' });
    }
  };

  const updateOrderStatus = async (orderId: number, status: string) => {
    setUpdatingId(orderId);
    setUpdateMessage(null);
    
    try {
      if (!supabase) {
        setUpdateMessage({ type: 'error', text: 'Database not configured. Check your Supabase settings.' });
        setUpdatingId(null);
        return;
      }

      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) {
        console.error('Supabase error:', error);
        setUpdateMessage({ type: 'error', text: `Error: ${error.message}` });
        setUpdatingId(null);
        return;
      }

      setUpdateMessage({ type: 'success', text: 'Order status updated successfully!' });
      fetchOrders();
    } catch (error) {
      console.error('Update error:', error);
      setUpdateMessage({ type: 'error', text: 'Failed to update order status' });
    } finally {
      setUpdatingId(null);
      setTimeout(() => setUpdateMessage(null), 5000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter(o => o.status === filter);

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
            <Link href="/admin/orders" className="block px-4 py-3 rounded-lg bg-primary-600 text-white">
              Orders
            </Link>
            <Link href="/admin/products" className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
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
            <h2 className="text-2xl font-serif font-bold text-gray-900">Orders Management</h2>
          </div>
        </header>

        <div className="p-8">
          {/* Status Message */}
          {updateMessage && (
            <div className={`mb-6 p-4 rounded-lg ${
              updateMessage.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {updateMessage.text}
            </div>
          )}

          {/* Database Warning */}
          {!supabase && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
              <strong>Warning:</strong> Database not configured. Orders are not being saved. 
              Please ensure your Supabase credentials are set correctly in .env.local
            </div>
          )}

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === status
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                        No orders found. Orders will appear here when customers checkout.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.order_number}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {order.customer_name}<br />
                          <span className="text-xs text-gray-400">{order.shipping_city}, {order.shipping_country}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customer_email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(order.total)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {/* Quick Status Dropdown */}
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            disabled={updatingId === order.id}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white disabled:opacity-50"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-2">How to Update Order Status</h3>
            <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
              <li>Use the dropdown in the "Actions" column to change an order's status</li>
              <li>The status will update immediately and reflect on the customer's track order page</li>
              <li>Use the filter buttons above to view orders by status</li>
              <li>If you see a database warning, check your Supabase configuration</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
