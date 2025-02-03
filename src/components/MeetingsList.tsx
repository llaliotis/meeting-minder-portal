import { Card } from "@/components/ui/card";
import { Meeting } from "@/types/meeting";
import { format } from "date-fns";

export function MeetingsList({ meetings }: { meetings: Meeting[] }) {
  return (
    <div className="space-y-4">
      {meetings.map((meeting) => (
        <Card key={meeting.id} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">{meeting.customerName}</h3>
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