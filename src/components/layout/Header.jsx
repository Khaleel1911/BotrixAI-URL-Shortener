import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { botrixLogo } from "../../constants/images";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggleMenu();
    }
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleSignUp = () => {
    navigate('/auth');
  };

  const handleScrollToSection = (sectionId) => {
    handleCloseMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        handleScrollToSection(sectionId);
      }, 100);
    } else {
      handleScrollToSection(sectionId);
    }
  };

  return (
    <header className="sticky top-0 bg-white z-50 border-b border-black/5">
      <nav 
        className="max-w-[1180px] mx-auto px-4 py-3.5 flex items-center justify-between gap-4 lg:px-5 lg:py-4.5" 
        aria-label="Primary navigation"
      >
        {/* Left links */}
        <ul className="hidden lg:flex items-center gap-9 list-none p-0 m-0">
          <li>
            <Link 
              to="/"
              className="text-lg font-medium text-teal no-underline transition-opacity hover:opacity-80" 
              aria-label="Navigate to home"
            >
              Home
            </Link>
          </li>
          <li>
            <a 
              className="text-lg font-medium text-[#0b0b0b] no-underline transition-opacity hover:opacity-80 cursor-pointer" 
              onClick={(e) => handleNavClick(e, 'features')}
              aria-label="Navigate to features section"
            >
              Features
            </a>
          </li>
          <li>
            <a 
              className="text-lg font-medium text-[#0b0b0b] no-underline transition-opacity hover:opacity-80 cursor-pointer" 
              onClick={(e) => handleNavClick(e, 'integration')}
              aria-label="Navigate to integration section"
            >
              Integration
            </a>
          </li>
        </ul>

        <Link 
          to="/"
          className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0 inline-flex items-center gap-0 no-underline" 
          aria-label="BotrixAI home"
        >
          <img
            className="block h-20 w-auto max-w-full"
            src={botrixLogo}
            alt="BotrixAI Logo"
            decoding="async"
            loading="eager"
          />
        </Link>

        {/* Right links */}
        <div className="hidden lg:flex items-center gap-6">
          <button
            type="button"
            onClick={handleLogin}
            className="w-[120px] h-[48px] text-lg font-medium rounded-xl bg-white text-[#0b0b0b] transition-colors duration-150 cursor-pointer hover:bg-teal hover:text-white hover:font-semibold outline-none"
            aria-label="Navigate to login page"
            tabIndex={0}
          >
            login
          </button>
          <button
            type="button"
            onClick={handleSignUp}
            className="w-[120px] h-[48px] text-lg font-semibold rounded-xl bg-teal text-white shadow-[0_6px_18px_rgba(14,165,164,0.35)] transition-all duration-150 cursor-pointer hover:bg-white hover:text-[#0b0b0b] hover:font-medium outline-none"
            aria-label="Navigate to sign up page"
            style={{ boxShadow: "0 6px 18px rgba(14,165,164,0.35)" }}
            tabIndex={0}
          >
            Sign Up
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden w-10 h-10 border border-black/10 rounded-[10px] bg-white inline-flex items-center justify-center cursor-pointer focus:outline-2 focus:outline-teal focus:outline-offset-2 transition-all hover:bg-gray-50"
          aria-label="Toggle mobile menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={handleToggleMenu}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {isMenuOpen ? (
            <HiX size={24} className="text-[#222]" aria-hidden="true" />
          ) : (
            <HiMenu size={24} className="text-[#222]" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 bg-black/35 backdrop-blur-sm lg:hidden z-40"
          onClick={handleCloseMenu}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="absolute right-0 top-0 h-full w-[min(85vw,400px)] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.18)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-black/5">
              <img
                className="block h-8 w-auto"
                src={botrixLogo}
                alt="BotrixAI Logo"
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={handleCloseMenu}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
                tabIndex={0}
              >
                <HiX size={24} className="text-[#222]" aria-hidden="true" />
              </button>
            </div>
            
            <ul className="list-none p-0 m-0 flex flex-col">
              <li>
                <Link
                  to="/"
                  className="block py-4 px-6 text-[#111] text-base font-medium hover:bg-gray-50 transition-colors no-underline border-b border-gray-100"
                  onClick={handleCloseMenu}
                  aria-label="Navigate to home"
                >
                  Home
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="w-full text-left block py-4 px-6 text-[#111] text-base font-medium hover:bg-gray-50 transition-colors no-underline border-b border-gray-100 bg-transparent border-none cursor-pointer"
                  onClick={(e) => handleNavClick(e, 'features')}
                  aria-label="Navigate to features section"
                  tabIndex={0}
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="w-full text-left block py-4 px-6 text-[#111] text-base font-medium hover:bg-gray-50 transition-colors no-underline border-b border-gray-100 bg-transparent border-none cursor-pointer"
                  onClick={(e) => handleNavClick(e, 'integration')}
                  aria-label="Navigate to integration section"
                  tabIndex={0}
                >
                  Integration
                </button>
              </li>
              <li className="flex flex-col gap-3 p-4 border-t border-gray-200 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    handleCloseMenu();
                    handleLogin();
                  }}
                  className="w-full py-3 px-4 text-base font-medium text-[#111] bg-transparent border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  aria-label="Navigate to login page"
                  tabIndex={0}
                >
                  login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleCloseMenu();
                    handleSignUp();
                  }}
                  className="w-full py-3 px-4 text-base font-semibold bg-teal text-white rounded-lg border-none cursor-pointer hover:bg-teal-dark transition-colors"
                  aria-label="Navigate to sign up page"
                  tabIndex={0}
                >
                  Sign Up
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
