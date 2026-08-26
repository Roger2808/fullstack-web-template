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
import { CreateInventoryItemUseCase } from '../application/create-inventory-item.use-case';
import { ListInventoryItemsUseCase } from '../application/list-inventory-items.use-case';
import { GetInventoryItemUseCase } from '../application/get-inventory-item.use-case';
import { AdjustStockUseCase } from '../application/adjust-stock.use-case';
import { CreateInventoryItemDto } from './dtos/create-inventory-item.dto';
import { AdjustStockDto } from './dtos/adjust-stock.dto';
import { InventoryItemResponseDto } from './dtos/inventory-item-response.dto';
import { JwtAuthGuard } from '../../../shared/presentation/jwt-auth.guard';

@Controller('inventory')
@UseGuards(JwtAuthGuard)
export class InventoryController {
  constructor(
    private readonly createInventoryItem: CreateInventoryItemUseCase,
    private readonly listInventoryItems: ListInventoryItemsUseCase,
    private readonly getInventoryItem: GetInventoryItemUseCase,
    private readonly adjustStock: AdjustStockUseCase,
  ) {}

  @Get()
  async list(
    @Query('clinicId') clinicId: string,
  ): Promise<InventoryItemResponseDto[]> {
    const items = await this.listInventoryItems.execute(clinicId);
    return items.map(InventoryItemResponseDto.fromDomain);
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<InventoryItemResponseDto> {
    const item = await this.getInventoryItem.execute(id);
    return InventoryItemResponseDto.fromDomain(item);
  }

  @Post()
  async create(
    @Body() dto: CreateInventoryItemDto,
  ): Promise<InventoryItemResponseDto> {
    const item = await this.createInventoryItem.execute(dto);
    return InventoryItemResponseDto.fromDomain(item);
  }

  @Patch(':id/adjust-stock')
  async adjust(
    @Param('id') id: string,
    @Body() dto: AdjustStockDto,
  ): Promise<InventoryItemResponseDto> {
    const item = await this.adjustStock.execute(id, dto.delta);
    return InventoryItemResponseDto.fromDomain(item);
  }
}
