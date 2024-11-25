import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AgentActivity as AgentActivityType } from '../../types/agents';

interface AgentActivityProps {
  activities: AgentActivityType[];
}

const AgentActivity: React.FC<AgentActivityProps> = ({ activities }) => {
  const { t } = useTranslation();

  return (
    <div className="glass-card">
      <div className="p-4 border-b">
        <h3 className="font-medium text-gray-900">Recent Activities</h3>
      </div>
      <div className="p-4">
        {activities.length === 0 ? (
          <p className="text-center text-gray-500">No recent activities</p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start space-x-3"
              >
                <div className={`p-2 rounded-full ${
                  activity.status === 'completed' ? 'bg-green-100 text-green-600' :
                  activity.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {/* Add appropriate icon based on activity type */}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{activity.action}</h4>
                    <span className="text-sm text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentActivity;