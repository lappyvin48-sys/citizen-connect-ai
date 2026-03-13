import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const TrackComplaint = () => {
  const [ticketId, setTicketId] = useState("");
  const [complaint, setComplaint] = useState<any>(null);

  const trackComplaint = async () => {
    const { data, error } = await supabase
      .from("complaints")
      .select("*")
      .eq("id", ticketId)
      .single();

    if (error) {
      alert("Complaint not found");
    } else {
      setComplaint(data);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">

      <h1 className="text-2xl font-bold mb-4">
        Track Your Complaint
      </h1>

      <div className="flex gap-2">
        <Input
          placeholder="Enter Ticket ID"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
        />

        <Button onClick={trackComplaint}>
          Track
        </Button>
      </div>

      {complaint && (
        <Card className="mt-6">
          <CardContent className="space-y-2">

            <p><strong>Title:</strong> {complaint.title}</p>

            <p><strong>Status:</strong> Pending</p>

            <p><strong>Department:</strong> {complaint.department}</p>

            <p><strong>Location:</strong> {complaint.location}</p>

            <p><strong>Urgency:</strong> {complaint.urgency}</p>

          </CardContent>
        </Card>
      )}

    </div>
  );
};

export default TrackComplaint;