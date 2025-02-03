export type Department = 'Sales' | 'Marketing' | 'Engineering' | 'HR' | 'Finance' | 'Other';

export interface Meeting {
  id: string;
  entryTime: Date;
  customerName: string;
  photoId: string;
  department: Department;
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  waitingTime: number; // in minutes
  notes: string;
  hasArrived: boolean;
  hasStarted: boolean;
  visualArrived?: boolean;
  visualArrivalTimestamp?: Date;
  hasEnded: boolean;
  actualStartTime?: Date;
  actualEndTime?: Date;
}

export const departments: Department[] = ['Sales', 'Marketing', 'Engineering', 'HR', 'Finance', 'Other'];