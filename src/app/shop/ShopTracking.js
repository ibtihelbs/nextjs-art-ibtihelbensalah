// components/shop/ShopTracking.client.js
"use client";

import { useEffect } from "react";
import { GTM } from "../lib/gtm-event";
import Link from "next/link";
export default function ShopTracking({ filterKey, filterValue, artworks }) {
  useEffect(() => {
    if (filterKey && filterValue) {
      GTM.shopFilter({
        filterType: filterKey,
        filterValue,
      });
    }
  }, [filterKey, filterValue]);

  useEffect(() => {
    if (!artworks?.length) return;

    artworks.forEach((artwork) => {
      GTM.viewArtwork({
        artworkId: artwork._id,
        title: artwork.title,
        price: artwork.price,
        medium: artwork.medium,
        category: artwork.category,
        sold: artwork.sold,
      });
    });
  }, [artworks]);

  return null;
}
import React from "react";

const LinkTracking = ({ track, id }) => {
  return (
    <Link
      href={`/shop/${track}`}
      onClick={() => {
        if (typeof window !== "undefined") {
          GTM.externalLinkClick({
            destination: `/shop/${track}`,
            linkText: "details",
            artworkId: id,
          });
        }
      }}
      className="px-3 py-1.5 capitalize text-sm font-black rounded-full border border-black hover:bg-black hover:text-white transition-colors"
    >
      details
    </Link>
  );
};

export { LinkTracking };
