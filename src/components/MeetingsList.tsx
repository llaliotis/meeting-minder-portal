import { Card } from "@/components/ui/card";
import { Meeting } from "@/types/meeting";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface MeetingsListProps {
  meetings: Meeting[];
  onUpdateMeeting: (updatedMeeting: Meeting) => void;
  onEditMeeting: (meeting: Meeting) => void;
}

export function MeetingsList({ meetings, onUpdateMeeting, onEditMeeting }: MeetingsListProps) {
  const { toast } = useToast();

  const handleArrivalToggle = (meeting: Meeting) => {
    const now = new Date();
    const updatedMeeting = {
      ...meeting,
      hasArrived: !meeting.hasArrived,
      actualStartTime: !meeting.hasArrived ? now : meeting.actualStartTime,
    };
    onUpdateMeeting(updatedMeeting);
    
    toast({
      title: updatedMeeting.hasArrived ? "Customer Arrived" : "Customer Not Arrived",
      description: `Status updated for ${meeting.customerName}`,
    });
  };

  const handleEndToggle = (meeting: Meeting) => {
    const now = new Date();
    const updatedMeeting = {
      ...meeting,
      hasEnded: !meeting.hasEnded,
      actualEndTime: !meeting.hasEnded ? now : meeting.actualEndTime,
    };

    // Calculate actual duration if both start and end times are available
    if (updatedMeeting.actualStartTime && updatedMeeting.actualEndTime) {
      const durationInMinutes = Math.round(
        (updatedMeeting.actualEndTime.getTime() - updatedMeeting.actualStartTime.getTime()) / (1000 * 60)
      );
      updatedMeeting.duration = durationInMinutes;
    }

    onUpdateMeeting(updatedMeeting);
    
    toast({
      title: updatedMeeting.hasEnded ? "Meeting Ended" : "Meeting Ongoing",
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
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditMeeting(meeting)}
                  className="h-8 w-8"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-4 mb-2">
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
                <div className="flex items-center gap-2">
                  <Switch
                    checked={meeting.hasEnded}
                    onCheckedChange={() => handleEndToggle(meeting)}
                    aria-label="Toggle meeting ended"
                    disabled={!meeting.hasArrived}
                  />
                  <span className="text-sm text-muted-foreground">
                    {meeting.hasEnded ? "Ended" : "Ongoing"}
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
              {meeting.actualStartTime && (
                <p className="text-sm text-muted-foreground">
                  Started: {format(meeting.actualStartTime, "h:mm a")}
                </p>
              )}
              {meeting.actualEndTime && (
                <p className="text-sm text-muted-foreground">
                  Ended: {format(meeting.actualEndTime, "h:mm a")}
                </p>
              )}
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