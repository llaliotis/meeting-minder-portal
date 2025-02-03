import { useState } from "react";
import { MeetingForm } from "@/components/MeetingForm";
import { MeetingsList } from "@/components/MeetingsList";
import { Meeting } from "@/types/meeting";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

const Index = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddMeeting = (meeting: Meeting) => {
    if (editingMeeting) {
      handleUpdateMeeting(meeting);
      setEditingMeeting(null);
    } else {
      setMeetings((prev) => [meeting, ...prev]);
    }
    setShowForm(false);
  };

  const handleUpdateMeeting = (updatedMeeting: Meeting) => {
    setMeetings((prev) =>
      prev.map((meeting) =>
        meeting.id === updatedMeeting.id ? updatedMeeting : meeting
      )
    );
  };

  const handleEditMeeting = (meeting: Meeting) => {
    setEditingMeeting(meeting);
    setShowForm(true);
  };

  const handleDeleteMeeting = (meetingId: string) => {
    setMeetings((prev) => prev.filter((meeting) => meeting.id !== meetingId));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Meeting Tracker</h1>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Meeting
          </Button>
        )}
      </div>
      
      {showForm ? (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {editingMeeting ? "Edit Meeting" : "Record New Meeting"}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowForm(false);
                setEditingMeeting(null);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <MeetingForm 
            onSubmit={handleAddMeeting} 
            initialMeeting={editingMeeting}
          />
        </div>
      ) : (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Today's Meetings</h2>
          <MeetingsList 
            meetings={meetings} 
            onUpdateMeeting={handleUpdateMeeting}
            onEditMeeting={handleEditMeeting}
            onDeleteMeeting={handleDeleteMeeting}
          />
        </div>
      )}
    </div>
  );
};

export default Index;