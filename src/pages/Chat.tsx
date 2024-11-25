import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { agents } from '../data/agents';
import { recentActivities } from '../data/mockActivities';
import AgentSelector from '../components/chat/AgentSelector';
import AgentChat from '../components/chat/AgentChat';
import AgentActivity from '../components/chat/AgentActivity';
import { Agent, AgentActivity as AgentActivityType } from '../types/agents';

const Chat: React.FC = () => {
  const { t } = useTranslation();
  const [selectedAgent, setSelectedAgent] = React.useState<Agent | null>(null);
  const [filteredActivities, setFilteredActivities] = React.useState<AgentActivityType[]>([]);

  React.useEffect(() => {
    if (selectedAgent) {
      setFilteredActivities(
        recentActivities.filter(activity => activity.agentId === selectedAgent.id)
      );
    } else {
      setFilteredActivities(recentActivities);
    }
  }, [selectedAgent]);

  return (
    <div className="space-y-6">
      <motion.h1 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent"
      >
        Chat
      </motion.h1>

      <div className="h-[calc(100vh-12rem)] grid grid-cols-12 gap-6">
        {/* Agents List */}
        <motion.div 
          className="col-span-3 glass-card overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <AgentSelector
            agents={agents}
            selectedAgent={selectedAgent}
            onSelectAgent={setSelectedAgent}
          />
        </motion.div>

        {/* Chat Area */}
        <motion.div 
          className="col-span-6 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {selectedAgent ? (
            <AgentChat
              agent={selectedAgent}
              messages={[]}
              onSendMessage={() => {}}
              onStartCall={() => {}}
              onStartVideo={() => {}}
            />
          ) : (
            <div className="h-full glass-card flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('chat.select_agent')}
                </h3>
                <p className="text-gray-500">
                  {t('chat.select_agent_desc')}
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Activity Feed */}
        <motion.div 
          className="col-span-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <AgentActivity activities={filteredActivities} />
        </motion.div>
      </div>
    </div>
  );
};

export default Chat;