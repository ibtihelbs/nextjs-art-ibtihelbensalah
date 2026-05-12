"use client";
import { useState } from "react";

const TiersList = ({ commission }) => {
  const [selectedSize, setSelectedSize] = useState(0);
  return (
    <>
      {/* Size Pills */}
      <div className="flex gap-2 flex-wrap">
        {commission.sizes.map((size, idx) => (
          <button
            key={idx}
            data-size={idx}
            onClick={() => setSelectedSize(idx)}
            className={`size-tab px-3 py-1 rounded-full border transition ${
              selectedSize === idx ? "border-gray-400" : "hover:border-gray-400"
            }`}
          >
            {size.dimensions}
          </button>
        ))}
      </div>

      {/* Pricing Grid */}
      <div className="border rounded-lg overflow-hidden">
        {commission.complexityTiers?.map((tier) => {
          const size = commission.sizes[selectedSize];
          const priceRange = size?.pricing?.[tier.level] || "—";
          return (
            <div
              key={tier.level}
              className="flex justify-between items-center p-4 border-b last:border-b-0"
            >
              <div>
                <div className="font-medium">
                  {tier.name?.fr}{" "}
                  <span className="text-sm text-gray-500 font-arabic">
                    {tier.name?.ar}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{tier.description?.fr}</p>
              </div>
              <div className="text-xl font-medium">
                {priceRange} <span className="text-sm text-gray-500">TND</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TiersList;
