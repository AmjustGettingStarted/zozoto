import React from 'react';
import { CONTENT } from '../content.ts';
import StoreBadge from './StoreBadge.tsx';

export const FooterSection: React.FC = () => {
  // Render clean inline SVG social icons
  const renderSocialIcon = (name: string) => {
    switch (name) {
      case 'LinkedIn':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
        );
      case 'Instagram':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      case 'YouTube':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      case 'Facebook':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case 'X':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer id="footer" className="relative w-full bg-[#0B0B0C] text-white pt-20 pb-12 px-6 sm:px-10 border-t border-white/10 z-20 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Large "zozoto" wordmark top-left in white */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-14 border-b border-white/10 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF5B2E] flex items-center justify-center">
              <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
                <path d="M16 2C16 2 26 12 26 20C26 25.5 21.5 30 16 30C10.5 30 6 25.5 6 20C6 15 11 9 16 2Z" fill="white" />
                <path d="M16 14C16 14 20 18.5 20 22C20 24.2 18.2 26 16 26C13.8 26 12 24.2 12 22C12 19 14.5 17 16 14Z" fill="#FF5B2E" />
              </svg>
            </div>
            <span className="font-heading font-black italic text-4xl sm:text-5xl text-white tracking-tighter lowercase">
              {CONTENT.footer.wordmark}
            </span>
          </div>

          <p className="text-sm text-[#6B6B72] max-w-sm">
            Delivering food, happiness, and culinary discoveries across 700+ cities everyday.
          </p>
        </div>

        {/* Five Columns in muted gray, white on hover */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 py-16">
          {/* Column 1: Orbitly */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-white mb-4">
              {CONTENT.footer.columns[0].title}
            </h4>
            <ul className="space-y-2.5">
              {CONTENT.footer.columns[0].links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#6B6B72] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: For Restaurants */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-white mb-4">
              {CONTENT.footer.columns[1].title}
            </h4>
            <ul className="space-y-2.5">
              {CONTENT.footer.columns[1].links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#6B6B72] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: For Delivery Partners */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-white mb-4">
              {CONTENT.footer.columns[2].title}
            </h4>
            <ul className="space-y-2.5">
              {CONTENT.footer.columns[2].links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#6B6B72] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Learn More */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-white mb-4">
              {CONTENT.footer.columns[3].title}
            </h4>
            <ul className="space-y-2.5">
              {CONTENT.footer.columns[3].links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#6B6B72] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Social & Stacked Badges */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-white mb-4">
              Social Links
            </h4>
            {/* Social Icons in a Row */}
            <div className="flex items-center gap-3 mb-6">
              {CONTENT.footer.socials.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#6B6B72] hover:text-white hover:bg-white/15 hover:border-white/30 transition-all duration-200"
                  aria-label={soc.name}
                >
                  {renderSocialIcon(soc.name)}
                </a>
              ))}
            </div>

            {/* Two store badges stacked below */}
            <div className="flex flex-col gap-3">
              <StoreBadge platform="google-play" size="compact" />
              <StoreBadge platform="app-store" size="compact" />
            </div>
          </div>
        </div>

        {/* Thin divider */}
        <div className="w-full h-[1px] bg-white/10 my-6" />

        {/* Small gray legal text */}
        <div className="text-xs text-[#6B6B72] leading-relaxed max-w-4xl">
          {CONTENT.footer.legal}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
