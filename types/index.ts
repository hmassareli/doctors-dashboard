export enum Status {
  Pending = "pending",
  Completed = "completed",
  Cancelled = "cancelled",
  Absent = "absent",
}

export enum AppointmentType {
  FirstVisit = "firstVisit",
  FollowUp = "followUp",
  CheckUp = "checkUp",
  Exam = "exam",
  Surgery = "surgery",
}

export enum Specialty {
  Cardiology = "cardiology",
  Neurology = "neurology",
  General = "general",
}

export type Appointment = {
  id: number;
  specialty: Specialty;
  type: AppointmentType;
  description: string;
  notes: string;
  patientId: number;
  startTime: string;
  endTime: string | null;
  status: Status;
};

export type Patient = {
  id: number;
  name: string;
  document: string;
  healthSystemId: string;
  birthday: string;
  insurancePlan: InsurancePlan;
};

export enum InsurancePlan {
  Regional = "Regional",
  NationalBasic = "National Basic",
  NationalPremium = "National Premium",
  International = "International",
  Diamond = "Diamond",
}
