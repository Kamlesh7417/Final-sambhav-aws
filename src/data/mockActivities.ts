import { AgentActivity } from '../types/agents';
import { v4 as uuidv4 } from 'uuid';

const now = new Date();
const minutesAgo = (minutes: number) => new Date(now.getTime() - minutes * 60000).toISOString();

export const recentActivities: AgentActivity[] = [
  // Document Compliance Agent Activities
  {
    id: uuidv4(),
    agentId: 'doc-agent',
    action: 'Certificate of Origin Verified',
    timestamp: minutesAgo(5),
    status: 'completed',
    details: 'Successfully validated Certificate of Origin for Order #ORD123',
    relatedId: 'ORD123',
    type: 'document'
  },
  {
    id: uuidv4(),
    agentId: 'doc-agent',
    action: 'Compliance Check',
    timestamp: minutesAgo(15),
    status: 'completed',
    details: 'Performed regulatory compliance check for shipment to UAE',
    relatedId: 'SHP456',
    type: 'document'
  },
  {
    id: uuidv4(),
    agentId: 'doc-agent',
    action: 'Document Update Required',
    timestamp: minutesAgo(30),
    status: 'pending',
    details: 'Phytosanitary certificate needs renewal for Order #ORD789',
    relatedId: 'ORD789',
    type: 'document'
  },

  // AI Negotiator Activities
  {
    id: uuidv4(),
    agentId: 'negotiator-agent',
    action: 'Rate Negotiation Success',
    timestamp: minutesAgo(10),
    status: 'completed',
    details: 'Secured 15% discount on air freight rates with DHL',
    relatedId: 'NEG001',
    type: 'negotiation'
  },
  {
    id: uuidv4(),
    agentId: 'negotiator-agent',
    action: 'Volume Discount Applied',
    timestamp: minutesAgo(25),
    status: 'completed',
    details: 'Applied bulk shipping discount for 10 containers',
    relatedId: 'NEG002',
    type: 'negotiation'
  },
  {
    id: uuidv4(),
    agentId: 'negotiator-agent',
    action: 'Rate Analysis',
    timestamp: minutesAgo(45),
    status: 'pending',
    details: 'Analyzing competitive rates for Europe-bound shipments',
    relatedId: 'NEG003',
    type: 'negotiation'
  },

  // Order Tracking Agent Activities
  {
    id: uuidv4(),
    agentId: 'tracking-agent',
    action: 'Delay Alert',
    timestamp: minutesAgo(8),
    status: 'pending',
    details: 'Potential delay detected for SHP789 at Dubai customs',
    relatedId: 'SHP789',
    type: 'tracking'
  },
  {
    id: uuidv4(),
    agentId: 'tracking-agent',
    action: 'Route Optimization',
    timestamp: minutesAgo(20),
    status: 'completed',
    details: 'Optimized route calculated for shipment SHP456',
    relatedId: 'SHP456',
    type: 'tracking'
  },
  {
    id: uuidv4(),
    agentId: 'tracking-agent',
    action: 'ETA Update',
    timestamp: minutesAgo(40),
    status: 'completed',
    details: 'Updated arrival time for Order #ORD123 - ahead of schedule',
    relatedId: 'ORD123',
    type: 'tracking'
  }
];