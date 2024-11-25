import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Video, MessageSquare } from 'lucide-react';
import { Agent } from '../../types/agents';

interface AIAgentChatProps {
  agent: Agent;
  onSendMessage: (message: string) => void;
  onStartCall?: () => void;
  onStartVideo?: () => void;
}

const AIAgentChat: React.FC<AIAgentChatProps> = ({
  agent,
  onSendMessage,
  onStartCall,
  onStartVideo
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-10 h-10 rounded-full"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-500">{agent.role}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {onStartCall && (
            <button
              onClick={onStartCall}
              className="p-2 text-gray-600 hover:text-primary-600 rounded-full hover:bg-gray-100"
            >
              <Phone className="h-5 w-5" />
            </button>
          )}
          {onStartVideo && (
            <button
              onClick={onStartVideo}
              className="p-2 text-gray-600 hover:text-primary-600 rounded-full hover:bg-gray-100"
            >
              <Video className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {/* Chat messages will be rendered here */}
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Send className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AIAgentChat;