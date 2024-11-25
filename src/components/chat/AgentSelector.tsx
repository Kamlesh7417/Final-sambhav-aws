import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Agent } from '../../types/agents';

interface AgentSelectorProps {
  agents: Agent[];
  selectedAgent: Agent | null;
  onSelectAgent: (agent: Agent) => void;
  className?: string;
}

const AgentSelector: React.FC<AgentSelectorProps> = ({
  agents,
  selectedAgent,
  onSelectAgent,
  className = ''
}) => {
  const { t } = useTranslation();

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b bg-gradient-to-r from-primary-50 to-primary-100">
        <h3 className="font-medium text-gray-900">AI Assistant Team</h3>
        <p className="text-sm text-gray-600 mt-1">Choose your specialist for expert assistance</p>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4">
          {agents.map((agent) => (
            <motion.button
              key={agent.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectAgent(agent)}
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                selectedAgent?.id === agent.id
                  ? 'bg-primary-50 border-2 border-primary-500'
                  : 'border-2 border-transparent hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-12 h-12 rounded-full"
                />
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  agent.status === 'online' ? 'bg-green-500' :
                  agent.status === 'busy' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`} />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-medium text-gray-900">{agent.name}</h4>
                <p className="text-sm text-gray-500">{agent.specialty}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentSelector;