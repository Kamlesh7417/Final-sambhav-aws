import { Agent } from '../types/agents';

export const agents: Agent[] = [
  {
    id: 'doc-agent',
    name: 'DocuGuard',
    role: 'Document Compliance Expert',
    avatar: 'https://ui-avatars.com/api/?name=DG&background=6366f1&color=fff',
    specialty: 'Export Documentation & Compliance',
    status: 'online',
    description: 'AI expert in handling export documentation, compliance checks, and regulatory requirements.',
    capabilities: [
      'Document validation',
      'Compliance checks',
      'Regulatory updates',
      'Certificate verification',
      'Custom declarations'
    ],
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    accentColor: '#4f46e5'
  },
  {
    id: 'negotiator-agent',
    name: 'NegotiateAI',
    role: 'AI Negotiation Specialist',
    avatar: 'https://ui-avatars.com/api/?name=NA&background=10b981&color=fff',
    specialty: 'Rate Negotiation & Cost Optimization',
    status: 'online',
    description: 'Advanced AI system for shipping rate negotiations and cost optimization.',
    capabilities: [
      'Rate analysis',
      'Cost optimization',
      'Market insights',
      'Volume discounts',
      'Contract terms'
    ],
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    accentColor: '#059669'
  },
  {
    id: 'tracking-agent',
    name: 'TrackMaster',
    role: 'Order Tracking Specialist',
    avatar: 'https://ui-avatars.com/api/?name=TM&background=f59e0b&color=fff',
    specialty: 'Real-time Tracking & Updates',
    status: 'online',
    description: 'Intelligent tracking system for real-time shipment monitoring and updates.',
    capabilities: [
      'Real-time tracking',
      'Delay predictions',
      'Route optimization',
      'ETA calculations',
      'Status updates'
    ],
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    accentColor: '#d97706'
  }
];