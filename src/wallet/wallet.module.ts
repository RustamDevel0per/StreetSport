import { Module } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { WalletController } from "./wallet.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Wallet } from "./models/wallet.model";
import { User } from "../users/model/user.model";

@Module({
    imports: [SequelizeModule.forFeature([Wallet, User])],
    controllers: [WalletController],
    providers: [WalletService],
})
export class WalletModule {}
