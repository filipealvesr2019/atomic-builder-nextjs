'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useSetAtom } from 'jotai';
import { clearCartAtom } from '@/store/cartStore';

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const clearCart = useSetAtom(clearCartAtom);

  // Clear cart on mount if successful
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
          <CheckCircle size={40} />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed.
          {sessionId && <span className="block mt-2 text-xs text-gray-400">Ref: {sessionId}</span>}
        </p>

        <div className="space-y-3">
            <Link 
                href="/admin/store"
                className="block w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition-colors"
            >
                Back to Dashboard
            </Link>
        </div>
      </div>
    </div>
  );
}
