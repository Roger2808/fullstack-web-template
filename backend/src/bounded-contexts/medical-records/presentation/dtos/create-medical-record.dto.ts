import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsString()
  @IsNotEmpty()
  clinicId!: string;

  @IsString()
  @IsNotEmpty()
  patientId!: string;

  @IsDateString()
  visitDate!: string;

  @IsString()
  @IsNotEmpty()
  diagnosis!: string;

  @IsOptional()
  @IsString()
  treatment?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
