import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetDashboardSummaryUseCase } from '../application/get-dashboard-summary.use-case';
import { DashboardSummaryResponseDto } from './dtos/dashboard-summary-response.dto';
import { JwtAuthGuard } from '../../../shared/presentation/jwt-auth.guard';

@Controller('reporting')
@UseGuards(JwtAuthGuard)
export class ReportingController {
  constructor(
    private readonly getDashboardSummary: GetDashboardSummaryUseCase,
  ) {}

  @Get('summary')
  async summary(
    @Query('clinicId') clinicId: string,
  ): Promise<DashboardSummaryResponseDto> {
    const result = await this.getDashboardSummary.execute(clinicId);
    return DashboardSummaryResponseDto.fromDomain(result);
  }
}
