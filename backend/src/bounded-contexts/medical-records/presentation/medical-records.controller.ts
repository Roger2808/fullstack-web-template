import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateMedicalRecordUseCase } from '../application/create-medical-record.use-case';
import { ListMedicalRecordsByPatientUseCase } from '../application/list-medical-records-by-patient.use-case';
import { GetMedicalRecordUseCase } from '../application/get-medical-record.use-case';
import { CreateMedicalRecordDto } from './dtos/create-medical-record.dto';
import { MedicalRecordResponseDto } from './dtos/medical-record-response.dto';
import { JwtAuthGuard } from '../../../shared/presentation/jwt-auth.guard';

@Controller('medical-records')
@UseGuards(JwtAuthGuard)
export class MedicalRecordsController {
  constructor(
    private readonly createMedicalRecord: CreateMedicalRecordUseCase,
    private readonly listMedicalRecordsByPatient: ListMedicalRecordsByPatientUseCase,
    private readonly getMedicalRecord: GetMedicalRecordUseCase,
  ) {}

  @Get()
  async list(
    @Query('patientId') patientId: string,
  ): Promise<MedicalRecordResponseDto[]> {
    const records = await this.listMedicalRecordsByPatient.execute(patientId);
    return records.map(MedicalRecordResponseDto.fromDomain);
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<MedicalRecordResponseDto> {
    const record = await this.getMedicalRecord.execute(id);
    return MedicalRecordResponseDto.fromDomain(record);
  }

  @Post()
  async create(
    @Body() dto: CreateMedicalRecordDto,
  ): Promise<MedicalRecordResponseDto> {
    const record = await this.createMedicalRecord.execute({
      clinicId: dto.clinicId,
      patientId: dto.patientId,
      visitDate: new Date(dto.visitDate),
      diagnosis: dto.diagnosis,
      treatment: dto.treatment,
      notes: dto.notes,
    });
    return MedicalRecordResponseDto.fromDomain(record);
  }
}
