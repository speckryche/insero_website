'use client';

import { useEffect } from 'react';

export function ConceptHeaderOverride() {
  useEffect(() => {
    // Add concept marker to body
    document.body.classList.add('concept-v3');

    const checkScroll = () => {
      if (window.scrollY > 10) {
        document.body.classList.add('concept-scrolled');
      } else {
        document.body.classList.remove('concept-scrolled');
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    return () => {
      document.body.classList.remove('concept-v3', 'concept-scrolled');
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return (
    <style>{`
      /* ============================================
         Concept V3: Override header for white hero
         Uses body class for maximum CSS specificity
         ============================================ */

      /* Both logos: same size, smooth transition */
      body.concept-v3 header img[alt="Insero"] {
        height: 80px !important;
        transition: opacity 0.3s ease !important;
        transform: none !important;
      }
      @media (min-width: 1024px) {
        body.concept-v3 header img[alt="Insero"] {
          height: 90px !important;
        }
      }

      /* NOT scrolled: show light-bg logo, hide dark-bg logo */
      body.concept-v3 header img[src*="logo-dark"] {
        opacity: 0 !important;
      }
      body.concept-v3 header img[src*="logo-light"] {
        opacity: 1 !important;
      }

      /* Nav links — larger, bolder, dark on white background */
      body.concept-v3 header nav a {
        color: #1e293b !important;
        font-size: 20px !important;
        font-weight: 800 !important;
        transition: color 0.3s ease !important;
      }
      body.concept-v3 header nav a:hover {
        color: #008838 !important;
      }

      /* CTA button — tangerine accent, before scroll */
      body.concept-v3 header nav button,
      body.concept-v3 header nav a:has(button) button {
        background-color: #F97316 !important;
        color: white !important;
        font-size: 16px !important;
        font-weight: 700 !important;
        padding: 12px 24px !important;
        box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3) !important;
        transition: background-color 0.3s ease, box-shadow 0.3s ease !important;
      }
      body.concept-v3 header nav button:hover {
        background-color: #C4590C !important;
        box-shadow: 0 6px 16px rgba(249, 115, 22, 0.4) !important;
      }

      /* Header smooth transition */
      body.concept-v3 header {
        transition: background-color 0.3s ease, box-shadow 0.3s ease !important;
      }

      /* ---- SCROLLED STATE ---- */

      /* Dark header background */
      body.concept-scrolled header {
        background-color: #1a2530 !important;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important;
      }

      /* Show dark-bg logo, hide light-bg logo */
      body.concept-scrolled header img[src*="logo-dark"] {
        opacity: 1 !important;
      }
      body.concept-scrolled header img[src*="logo-light"] {
        opacity: 0 !important;
      }

      /* White nav text on dark header */
      body.concept-scrolled header nav a {
        color: white !important;
      }
      body.concept-scrolled header nav a:hover {
        color: #1FA855 !important;
      }

      /* CTA button — primary green on dark header */
      body.concept-scrolled header nav button {
        background-color: #008838 !important;
        box-shadow: 0 4px 12px rgba(0, 136, 56, 0.3) !important;
      }
      body.concept-scrolled header nav button:hover {
        background-color: #005C28 !important;
        box-shadow: 0 6px 16px rgba(0, 136, 56, 0.4) !important;
      }
    `}</style>
  );
}
