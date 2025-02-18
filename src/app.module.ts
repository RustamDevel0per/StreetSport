import { Module } from "@nestjs/common";
import { PaymentStatusModule } from "./payment_status/payment_status.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { PaymentStatus } from "./payment_status/models/payment_status.model";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      port: Number(process.env.POSTGRES_PORT),
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [PaymentStatus],
      autoLoadModels: true,
      sync: { alter: true, force: false },
      logging: false,
    }),
    PaymentStatusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
