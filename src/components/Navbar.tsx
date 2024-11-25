import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  HomeIcon,
  ShoppingBagIcon,
  DocumentTextIcon,
  TruckIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import LanguageSelector from './LanguageSelector';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { path: '/dashboard', icon: HomeIcon, label: 'Dashboard', animation: 'icon-pulse' },
    { path: '/orders', icon: ShoppingBagIcon, label: 'Orders', animation: 'icon-bounce' },
    { path: '/documents', icon: DocumentTextIcon, label: 'Documents', animation: 'icon-float' },
    { path: '/shipments', icon: TruckIcon, label: 'Shipments', animation: 'icon-spin' },
    { path: '/chat', icon: ChatBubbleLeftRightIcon, label: 'Chat', animation: 'icon-bounce' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <Link to="/dashboard" className="flex-shrink-0 flex items-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg"
              >
                <ShoppingBagIcon className="h-6 w-6 text-white" />
              </motion.div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                ExportEdge
              </span>
            </Link>

            {/* Navigation Items */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <item.icon className={`h-5 w-5 ${location.pathname === item.path ? item.animation : ''}`} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <item.icon className={`h-5 w-5 ${location.pathname === item.path ? item.animation : ''}`} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;