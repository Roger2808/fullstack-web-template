import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateInventoryItemDto {
  @IsString()
  @IsNotEmpty()
  clinicId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  sku!: string;

  @IsInt()
  @Min(0)
  quantity!: number;

  @IsInt()
  @Min(0)
  minimumStock!: number;

  @IsInt()
  @Min(0)
  unitCostCents!: number;
}
