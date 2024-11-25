export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  specialty: string;
  status: 'online' | 'busy' | 'offline';
  description: string;
  capabilities: string[];
  background: string;
  accentColor: string;
}

export interface AgentMessage {
  id: string;
  agentId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'suggestion' | 'action' | 'alert';
  metadata?: {
    suggestions?: string[];
    actions?: {
      label: string;
      value: string;
    }[];
    alert?: {
      type: 'info' | 'warning' | 'error' | 'success';
      title: string;
    };
  };
}

export interface AgentActivity {
  id: string;
  agentId: string;
  action: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  details: string;
  relatedId?: string;
  type: 'document' | 'negotiation' | 'tracking';
}