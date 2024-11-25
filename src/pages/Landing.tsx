import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingBagIcon, 
  GlobeAsiaAustraliaIcon,
  TruckIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UserGroupIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Landing = () => {
  const features = [
    {
      icon: GlobeAsiaAustraliaIcon,
      title: 'Global Market Access',
      description: 'Expand your business globally with our comprehensive export platform'
    },
    {
      icon: SparklesIcon,
      title: 'AI Rate Negotiation',
      description: 'Automated rate negotiation with carriers for best pricing'
    },
    {
      icon: DocumentTextIcon,
      title: 'Smart Documentation',
      description: 'AI-powered document generation and compliance checks'
    },
    {
      icon: ChartBarIcon,
      title: 'Real-time Analytics',
      description: 'Advanced insights and predictive analytics for better decisions'
    },
    {
      icon: UserGroupIcon,
      title: 'AI Support Team',
      description: 'Intelligent virtual agents available 24/7 for assistance'
    },
    {
      icon: TruckIcon,
      title: 'Smart Shipping',
      description: 'AI-powered rate negotiation for optimal savings'
    }
  ];

  const benefits = [
    'Save up to 30% with AI rate negotiation',
    'Automated customs documentation',
    'Real-time shipment tracking',
    'AI-powered rate negotiation',
    'Multi-carrier rate comparison',
    'AI-powered compliance checks'
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="animated-bg"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-xl shadow-lg"
              >
                <ShoppingBagIcon className="h-8 w-8 text-white" />
              </motion.div>
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                ExportEdge
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="btn btn-secondary"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 lg:pt-32 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Streamline Your Export Business
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              ExportEdge is your all-in-one platform for managing international trade operations. 
              From documentation to logistics, we've got you covered.
            </p>
            <div className="mt-10 flex justify-center space-x-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="px-8 py-3 text-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Start Exporting Now
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#features"
                  className="px-8 py-3 text-lg text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:text-primary-600 transition-all duration-200"
                >
                  Learn More
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything You Need to Export
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Comprehensive tools and features to manage your export business efficiently
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg p-2.5">
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Why Choose ExportEdge?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Join thousands of businesses that trust ExportEdge for their international trade operations
              </p>
              <div className="mt-8 space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircleIcon className="h-6 w-6 text-primary-500" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div 
                className="mt-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <span>Get Started</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
              </motion.div>
            </div>
            <div className="mt-10 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="Shipping Container"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <ShoppingBagIcon className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  ExportEdge
                </span>
              </div>
              <p className="mt-4 text-gray-600">
                Empowering global trade through technology
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Product
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#features" className="text-gray-600 hover:text-primary-600">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Legal
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-center text-gray-500">
              © {new Date().getFullYear()} ExportEdge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;