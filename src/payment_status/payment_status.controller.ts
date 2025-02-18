import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentStatusService } from './payment_status.service';
import { CreatePaymentStatusDto } from './dto/create-payment_status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment_status.dto';

@Controller('payment-status')
export class PaymentStatusController {
  constructor(private readonly paymentStatusService: PaymentStatusService) {}

  @Post()
  create(@Body() createPaymentStatusDto: CreatePaymentStatusDto) {
    return this.paymentStatusService.create(createPaymentStatusDto);
  }

  @Get()
  findAll() {
    return this.paymentStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentStatusDto: UpdatePaymentStatusDto) {
    return this.paymentStatusService.update(+id, updatePaymentStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentStatusService.remove(+id);
  }
}
