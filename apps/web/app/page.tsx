"use client";

import { useEffect, useState } from "react";
import { ProductCard, Button } from "@vibe/ui";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@vibe/store";
import { productService } from "@vibe/api"; // (주의: 실제 패키지 연결 설정 필요)

export default function CommercePage() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제 API 또는 Mock 데이터를 가져와서 자동 변환(Transformer) 수행
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts(); // 내부적으로 getWithTransform 사용
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ... (생략) ... */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <p className="text-center">데이터를 불러오는 중 (Mock Mode)...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                imageUrl={"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"}
                category="AI-Native"
                onAddCart={() => dispatch(addToCart(product))}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
