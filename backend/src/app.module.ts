import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import type { SignOptions } from 'jsonwebtoken';
import { PrismaModule } from './shared/infrastructure/prisma.module';
import { IdentityModule } from './bounded-contexts/identity/identity.module';
import { ContactModule } from './bounded-contexts/contact/contact.module';
import { PatientsModule } from './bounded-contexts/patients/patients.module';
import { AppointmentsModule } from './bounded-contexts/appointments/appointments.module';
import { MedicalRecordsModule } from './bounded-contexts/medical-records/medical-records.module';
import { BillingModule } from './bounded-contexts/billing/billing.module';
import { InventoryModule } from './bounded-contexts/inventory/inventory.module';
import { ReportingModule } from './bounded-contexts/reporting/reporting.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') ?? 'dev-only-insecure-secret',
        signOptions: {
          expiresIn: (config.get<string>('JWT_EXPIRES_IN') ??
            '8h') as SignOptions['expiresIn'],
        },
      }),
    }),
    PrismaModule,
    IdentityModule,
    ContactModule,
    PatientsModule,
    AppointmentsModule,
    MedicalRecordsModule,
    BillingModule,
    InventoryModule,
    ReportingModule,
  ],
})
export class AppModule {}
