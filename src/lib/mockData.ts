export type ComplaintStatus = 'open' | 'in-progress' | 'resolved' | 'escalated';
export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';
export type SentimentType = 'positive' | 'neutral' | 'negative' | 'angry';

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  department: string;
  status: ComplaintStatus;
  urgency: UrgencyLevel;
  sentiment: SentimentType;
  location: string;
  createdAt: string;
  updatedAt: string;
  citizenName: string;
  ticketId: string;
  aiSummary: string;
  language: string;
  isDuplicate: boolean;
  corruptionFlag: boolean;
}

export const DEPARTMENTS = [
  'Public Works', 'Water Supply', 'Electricity', 'Roads & Transport',
  'Health & Sanitation', 'Education', 'Revenue', 'Police', 'Housing',
  'Environment', 'Social Welfare', 'Municipal Services'
];

export const CATEGORIES = [
  'Infrastructure', 'Water', 'Power', 'Roads', 'Healthcare',
  'Education', 'Taxation', 'Law & Order', 'Housing', 'Pollution',
  'Welfare', 'Sanitation', 'Corruption', 'Other'
];

export const mockComplaints: Complaint[] = [
  {
    id: '1', title: 'Broken water pipeline on MG Road',
    description: 'There is a major water leak on MG Road near the central market. Water has been flowing for 3 days causing flooding.',
    category: 'Water', department: 'Water Supply', status: 'open', urgency: 'high',
    sentiment: 'angry', location: 'MG Road, Sector 12', createdAt: '2026-03-10T09:30:00Z',
    updatedAt: '2026-03-10T09:30:00Z', citizenName: 'Rajesh Kumar', ticketId: 'GRV-2026-001',
    aiSummary: 'Major water pipeline breach on MG Road causing flooding for 3 days. Requires immediate repair.',
    language: 'English', isDuplicate: false, corruptionFlag: false,
  },
  {
    id: '2', title: 'Street lights not working in Block C',
    description: 'All street lights in Block C residential area have been off for a week. Safety concern for residents.',
    category: 'Power', department: 'Electricity', status: 'in-progress', urgency: 'medium',
    sentiment: 'negative', location: 'Block C, Nehru Nagar', createdAt: '2026-03-08T14:15:00Z',
    updatedAt: '2026-03-11T10:00:00Z', citizenName: 'Priya Sharma', ticketId: 'GRV-2026-002',
    aiSummary: 'Street light outage in Block C residential area for 1 week. Safety issue flagged.',
    language: 'English', isDuplicate: false, corruptionFlag: false,
  },
  {
    id: '3', title: 'Garbage not collected for 2 weeks',
    description: 'Municipal garbage collection has stopped in our area. Waste is piling up and causing health hazards.',
    category: 'Sanitation', department: 'Health & Sanitation', status: 'escalated', urgency: 'critical',
    sentiment: 'angry', location: 'Gandhi Colony, Ward 5', createdAt: '2026-03-05T08:00:00Z',
    updatedAt: '2026-03-12T06:00:00Z', citizenName: 'Amit Patel', ticketId: 'GRV-2026-003',
    aiSummary: 'No garbage collection for 2 weeks in Gandhi Colony. Health hazard escalated to critical.',
    language: 'Hindi', isDuplicate: false, corruptionFlag: false,
  },
  {
    id: '4', title: 'Pothole causing accidents on NH-48',
    description: 'Large pothole on NH-48 near toll plaza has caused 3 accidents this week.',
    category: 'Roads', department: 'Roads & Transport', status: 'open', urgency: 'critical',
    sentiment: 'angry', location: 'NH-48, KM 23', createdAt: '2026-03-11T16:45:00Z',
    updatedAt: '2026-03-11T16:45:00Z', citizenName: 'Sanjay Verma', ticketId: 'GRV-2026-004',
    aiSummary: 'Dangerous pothole on NH-48 causing multiple accidents. Needs urgent repair.',
    language: 'English', isDuplicate: false, corruptionFlag: false,
  },
  {
    id: '5', title: 'Suspected bribery at land registry office',
    description: 'Officials at the land registry office are demanding extra payments for processing documents.',
    category: 'Corruption', department: 'Revenue', status: 'open', urgency: 'high',
    sentiment: 'angry', location: 'District Collectorate', createdAt: '2026-03-09T11:20:00Z',
    updatedAt: '2026-03-09T11:20:00Z', citizenName: 'Anonymous', ticketId: 'GRV-2026-005',
    aiSummary: 'Corruption report: Officials demanding bribes at land registry. AI flagged for investigation.',
    language: 'English', isDuplicate: false, corruptionFlag: true,
  },
  {
    id: '6', title: 'School building roof leaking',
    description: 'The roof of Government Primary School in Sector 7 is leaking during rain, making classrooms unusable.',
    category: 'Education', department: 'Education', status: 'in-progress', urgency: 'medium',
    sentiment: 'negative', location: 'Sector 7, Municipal Area', createdAt: '2026-03-07T13:00:00Z',
    updatedAt: '2026-03-10T15:30:00Z', citizenName: 'Meena Devi', ticketId: 'GRV-2026-006',
    aiSummary: 'Government school roof damage in Sector 7. Classrooms affected during rainfall.',
    language: 'Hindi', isDuplicate: false, corruptionFlag: false,
  },
];

export const dashboardStats = {
  total: 1247, open: 423, inProgress: 389, resolved: 398, escalated: 37,
  avgResolutionDays: 4.2, satisfactionRate: 78, corruptionFlags: 12,
};

export const categoryDistribution = [
  { name: 'Water', value: 234, fill: 'hsl(210, 80%, 52%)' },
  { name: 'Roads', value: 198, fill: 'hsl(38, 92%, 50%)' },
  { name: 'Sanitation', value: 176, fill: 'hsl(152, 60%, 40%)' },
  { name: 'Power', value: 156, fill: 'hsl(0, 72%, 51%)' },
  { name: 'Education', value: 123, fill: 'hsl(270, 50%, 50%)' },
  { name: 'Other', value: 360, fill: 'hsl(220, 15%, 60%)' },
];

export const weeklyTrend = [
  { day: 'Mon', complaints: 45, resolved: 32 },
  { day: 'Tue', complaints: 52, resolved: 41 },
  { day: 'Wed', complaints: 38, resolved: 35 },
  { day: 'Thu', complaints: 61, resolved: 44 },
  { day: 'Fri', complaints: 55, resolved: 48 },
  { day: 'Sat', complaints: 28, resolved: 22 },
  { day: 'Sun', complaints: 19, resolved: 15 },
];
