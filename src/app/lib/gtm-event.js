// ===================================
// FILE: lib/gtm-events.js
// Custom tracking events for your art portfolio
// ===================================

export const GTM = {
  // Track artwork page views
  viewArtwork: (data) => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "view_artwork",
      artwork_id: data.artworkId,
      artwork_title: data.title,
      artwork_price: data.price,
      artwork_medium: data.medium,
      artwork_category: data.category,
      artwork_available: !data.sold,
    });
  },

  // Track blog post views
  viewBlogPost: (data) => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "view_blog_post",
      post_id: data.postId,
      post_title: data.title,
      post_categories: data.categories?.join(", "),
      post_tags: data.tags?.join(", "),
    });
  },

  // Track portfolio project views
  viewPortfolio: (data) => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "view_portfolio",
      project_id: data.projectId,
      project_title: data.title,
      project_type: data.projectType,
    });
  },

  // Track artwork inquiries/contact
  artworkInquiry: (data) => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "artwork_inquiry",
      artwork_id: data.artworkId,
      artwork_title: data.artworkTitle,
      contact_method: data.contactMethod,
    });
  },

  // Track contact form submissions
  contactFormSubmit: (data) => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "contact_form_submit",
      form_location: data.formLocation,
      has_message: data.hasMessage,
    });
  },

  // Track newsletter signup
  newsletterSignup: (source) => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "newsletter_signup",
      signup_source: source,
    });
  },

  // Track social media clicks
  socialClick: (platform) => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "social_click",
      social_platform: platform,
    });
  },

  // Track gallery image views/clicks
  galleryImageClick: (data) => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "gallery_image_click",
      artwork_id: data.artworkId,
      image_index: data.imageIndex,
      total_images: data.totalImages,
    });
  },

  // Track filter/search usage in shop
  shopFilter: (data) => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "shop_filter",
      filter_type: data.filterType,
      filter_value: data.filterValue,
    });
  },

  // Track external link clicks
  externalLinkClick: (data) => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "external_link_click",
      link_destination: data.destination,
      link_text: data.linkText,
      artwork_id: data.artworkId,
    });
  },
};

// ===================================
// EXAMPLE USAGE IN PAGES
// ===================================

// Example 1: In app/shop/[slug]/page.jsx
/*
'use client';

import { useEffect } from 'react';
import { GTM } from '@/lib/gtm-events';

export default function ArtworkPage({ artwork }) {
  useEffect(() => {
    GTM.viewArtwork({
      artworkId: artwork._id,
      title: artwork.title,
      price: artwork.price,
      medium: artwork.medium,
      category: artwork.category,
      sold: artwork.sold,
    });
  }, [artwork]);

  const handleInquiry = () => {
    GTM.artworkInquiry({
      artworkId: artwork._id,
      artworkTitle: artwork.title,
      contactMethod: 'form',
    });
    // ... your inquiry logic
  };

  return (
    <div>
      <h1>{artwork.title}</h1>
      <button onClick={handleInquiry}>Contact About This Artwork</button>
    </div>
  );
}
*/

// Example 2: In app/blog/[slug]/page.jsx
/*
'use client';

import { useEffect } from 'react';
import { GTM } from '@/lib/gtm-events';

export default function BlogPost({ post }) {
  useEffect(() => {
    GTM.viewBlogPost({
      postId: post._id,
      title: post.title,
      categories: post.categories,
      tags: post.tags,
    });
  }, [post]);

  return <article>{post.title}</article>;
}
*/

// Example 3: In components/ContactForm.jsx
/*
'use client';

import { GTM } from '@/lib/gtm-events';

export default function ContactForm({ location = 'contact_page' }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const message = formData.get('message');
    
    GTM.contactFormSubmit({
      formLocation: location,
      hasMessage: !!message,
    });
    
    // ... your form submission logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea name="message" />
      <button type="submit">Send</button>
    </form>
  );
}
*/

// Example 4: In components/NewsletterForm.jsx
/*
'use client';

import { GTM } from '@/lib/gtm-events';

export default function NewsletterForm({ source = 'footer' }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    GTM.newsletterSignup(source);
    
    // ... your newsletter subscription logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Your email" />
      <button type="submit">Subscribe</button>
    </form>
  );
}
*/

// Example 5: In components/SocialLinks.jsx
/*
'use client';

import { GTM } from '@/lib/gtm-events';

export default function SocialLinks() {
  return (
    <div>
      <a
        href="https://instagram.com/your-handle"
        onClick={() => GTM.socialClick('instagram')}
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram
      </a>
      <a
        href="https://facebook.com/your-page"
        onClick={() => GTM.socialClick('facebook')}
        target="_blank"
        rel="noopener noreferrer"
      >
        Facebook
      </a>
    </div>
  );
}
*/

// Example 6: In app/shop/page.jsx (with filters)
/*
'use client';

import { GTM } from '@/lib/gtm-events';

export default function ShopPage() {
  const handleFilterChange = (filterType, value) => {
    GTM.shopFilter({
      filterType: filterType,
      filterValue: value,
    });
    
    // ... your filter logic
  };

  return (
    <div>
      <select onChange={(e) => handleFilterChange('category', e.target.value)}>
        <option value="">All Categories</option>
        <option value="watercolor">Watercolor</option>
        <option value="acrylic">Acrylic</option>
      </select>
    </div>
  );
}
*/
