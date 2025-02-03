import { useState } from "react";
import { MeetingForm } from "@/components/MeetingForm";
import { MeetingsList } from "@/components/MeetingsList";
import { Meeting } from "@/types/meeting";

const Index = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const handleAddMeeting = (meeting: Meeting) => {
    setMeetings((prev) => [meeting, ...prev]);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Meeting Tracker</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Record New Meeting</h2>
          <MeetingForm onSubmit={handleAddMeeting} />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Today's Meetings</h2>
          <MeetingsList meetings={meetings} />
        </div>
      </div>
    </div>
  );
};

export default Index;