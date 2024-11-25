import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  XMarkIcon, 
  CreditCardIcon, 
  CheckIcon 
} from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { updateOrderStatusAndGenerateLabel } from '../../store/slices/orderSlice';
import confetti from 'canvas-confetti';

interface PaymentModalProps {
  amount: number;
  carrierName: string;
  orderId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  amount, 
  carrierName, 
  orderId,
  onClose, 
  onSuccess 
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [processingStep, setProcessingStep] = useState<'payment' | 'label' | 'success'>('payment');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Basic validation
      if (!cardNumber.trim() || !expiry.trim() || !cvv.trim()) {
        throw new Error('Please fill in all payment details');
      }

      if (cardNumber.replace(/\s/g, '').length !== 16) {
        throw new Error('Invalid card number');
      }

      if (cvv.length !== 3) {
        throw new Error('Invalid CVV');
      }

      const [expiryMonth, expiryYear] = expiry.split('/');
      if (!expiryMonth || !expiryYear || 
          parseInt(expiryMonth) < 1 || parseInt(expiryMonth) > 12 ||
          parseInt(expiryYear) < 23) {
        throw new Error('Invalid expiry date');
      }

      // Process payment
      setProcessingStep('payment');
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update order status and generate label
      setProcessingStep('label');
      const success = await dispatch(updateOrderStatusAndGenerateLabel(orderId, 'SHIPPED'));

      if (!success) {
        throw new Error('Failed to update order status');
      }

      // Show success and trigger confetti
      setProcessingStep('success');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Delay slightly before closing to show success state
      setTimeout(() => {
        onSuccess();
      }, 1500);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment processing failed. Please try again.');
      console.error('Payment failed:', err);
      setProcessingStep('payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg w-full max-w-md m-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CreditCardIcon className="h-6 w-6 text-primary-600" />
            <h3 className="text-xl font-semibold">Payment Details</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Amount to Pay</p>
              <p className="text-3xl font-bold text-gray-900">₹{amount.toLocaleString()}</p>
              <p className="text-sm text-gray-600 mt-1">to {carrierName}</p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="4242 4242 4242 4242"
                maxLength={19}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                  placeholder="123"
                  maxLength={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  <span>
                    {processingStep === 'payment' ? 'Processing Payment...' :
                     processingStep === 'label' ? 'Generating Label...' :
                     'Completing...'}
                  </span>
                </div>
              ) : (
                <span>Pay Now</span>
              )}
            </motion.button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            This is a demo payment. Use any card number.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentModal;