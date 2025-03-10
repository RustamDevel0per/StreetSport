import { Injectable } from '@nestjs/common';
import { CreatePaymentStatusDto } from './dto/create-payment_status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment_status.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentStatus } from './models/payment_status.model';

@Injectable()
export class PaymentStatusService {

  constructor(
    @InjectModel(PaymentStatus) private readonly paymentStatusModel : typeof PaymentStatus 
  ){}

  create(createPaymentStatusDto: CreatePaymentStatusDto) {
    return this.paymentStatusModel.create(createPaymentStatusDto)
  }

  findAll() {
    return this.paymentStatusModel.findAll()
  }

  findOne(id: number) {
    return this.paymentStatusModel.findByPk(id)
  }

  async update(id: number, updatePaymentStatusDto: UpdatePaymentStatusDto) {
    const paymentStatus = await this.paymentStatusModel.update(updatePaymentStatusDto, {where:{id}, returning:true})[1][0] 
    return paymentStatus
  }

  remove(id: number) {
    return this.paymentStatusModel.destroy({where:{id}})
  }
}
