import { MapPin, Clock, AlertTriangle, Building } from 'lucide-react';
import { Complaint } from '@/lib/mockData';
import { StatusBadge, UrgencyBadge, SentimentBadge } from './StatusBadge';

const ComplaintCard = ({ complaint }: { complaint: Complaint }) => {
  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days > 0) return `${days}d ago`;
    const hours = Math.floor(diff / 3600000);
    return hours > 0 ? `${hours}h ago` : 'Just now';
  };

  return (
    <div className={`rounded-xl border bg-card p-5 shadow-card transition-all hover:shadow-elevated ${complaint.corruptionFlag ? 'border-urgent/50 ring-1 ring-urgent/20' : 'border-border'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs text-muted-foreground">{complaint.ticketId}</span>
            <StatusBadge status={complaint.status} />
            <UrgencyBadge level={complaint.urgency} />
            <SentimentBadge sentiment={complaint.sentiment} />
            {complaint.corruptionFlag && (
              <span className="inline-flex items-center gap-1 rounded-full bg-urgent/10 px-2 py-0.5 text-xs font-semibold text-urgent">
                <AlertTriangle className="h-3 w-3" /> Corruption
              </span>
            )}
          </div>
          <h3 className="mt-2 font-display text-base font-semibold text-card-foreground">{complaint.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{complaint.aiSummary}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Building className="h-3 w-3" />{complaint.department}</span>
        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{complaint.location}</span>
        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{timeAgo(complaint.createdAt)}</span>
        {complaint.language !== 'English' && (
          <span className="rounded bg-secondary px-1.5 py-0.5">{complaint.language}</span>
        )}
      </div>
    </div>
  );
};

export default ComplaintCard;
