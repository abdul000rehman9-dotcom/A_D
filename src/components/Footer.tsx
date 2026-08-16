import React from 'react';
import { NAV_ITEMS, SERVICES, CONTACT_INFO } from '../data/websiteData';

interface FooterProps {
  onNavigateToPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToPortal }) => {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSolutionClick = (solutionTitle: string) => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      const msgEl = document.querySelector('#contact-message') as HTMLTextAreaElement;
      if (msgEl) {
        msgEl.value = `I am interested in learning more about your ${solutionTitle} solutions.`;
      }
    }
  };

  return (
    <footer className="bg-[#050a16] text-white pt-16 pb-12 border-t border-[#111c34]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-[#14213d]">
          {/* Column 1 - Brand & Mission */}
          <div className="lg:col-span-5 flex flex-col justify-start pr-0 lg:pr-8">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 bg-white flex items-center justify-center text-black font-bold text-base tracking-wider rounded-none shrink-0 shadow-xs">
                AD
              </div>
              <div className="flex flex-col">
                <span className="text-[17px] font-bold text-white tracking-tight leading-tight">
                  The American Dream
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 leading-tight mt-0.5">
                  STAFFING AGENCY
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-300 font-medium mb-4">
              Empowering American Talent. Enabling Business Success.
            </p>

            <blockquote className="text-xs sm:text-sm text-gray-400 italic font-light leading-relaxed">
              &ldquo;By the people, for the people &mdash; finding your dream job is
              our mission.&rdquo;
            </blockquote>
          </div>

          {/* Column 2 - Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-5">
              NAVIGATION
            </h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    id={`footer-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Solutions */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-5">
              SOLUTIONS
            </h3>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.number}>
                  <button
                    type="button"
                    onClick={() => handleSolutionClick(s.title)}
                    className="text-sm text-gray-300 hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {s.title.replace(' & Talent Hunt', '').replace('Third-Party ', '').replace(' Solutions', '')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-5">
              CONTACT
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://${CONTACT_INFO.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {CONTACT_INFO.website}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 The American Dream Staffing Agency. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <a
              href="/management-portal"
              onClick={(e) => {
                if (onNavigateToPortal) {
                  e.preventDefault();
                  onNavigateToPortal();
                }
              }}
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#b91c1c] inline-block" />
              <span>Admin Portal</span>
            </a>
            <button
              type="button"
              onClick={() => alert('Privacy Policy: All data collected is strictly utilized for employment and recruitment processing.')}
              className="hover:text-gray-200 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => alert('Terms of Service: Full terms and service level agreements apply to all enterprise staffing agreements.')}
              className="hover:text-gray-200 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() => alert('Accessibility: We are committed to ensuring digital accessibility for individuals with disabilities.')}
              className="hover:text-gray-200 transition-colors cursor-pointer"
            >
              Accessibility
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
