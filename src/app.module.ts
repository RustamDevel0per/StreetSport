import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/model/user.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { SmsModule } from "./sms/sms.module";
import { IdentificationModule } from "./identification/identification.module";
import { UsercardModule } from "./usercard/usercard.module";
import { WalletModule } from "./wallet/wallet.module";
import { OwnerLicenseModule } from "./owner_license/owner_license.module";
import { OwnerLicense } from "./owner_license/model/owner_license.model";
import { RegionModule } from "./region/region.module";
import { DistrictModule } from "./district/district.module";
import { MediaModule } from "./media/media.module";
import { SprotVenueModule } from "./sprot-venue/sprot-venue.module";
import { CategoryModule } from "./category/category.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: `postgres`,
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      port: Number(process.env.POSTGRES_PORT),
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, OwnerLicense],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    AuthModule,
    UsersModule,
    SmsModule,
    IdentificationModule,
    UsercardModule,
    WalletModule,
    OwnerLicenseModule,
    RegionModule,
    DistrictModule,
    MediaModule,
    SprotVenueModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
