import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const botResponses: Record<string, string> = {
  default: "I'm the GrievanceAI assistant. I can help you file complaints, check status, or answer questions about government services. How can I help?",
  status: "To check your complaint status, please go to the **Track** page and enter your ticket ID (e.g., GRV-2026-001).",
  file: "You can file a new complaint from the **File Complaint** page. Our AI will automatically categorize, detect urgency, and route it to the right department.",
  help: "I can help with:\n• Filing a new complaint\n• Tracking existing complaints\n• Understanding department routing\n• Reporting corruption\n\nWhat would you like to do?",
};

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: botResponses.default, sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);

    const lower = input.toLowerCase();
    let response = botResponses.default;
    if (lower.includes('status') || lower.includes('track')) response = botResponses.status;
    else if (lower.includes('file') || lower.includes('complaint') || lower.includes('submit')) response = botResponses.file;
    else if (lower.includes('help') || lower.includes('what')) response = botResponses.help;

    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response, sender: 'bot' }]);
    }, 600);
    setInput('');
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 z-50 flex h-[28rem] w-[22rem] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elevated"
          >
            <div className="bg-hero flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary-foreground" />
                <span className="font-display text-sm font-semibold text-primary-foreground">AI Assistant</span>
              </div>
              <button onClick={() => setOpen(false)}><X className="h-4 w-4 text-primary-foreground/70 hover:text-primary-foreground" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                    m.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-3 flex gap-2">
              <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask me anything..."
                onKeyDown={e => e.key === 'Enter' && send()} className="text-sm" />
              <Button size="icon" onClick={send} className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent shadow-glow transition-colors hover:bg-accent/90"
      >
        {open ? <X className="h-6 w-6 text-accent-foreground" /> : <MessageCircle className="h-6 w-6 text-accent-foreground" />}
      </motion.button>
    </>
  );
};

export default ChatbotWidget;
