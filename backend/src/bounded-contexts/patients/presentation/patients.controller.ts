import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RegisterPatientUseCase } from '../application/register-patient.use-case';
import { ListPatientsUseCase } from '../application/list-patients.use-case';
import { GetPatientUseCase } from '../application/get-patient.use-case';
import { DeactivatePatientUseCase } from '../application/deactivate-patient.use-case';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { PatientResponseDto } from './dtos/patient-response.dto';
import { JwtAuthGuard } from '../../../shared/presentation/jwt-auth.guard';

@Controller('patients')
@UseGuards(JwtAuthGuard)
export class PatientsController {
  constructor(
    private readonly registerPatient: RegisterPatientUseCase,
    private readonly listPatients: ListPatientsUseCase,
    private readonly getPatient: GetPatientUseCase,
    private readonly deactivatePatient: DeactivatePatientUseCase,
  ) {}

  @Get()
  async list(
    @Query('clinicId') clinicId: string,
  ): Promise<PatientResponseDto[]> {
    const patients = await this.listPatients.execute(clinicId);
    return patients.map(PatientResponseDto.fromDomain);
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<PatientResponseDto> {
    const patient = await this.getPatient.execute(id);
    return PatientResponseDto.fromDomain(patient);
  }

  @Post()
  async create(@Body() dto: CreatePatientDto): Promise<PatientResponseDto> {
    const patient = await this.registerPatient.execute({
      clinicId: dto.clinicId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      dateOfBirth: new Date(dto.dateOfBirth),
    });
    return PatientResponseDto.fromDomain(patient);
  }

  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: string): Promise<{ success: true }> {
    await this.deactivatePatient.execute(id);
    return { success: true };
  }
}
