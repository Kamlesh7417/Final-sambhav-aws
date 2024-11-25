import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon,
  PaperClipIcon,
  UserIcon,
  BuildingOfficeIcon,
  TruckIcon,
  PhoneIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { Communication } from '../../store/slices/shipmentSlice';

interface ShipmentCommunicationsProps {
  communications?: Communication[];
}

const ShipmentCommunications: React.FC<ShipmentCommunicationsProps> = ({ 
  communications = [] 
}) => {
  const [newMessage, setNewMessage] = React.useState('');

  const getRoleIcon = (role: 'carrier' | 'buyer' | 'seller' | 'agent') => {
    switch (role) {
      case 'buyer':
        return UserIcon;
      case 'seller':
        return BuildingOfficeIcon;
      case 'carrier':
        return TruckIcon;
      case 'agent':
        return PhoneIcon;
    }
  };

  const getRoleColor = (role: 'carrier' | 'buyer' | 'seller' | 'agent') => {
    switch (role) {
      case 'buyer':
        return 'bg-blue-100 text-blue-600';
      case 'seller':
        return 'bg-purple-100 text-purple-600';
      case 'carrier':
        return 'bg-green-100 text-green-600';
      case 'agent':
        return 'bg-primary-100 text-primary-600';
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message handling logic here
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-6">
      {/* New Message Input */}
      <div className="glass-card p-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button 
            onClick={handleSendMessage}
            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Communications List */}
      {communications.length === 0 ? (
        <div className="glass-card p-12">
          <div className="text-center">
            <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Communications Yet</h3>
            <p className="text-gray-500">
              Start the conversation by sending a message about this shipment.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {communications.map((comm) => {
            const Icon = getRoleIcon(comm.role);
            
            return (
              <motion.div
                key={comm.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex space-x-4"
              >
                <div className={`p-2 rounded-full h-fit ${getRoleColor(comm.role)}`}>
                  <Icon className="h-5 w-5" />
                </div>
                
                <div className="flex-1 glass-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-medium text-gray-900">{comm.sender}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        ({comm.role.charAt(0).toUpperCase() + comm.role.slice(1)})
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(comm.timestamp).toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-gray-700">{comm.message}</p>
                  
                  {comm.attachments && comm.attachments.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {comm.attachments.map((attachment, i) => (
                        <a
                          key={i}
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 bg-white/50 px-3 py-1 rounded-full border border-primary-200 hover:bg-white/80 transition-colors duration-200"
                        >
                          <PaperClipIcon className="h-4 w-4" />
                          <span>{attachment.name}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShipmentCommunications;