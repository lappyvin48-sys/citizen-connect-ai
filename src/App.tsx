import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navbar from "@/components/Navbar";
import ChatbotWidget from "@/components/ChatbotWidget";

import Landing from "./pages/Landing";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import SubmitComplaint from "./pages/SubmitComplaint";
import TrackComplaint from "./pages/TrackComplaint";
import ComplaintMap from "./pages/ComplaintMap";
import NotFound from "./pages/NotFound";
import AIAssistant from "./pages/AIAssistant";
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>

        <Toaster />
        <Sonner />

        <BrowserRouter>

          {/* Navbar appears on all pages */}
          <Navbar />

          <Routes>

            {/* Landing Page */}
            <Route path="/" element={<Landing />} />

            {/* Authentication */}
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* File Complaint */}
            <Route path="/submit" element={<SubmitComplaint />} />

            {/* Track Complaint */}
            <Route path="/track" element={<TrackComplaint />} />

            {/* Complaint Map */}
            <Route path="/map" element={<ComplaintMap />} />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
            <Route path="/assistant" element={<AIAssistant />} />

          </Routes>

          {/* AI Chatbot */}
          <ChatbotWidget />

        </BrowserRouter>

      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;