import * as React from "react";
import { Button } from "./Button";

interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  onAddCart?: () => void;
}

export const ProductCard = ({
  name,
  price,
  imageUrl,
  category,
  onAddCart,
}: ProductCardProps) => {
  return (
    <div className="group relative bg-white border border-slate-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300">
      <div className="aspect-square overflow-hidden rounded-md bg-slate-100 mb-4">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div>
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{category}</span>
        <h3 className="mt-2 text-lg font-bold text-slate-900">{name}</h3>
        <p className="mt-1 text-xl font-semibold text-slate-900">₩{price.toLocaleString()}</p>
      </div>
      <Button 
        variant="primary" 
        className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onAddCart}
      >
        장바구니 담기
      </Button>
    </div>
  );
};
