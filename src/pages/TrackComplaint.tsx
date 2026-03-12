import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ComplaintCard from '@/components/ComplaintCard';
import { mockComplaints } from '@/lib/mockData';

const TrackComplaint = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(mockComplaints);

  const search = () => {
    if (!query.trim()) { setResults(mockComplaints); return; }
    const q = query.toLowerCase();
    setResults(mockComplaints.filter(c =>
      c.ticketId.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || c.citizenName.toLowerCase().includes(q)
    ));
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-foreground">Track Complaint</h1>
      <p className="mt-1 text-sm text-muted-foreground">Search by ticket ID, name, or keyword</p>

      <div className="mt-6 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="e.g., GRV-2026-001"
            className="pl-10" onKeyDown={e => e.key === 'Enter' && search()} />
        </div>
        <Button onClick={search} className="bg-accent text-accent-foreground hover:bg-accent/90">Search</Button>
      </div>

      <div className="mt-6 space-y-3">
        {results.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">No complaints found matching your search.</p>
        ) : (
          results.map(c => <ComplaintCard key={c.id} complaint={c} />)
        )}
      </div>
    </div>
  );
};

export default TrackComplaint;
