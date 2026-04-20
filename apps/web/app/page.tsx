"use client";

import { ProductCard, Button } from "@vibe/ui";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, Product } from "@vibe/store";

const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "Premium Wireless Headphones", price: 299000, category: "Electronics", imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" },
  { id: "2", name: "Minimalist Leather Watch", price: 185000, category: "Fashion", imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" },
  { id: "3", name: "Smart Home Speaker", price: 125000, category: "Home", imageUrl: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&q=80" },
  { id: "4", name: "Professional DSLR Camera", price: 1200000, category: "Photography", imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80" },
];

export default function CommercePage() {
  const dispatch = useDispatch();
  const { cart, totalAmount } = useSelector((state: any) => state.commerce);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Vibe <span className="text-blue-600">Store</span></h1>
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-600">Cart ({cart.length})</span>
            <span className="text-blue-600 font-bold">₩{totalAmount.toLocaleString()}</span>
            <Button variant="secondary" size="sm">Checkout</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">AI-Native Commerce Standard</h2>
          <p className="mt-4 text-xl text-slate-500 max-w-2xl mx-auto">
            Next.js 14, TurboRepo, 그리고 Redux Toolkit을 활용한 초고속 커머스 아키텍처 예제입니다.
          </p>
        </div>
      </header>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddCart={() => dispatch(addToCart(product))}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
