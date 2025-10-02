import { Module } from "@nestjs/common";
import { RecipientModule } from "./recipient/recipient.module";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { CardModule } from './card/card.module';
import { SocialmediaModule } from './socialmedia/socialmedia.module';
import { RecipientsocialModule } from './recipientsocial/recipientsocial.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      logging: true,
      sync: { alter: true },
    }),
    RecipientModule,
    CardModule,
    SocialmediaModule,
    RecipientsocialModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
