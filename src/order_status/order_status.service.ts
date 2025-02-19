import { Injectable } from '@nestjs/common';
import { CreateOrderStatusDto } from './dto/create-order_status.dto';
import { UpdateOrderStatusDto } from './dto/update-order_status.dto';
import { InjectModel } from '@nestjs/sequelize';
import { OrderStatus } from './models/order_status.model';

@Injectable()
export class OrderStatusService {
  constructor(@InjectModel(OrderStatus) private readonly orderStatusModel: typeof OrderStatus) {}
  create(createOrderStatusDto: CreateOrderStatusDto) {
    return this.orderStatusModel.create(createOrderStatusDto)
  }

  findAll() {
    return this.orderStatusModel.findAll()
  }

  findOne(id: number) {
    return  this.orderStatusModel.findByPk(id)
  }

  update(id: number, updateOrderStatusDto: UpdateOrderStatusDto) {
    return this.orderStatusModel.update(updateOrderStatusDto, {where:{id}})
  }

  remove(id: number) {
    return this.orderStatusModel.destroy({where:{id}})
  }
}
