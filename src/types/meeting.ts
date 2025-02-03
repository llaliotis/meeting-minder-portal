export type Department = 'Passport' | 'Visa' | 'Military' | 'Other';

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
  ArrivalTimestamp?: Date;
  hasEnded: boolean;
  actualStartTime?: Date;
  actualEndTime?: Date;
}

export const departments: Department[] = ['Passport', 'Visa', 'Military', 'Other'];