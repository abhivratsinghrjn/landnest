import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Building2, Info, Phone, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md relative">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <NavLink to="/" className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">LandNest</span>
          </NavLink>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/for-sale"
              className={({ isActive }) =>
                `flex items-center space-x-1 ${
                  isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
                }`
              }
            >
              <Building2 className="h-5 w-5" />
              <span>For Sale</span>
            </NavLink>
            
            <NavLink
              to="/for-rent"
              className={({ isActive }) =>
                `flex items-center space-x-1 ${
                  isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
                }`
              }
            >
              <Building2 className="h-5 w-5" />
              <span>For Rent</span>
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center space-x-1 ${
                  isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
                }`
              }
            >
              <Info className="h-5 w-5" />
              <span>About Us</span>
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `flex items-center space-x-1 ${
                  isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
                }`
              }
            >
              <Phone className="h-5 w-5" />
              <span>Contact</span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50">
            <div className="flex flex-col py-2">
              <NavLink
                to="/for-sale"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <Building2 className="h-5 w-5" />
                <span>For Sale</span>
              </NavLink>
              
              <NavLink
                to="/for-rent"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <Building2 className="h-5 w-5" />
                <span>For Rent</span>
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="h-5 w-5" />
                <span>About Us</span>
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="h-5 w-5" />
                <span>Contact</span>
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}