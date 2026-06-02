"use client";

import { useState } from "react";

const products = [
  { id: 1, name: "NN Tee — Black", price: 65, category: "Apparel", color: "#1a1a1a", badge: "New" },
  { id: 2, name: "NN Tee — Bone", price: 65, category: "Apparel", color: "#e8e4dc", badge: null },
  { id: 3, name: "Studio Hoodie", price: 145, category: "Apparel", color: "#2a2a2a", badge: "New" },
  { id: 4, name: "Logo Cap", price: 55, category: "Accessories", color: "#111", badge: null },
  { id: 5, name: "NN Tote", price: 40, category: "Accessories", color: "#1a1a1a", badge: null },
  { id: 6, name: "Zine Vol. 1", price: 25, category: "Print", color: "#f0ebe3", badge: "Limited" },
  { id: 7, name: "Zine Vol. 2", price: 25, category: "Print", color: "#e8e0d4", badge: "Limited" },
  { id: 8, name: "Studio Poster Set", price: 80, category: "Print", color: "#f5f0e8", badge: null },
];

const categories = ["All", "Apparel", "Accessories", "Print"];

export default function Shop() {
  const [active, setActive] = useState("All");
  const [added, setAdded] = useState<number | null>(null);

  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  const handleAdd = (id: number) => {
    setAdded(id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <div className="px-6 md:px-12 pt-32 pb-24">
      <div className="mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">Shop</p>
        <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-bold leading-none tracking-tight">
          Not Normal<br />Goods
        </h1>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-3 mb-16 border-t border-white/10 pt-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-xs tracking-widest uppercase px-4 py-2 border transition-colors ${
              active === cat
                ? "border-white bg-white text-[#0a0a0a]"
                : "border-white/20 text-white/50 hover:text-white hover:border-white/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <div key={product.id} className="group">
            <div
              className="aspect-square mb-4 relative overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: product.color }}
            >
              {product.badge && (
                <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase bg-white text-[#0a0a0a] px-2 py-1">
                  {product.badge}
                </span>
              )}
              <button
                onClick={() => handleAdd(product.id)}
                className="absolute bottom-3 left-3 right-3 text-xs tracking-widest uppercase bg-[#0a0a0a]/80 text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {added === product.id ? "Added ✓" : "Add to Cart"}
              </button>
            </div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-sm leading-tight">{product.name}</h3>
                <p className="text-xs text-white/40 mt-1">{product.category}</p>
              </div>
              <p className="text-sm font-medium shrink-0 ml-2">${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="mt-20 border-t border-white/10 pt-8 text-center">
        <p className="text-white/30 text-sm">Free shipping on orders over $150 — ships worldwide.</p>
      </div>
    </div>
  );
}
