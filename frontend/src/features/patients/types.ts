export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth: string;
  active: boolean;
}

export interface CreatePatientInput {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth: string;
}
