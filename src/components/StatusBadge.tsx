import { ComplaintStatus, UrgencyLevel, SentimentType } from '@/lib/mockData';

export const StatusBadge = ({ status }: { status: ComplaintStatus }) => {
  const styles: Record<ComplaintStatus, string> = {
    open: 'status-open text-warning-foreground',
    'in-progress': 'status-progress text-info-foreground',
    resolved: 'status-resolved text-success-foreground',
    escalated: 'bg-urgent text-urgent-foreground',
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status]}`}>{status}</span>;
};

export const UrgencyBadge = ({ level }: { level: UrgencyLevel }) => {
  const styles: Record<UrgencyLevel, string> = {
    low: 'bg-secondary text-secondary-foreground',
    medium: 'bg-accent/20 text-accent-foreground',
    high: 'bg-urgent/20 text-urgent',
    critical: 'bg-urgent text-urgent-foreground animate-pulse',
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[level]}`}>{level}</span>;
};

export const SentimentBadge = ({ sentiment }: { sentiment: SentimentType }) => {
  const emojis: Record<SentimentType, string> = { positive: '😊', neutral: '😐', negative: '😟', angry: '😡' };
  return <span className="text-sm">{emojis[sentiment]}</span>;
};
