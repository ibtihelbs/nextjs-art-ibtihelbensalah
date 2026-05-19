// components/CommissionClient.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function CommissionClient({
  whatsapp,
  instagram,
  deadline,
  isSpecialOccasion,
  occasionName,
}) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!deadline) return;

    const updateCountdown = () => {
      const now = new Date();
      const target = new Date(deadline);
      const diff = target - now;

      if (diff <= 0) {
        setCountdown("Délai dépassé");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);

      if (days > 3) {
        setCountdown(`${days} jours restants`);
      } else if (days > 1) {
        setCountdown(`${days} jours ${hours}h restants`);
      } else if (days === 1) {
        setCountdown(`1 jour ${hours}h restant`);
      } else if (hours > 0) {
        setCountdown(`${hours}h ${minutes}min restantes`);
      } else {
        setCountdown(`${minutes} minutes restantes`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [deadline]);

  // Update the countdown element
  useEffect(() => {
    const timerElement = document.getElementById("countdown-timer");
    if (timerElement && countdown) {
      timerElement.textContent = countdown;
    }
  }, [countdown]);

  return (
    <>
      {/* Sticky Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex gap-2 md:hidden z-50 shadow-lg">
        <a
          href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-black text-white text-center py-3 rounded-full text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>
        <a
          href={`https://www.instagram.com/${instagram.replace("@", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-gray-50 border border-gray-200 text-center py-3 rounded-full text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle
              cx="17.5"
              cy="6.5"
              r="1"
              fill="currentColor"
              stroke="none"
            />
          </svg>
          Instagram
        </a>
      </div>
    </>
  );
}
