'use client';

import { useState, useEffect } from 'react';

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA only after scrolling past 320px and if form is not actively in view
      const scrollY = window.scrollY;
      const formEl = document.getElementById('get-help-form');
      if (formEl) {
        const rect = formEl.getBoundingClientRect();
        // If the form is currently in the viewport, hide sticky bar so it does not block the inputs
        const isFormInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(scrollY > 300 && !isFormInView);
      } else {
        setIsVisible(scrollY > 300);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    const formEl = document.getElementById('get-help-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const firstInput = formEl.querySelector('input') as HTMLInputElement | null;
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 400);
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className="mobile-sticky-bar">
      <div className="mobile-sticky-inner">
        <div className="mobile-sticky-text">
          <span className="mobile-sticky-title">Printer Not Working?</span>
          <span className="mobile-sticky-sub">Simple, human help</span>
        </div>
        <button
          type="button"
          onClick={scrollToForm}
          className="mobile-sticky-btn"
        >
          GET HELP NOW
        </button>
      </div>
    </div>
  );
}
