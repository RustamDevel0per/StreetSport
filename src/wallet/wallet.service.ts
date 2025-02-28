import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Wallet } from './models/wallet.model';

@Injectable()
export class WalletService {

  constructor(
    @InjectModel(Wallet) private readonly walletService : typeof Wallet
  ){}

  create(createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto)
  }

  findAll() {
    return this.walletService.findAll()
  }

  findOne(id: number) {
    return this.walletService.findByPk(id)
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(updateWalletDto,{where:{id}, returning:true})
  }

  remove(id: number) {
    return this.walletService.destroy({where:{id}})
  }
}
