import { Card } from "@/components/ui/card";
import { Meeting } from "@/types/meeting";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface MeetingsListProps {
  meetings: Meeting[];
  onUpdateMeeting: (updatedMeeting: Meeting) => void;
  onEditMeeting: (meeting: Meeting) => void;
  onDeleteMeeting: (meetingId: string) => void;
}

export function MeetingsList({ meetings, onUpdateMeeting, onEditMeeting, onDeleteMeeting }: MeetingsListProps) {
  const { toast } = useToast();

  const handleArrivalToggle = (meeting: Meeting) => {
    const now = new Date();
    const updatedMeeting = {
      ...meeting,
      hasArrived: !meeting.hasArrived,
      ArrivalTimestamp: !meeting.hasArrived ? now : undefined,
    };
    onUpdateMeeting(updatedMeeting);
    
    toast({
      title: updatedMeeting.hasArrived ? "Customer Arrived" : "Customer Arrival Removed",
      description: `Status updated for ${meeting.customerName}`,
    });
  };

  const handleStartToggle = (meeting: Meeting) => {
    if (!meeting.hasArrived) return;

    const now = new Date();
    const updatedMeeting = {
      ...meeting,
      hasStarted: !meeting.hasStarted,
      actualStartTime: !meeting.hasStarted ? now : undefined,
    };
    onUpdateMeeting(updatedMeeting);
    
    toast({
      title: updatedMeeting.hasStarted ? "Meeting Started" : "Meeting Start Removed",
      description: `Status updated for ${meeting.customerName}`,
    });
  };

  const handleEndToggle = (meeting: Meeting) => {
    if (!meeting.hasStarted) return;

    const now = new Date();
    const updatedMeeting = {
      ...meeting,
      hasEnded: !meeting.hasEnded,
      actualEndTime: !meeting.hasEnded ? now : undefined,
    };

    if (updatedMeeting.actualStartTime && updatedMeeting.actualEndTime) {
      const durationInMinutes = Math.round(
        (updatedMeeting.actualEndTime.getTime() - updatedMeeting.actualStartTime.getTime()) / (1000 * 60)
      );
      updatedMeeting.duration = durationInMinutes;
    }

    onUpdateMeeting(updatedMeeting);
    
    toast({
      title: updatedMeeting.hasEnded ? "Meeting Ended" : "Meeting End Removed",
      description: `Status updated for ${meeting.customerName}`,
    });
  };

  const handleDelete = (meetingId: string, customerName: string) => {
    onDeleteMeeting(meetingId);
    toast({
      title: "Meeting Deleted",
      description: `Meeting with ${customerName} has been deleted`,
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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Meeting</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete the meeting with {meeting.customerName}? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(meeting.id, meeting.customerName)}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={meeting.hasArrived ?? false}
                    onCheckedChange={() => handleArrivalToggle(meeting)}
                    aria-label="Toggle visual arrival status"
                  />
                  <span className="text-sm text-muted-foreground">
                    {meeting.hasArrived ? "Arrived" : "Not Arrived"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={meeting.hasStarted ?? false}
                    onCheckedChange={() => handleStartToggle(meeting)}
                    aria-label="Toggle meeting start"
                    disabled={!meeting.hasArrived}
                  />
                  <span className="text-sm text-muted-foreground">
                    {meeting.hasStarted ? "Started" : "Not Started"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={meeting.hasEnded ?? false}
                    onCheckedChange={() => handleEndToggle(meeting)}
                    aria-label="Toggle meeting ended"
                    disabled={!meeting.hasStarted}
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
              {meeting.ArrivalTimestamp && (
                <p className="text-sm text-muted-foreground">
                  Arrived: {format(meeting.ArrivalTimestamp, "h:mm a")}
                </p>
              )}
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