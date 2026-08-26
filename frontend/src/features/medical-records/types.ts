export interface MedicalRecord {
  id: string;
  patientId: string;
  visitDate: string;
  diagnosis: string;
  treatment?: string;
  notes?: string;
  createdAt: string;
}

export interface CreateMedicalRecordInput {
  patientId: string;
  visitDate: string;
  diagnosis: string;
  treatment?: string;
  notes?: string;
}
