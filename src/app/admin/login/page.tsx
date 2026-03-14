"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // For demo, accept default credentials
      if (email === 'admin@trechistore.com' && password === 'admin123') {
        localStorage.setItem('adminUser', JSON.stringify({
          id: 'admin-1',
          email: email,
          role: 'superadmin'
        }));
        router.push('/admin/dashboard');
        setIsLoading(false);
        return;
      }

      // Get admin user from Supabase
      const { data: adminUser, error: fetchError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single();

      if (fetchError || !adminUser) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }

      // Verify password
      if (password !== 'admin123') {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }

      // Store admin session in localStorage
      localStorage.setItem('adminUser', JSON.stringify({
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role
      }));

      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-white mb-2">
            Tréchi<span className="text-gold-400">Store</span>
          </h1>
          <p className="text-gray-300">Admin Dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">
            Sign In
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
                placeholder="admin@trechistore.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Demo Credentials:</strong><br />
              Email: admin@trechistore.com<br />
              Password: admin123
            </p>
          </div>
        </div>

        <p className="text-center text-gray-400 mt-6 text-sm">
          © {new Date().getFullYear()} TréchiStore. All rights reserved.
        </p>
      </div>
    </div>
  );
}
