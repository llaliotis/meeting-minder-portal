import { Card } from "@/components/ui/card";
import { Meeting } from "@/types/meeting";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

interface MeetingsListProps {
  meetings: Meeting[];
  onUpdateMeeting: (updatedMeeting: Meeting) => void;
}

export function MeetingsList({ meetings, onUpdateMeeting }: MeetingsListProps) {
  const { toast } = useToast();

  const handleArrivalToggle = (meeting: Meeting) => {
    const updatedMeeting = {
      ...meeting,
      hasArrived: !meeting.hasArrived
    };
    onUpdateMeeting(updatedMeeting);
    
    toast({
      title: updatedMeeting.hasArrived ? "Customer Arrived" : "Customer Not Arrived",
      description: `Status updated for ${meeting.customerName}`,
    });
  };

  return (
    <div className="space-y-4">
      {meetings.map((meeting) => (
        <Card key={meeting.id} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold">{meeting.customerName}</h3>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={meeting.hasArrived}
                    onCheckedChange={() => handleArrivalToggle(meeting)}
                    aria-label="Toggle customer arrival"
                  />
                  <span className="text-sm text-muted-foreground">
                    {meeting.hasArrived ? "Arrived" : "Not Arrived"}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                ID: {meeting.photoId} | {meeting.department}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm">
                {format(meeting.startTime, "MMM d, yyyy h:mm a")} -{" "}
                {format(meeting.endTime, "h:mm a")}
              </p>
              <p className="text-sm text-muted-foreground">
                Duration: {meeting.duration} mins | Wait: {meeting.waitingTime} mins
              </p>
            </div>
          </div>
          {meeting.notes && (
            <p className="mt-2 text-sm text-muted-foreground">{meeting.notes}</p>
          )}
        </Card>
      ))}
    </div>
  );
}