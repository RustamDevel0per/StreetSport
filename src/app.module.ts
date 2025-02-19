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
import { Region } from "./region/entities/region.entity";
import { DistrictModule } from "./district/district.module";
import { District } from "./district/entities/district.entity";
import { CategoryModule } from "./category/category.module";
import { Category } from "./category/entities/category.entity";
import { SprotVenueModule } from "./sprot-venue/sprot-venue.module";
import { SportVenue } from "./sprot-venue/entities/sprot-venue.entity";
import { MediaModule } from "./media/media.module";
import { Media } from "./media/entities/media.entity";

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
      models: [
        User,
        OwnerLicense,
        Region,
        District,
        Category,
        SportVenue,
        Media,
      ],
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
    CategoryModule,
    SprotVenueModule,
    MediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
