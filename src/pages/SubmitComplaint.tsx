import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, MapPin, Mic, Upload, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CATEGORIES, DEPARTMENTS } from '@/lib/mockData';
import { toast } from 'sonner';

const SubmitComplaint = () => {
  const [description, setDescription] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<null | { category: string; urgency: string; sentiment: string; department: string; summary: string }>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const analyzeWithAI = () => {
    if (description.length < 20) { toast.error('Please provide more detail'); return; }
    setAnalyzing(true);
    setTimeout(() => {
      setAiAnalysis({
        category: 'Infrastructure',
        urgency: description.toLowerCase().includes('danger') || description.toLowerCase().includes('accident') ? 'Critical' : 'Medium',
        sentiment: description.includes('!') ? 'Negative' : 'Neutral',
        department: 'Public Works',
        summary: description.slice(0, 100) + (description.length > 100 ? '...' : ''),
      });
      setAnalyzing(false);
      toast.success('AI analysis complete!');
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Complaint submitted! Ticket ID: GRV-2026-007');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-foreground">File a Complaint</h1>
      <p className="mt-1 text-sm text-muted-foreground">AI will auto-classify and route your complaint</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <Label>Complaint Title</Label>
          <Input placeholder="Brief title of your grievance" className="mt-1" required />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea placeholder="Describe your issue in detail..." rows={5} className="mt-1"
            value={description} onChange={e => setDescription(e.target.value)} required />
          <div className="mt-2 flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={analyzeWithAI} disabled={analyzing}
              className="gap-1.5 text-xs">
              <Brain className="h-3.5 w-3.5" /> {analyzing ? 'Analyzing...' : 'AI Analyze'}
            </Button>
            <Button type="button" variant="outline" size="sm" className="gap-1.5 text-xs">
              <Mic className="h-3.5 w-3.5" /> Voice Input
            </Button>
          </div>
        </div>

        {aiAnalysis && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-accent/30 bg-accent/5 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-accent">
              <Brain className="h-4 w-4" /> AI Analysis
            </div>
            <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <div><span className="text-muted-foreground">Category:</span> <strong>{aiAnalysis.category}</strong></div>
              <div><span className="text-muted-foreground">Urgency:</span> <strong>{aiAnalysis.urgency}</strong></div>
              <div><span className="text-muted-foreground">Sentiment:</span> <strong>{aiAnalysis.sentiment}</strong></div>
              <div><span className="text-muted-foreground">Route to:</span> <strong>{aiAnalysis.department}</strong></div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground"><strong>Summary:</strong> {aiAnalysis.summary}</p>
          </motion.div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Category</Label>
            <Select>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Auto-detected or select" /></SelectTrigger>
              <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label>Department</Label>
            <Select>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Auto-routed or select" /></SelectTrigger>
              <SelectContent>{DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Location</Label>
          <div className="relative mt-1">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Address or area" className="pl-10" />
          </div>
        </div>

        <div>
          <Label>Attachments</Label>
          <div className="mt-1 flex items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 px-4 py-8">
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Drop files here or click to upload</p>
              <p className="text-xs text-muted-foreground">Images, documents, audio</p>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
          <Send className="h-4 w-4" /> Submit Complaint
        </Button>
      </form>
    </div>
  );
};

export default SubmitComplaint;
