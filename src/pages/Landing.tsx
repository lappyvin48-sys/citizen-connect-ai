import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, MessageSquare, Globe, BarChart3, MapPin, Shield, Mic, Bell, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';

const features = [
  { icon: Brain, title: 'NLP Classification', desc: 'AI categorizes & prioritizes complaints automatically using advanced NLP.' },
  { icon: MessageSquare, title: 'Sentiment & Urgency', desc: 'Real-time sentiment analysis and urgency detection for faster response.' },
  { icon: Globe, title: 'Multilingual Support', desc: 'File complaints in any language. AI translates and processes seamlessly.' },
  { icon: Shield, title: 'Corruption Detection', desc: 'AI flags potential corruption patterns for investigation teams.' },
  { icon: Mic, title: 'Voice & WhatsApp', desc: 'Submit complaints via voice upload or WhatsApp for easy access.' },
  { icon: MapPin, title: 'Geo-tagged Heatmaps', desc: 'Real-time complaint maps and heatmaps for geographic insights.' },
  { icon: Bell, title: 'SMS & Tracking', desc: 'Track tickets and receive SMS updates on complaint progress.' },
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Comprehensive dashboards with trends, KPIs, and department metrics.' },
];

const Landing = () => (
  <div>
    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero opacity-90" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:py-32">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">
            <Brain className="h-3.5 w-3.5" /> AI-Powered Governance
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            Citizen Grievance<br />
            <span className="text-gradient-accent">Resolution Portal</span>
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/70">
            AI-powered platform that categorizes, prioritizes, and routes citizen complaints
            to the right government department — instantly.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/submit">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 shadow-glow">
                File a Complaint <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/track">
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                Track Complaint
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Features */}
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold text-foreground">Smart Governance Features</h2>
        <p className="mt-2 text-muted-foreground">Powered by AI to transform citizen services</p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }} viewport={{ once: true }}
            className="rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated hover:-translate-y-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <f.icon className="h-5 w-5 text-accent" />
            </div>
            <h3 className="mt-4 font-display text-sm font-semibold text-card-foreground">{f.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="bg-hero py-16">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="font-display text-3xl font-bold text-primary-foreground">Ready to Transform Governance?</h2>
        <p className="mt-3 text-primary-foreground/70">Join thousands of citizens using AI to hold government accountable.</p>
        <Link to="/register">
          <Button size="lg" className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow">
            Get Started Free
          </Button>
        </Link>
      </div>
    </section>

    {/* Footer */}
    <footer className="border-t border-border bg-card py-8">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground">
        © 2026 GrievanceAI Portal. All rights reserved.
      </div>
    </footer>
  </div>
);

export default Landing;
