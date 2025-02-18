import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const PORT = process.env.PORT || 3030;
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
      origin: "*",
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentials:true //cookie va header
    });
    const config = new DocumentBuilder()
      .setTitle("StreetSport.uz")
      .setVersion("v01")
      .addBearerAuth(
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "JWT",
          description: "Enter JWT token",
          in: "header",
        },
        "street_sport"
      )

      .build()
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api/docs", app, document, {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    });


  await app.listen(PORT, () => {
    console.log("\n\n + ====================================================================== +");
    console.log(`| |                                                                      | | `);
    console.log(`| | 🚀             Server started at: http://localhost:${PORT}           🚀 | | `);
    console.log(`| |                                                                      | | `);
    console.log(`| | 📚  Swagger API documentation at: http://localhost:${PORT}/api/docs  📚 | |`);
    console.log(`| |                                                                      | | `);
    console.log(" + ====================================================================== +");
  });
}
bootstrap();
