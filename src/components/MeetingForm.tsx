import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { departments, type Department, type Meeting } from "@/types/meeting";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

interface MeetingFormProps {
  onSubmit: (meeting: Meeting) => void;
  initialMeeting?: Meeting | null;
}

export function MeetingForm({ onSubmit, initialMeeting }: MeetingFormProps) {
  const { toast } = useToast();
  const [customerName, setCustomerName] = useState("");
  const [photoId, setPhotoId] = useState("");
  const [department, setDepartment] = useState<Department>("Other");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [waitingTime, setWaitingTime] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (initialMeeting) {
      setCustomerName(initialMeeting.customerName);
      setPhotoId(initialMeeting.photoId);
      setDepartment(initialMeeting.department);
      setStartTime(format(initialMeeting.startTime, "yyyy-MM-dd'T'HH:mm"));
      setEndTime(format(initialMeeting.endTime, "yyyy-MM-dd'T'HH:mm"));
      setWaitingTime(initialMeeting.waitingTime.toString());
      setNotes(initialMeeting.notes);
    }
  }, [initialMeeting]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName || !photoId || !startTime || !endTime) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const start = new Date(startTime);
    const end = new Date(endTime);
    const duration = Math.round((end.getTime() - start.getTime()) / (1000 * 60));

    const meeting: Meeting = {
      id: initialMeeting?.id || Math.random().toString(36).substr(2, 9),
      entryTime: initialMeeting?.entryTime || new Date(),
      customerName,
      photoId,
      department,
      startTime: start,
      endTime: end,
      duration,
      waitingTime: parseInt(waitingTime) || 0,
      notes,
      hasArrived: initialMeeting?.hasArrived || false,
      hasEnded: initialMeeting?.hasEnded || false,
      actualStartTime: initialMeeting?.actualStartTime,
      actualEndTime: initialMeeting?.actualEndTime,
    };

    onSubmit(meeting);
    toast({
      title: "Success",
      description: initialMeeting ? "Meeting has been updated" : "Meeting has been recorded",
    });

    if (!initialMeeting) {
      // Only reset form for new meetings
      setCustomerName("");
      setPhotoId("");
      setDepartment("Other");
      setStartTime("");
      setEndTime("");
      setWaitingTime("");
      setNotes("");
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name *</Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photoId">Photo ID Number *</Label>
            <Input
              id="photoId"
              value={photoId}
              onChange={(e) => setPhotoId(e.target.value)}
              placeholder="Enter photo ID"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select value={department} onValueChange={(value: Department) => setDepartment(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time *</Label>
            <Input
              id="startTime"
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endTime">End Time *</Label>
            <Input
              id="endTime"
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="waitingTime">Waiting Time (minutes)</Label>
            <Input
              id="waitingTime"
              type="number"
              value={waitingTime}
              onChange={(e) => setWaitingTime(e.target.value)}
              placeholder="Enter waiting time"
              min="0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter any additional notes"
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit" className="w-full">Record Meeting</Button>
      </form>
    </Card>
  );
}