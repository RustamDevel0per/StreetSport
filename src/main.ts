import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieparser from "cookie-parser";

async function bootstrap() {
  try {
    const PORT = process.env.PORT ?? 3003;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");
    app.use(cookieparser());
    app.enableCors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          "http://localhost:8000",
          "http://localhost:3000",
          "http://streetSport.uz",
          "http://api.skidkachi.uz",
          "http://skidkachi.vercel.app",
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new BadRequestException("Not allowed by Cors"));
        }
      },
    });
    const config = new DocumentBuilder()
      .setTitle("Cats example")
      .setDescription("The cats API description")
      .setVersion("1.0")
      .addTag(
        "NESTJS, valdiation,swagger,guard,sequelize,pg,mailer,bot, cookie, tokens"
      )
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, documentFactory);

    await app.listen(PORT, () => {
      console.log(
        " + ====================================================================== +"
      );
      console.log(
        `| | 🚀             Server started at: http://localhost:${PORT}           🚀 | | `
      );
      console.log(
        `| | 📚  Swagger API documentation at: http://localhost:${PORT}/api/docs  📚 | |`
      );
      console.log(
        " + ====================================================================== +"
      );
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
