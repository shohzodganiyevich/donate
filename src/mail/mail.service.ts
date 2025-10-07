import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Admin } from "../admin/models/admin.model";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(admin: Admin) {
    const url = `${process.env.API_HOST}/api/admin/activate/${admin.activation_link}`;
    // console.log(url);

    await this.mailerService.sendMail({
      to: admin.email,
      subject: "Welcome to Skidkchi App!",
      template: "./confirmation",
      context: {
        name: admin.full_name,
        url,
      },
    });
  }
}
