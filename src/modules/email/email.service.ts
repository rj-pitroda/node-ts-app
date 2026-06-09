import nodemailer from "nodemailer";
import { ENV_VAR } from "../../utils/helper.ts";

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: ENV_VAR.SMTP_HOST,
      port: Number(ENV_VAR.SMTP_PORT),
      auth: {
        user: ENV_VAR.SMTP_USER,
        pass: ENV_VAR.SMTP_PASSWORD,
      },
    });
  }

  sendEmail = async (options: {
    to: string;
    subject: string;
    html: string;
    text?: string;
  }): Promise<boolean> => {
    await this.transporter.sendMail({
      from: ENV_VAR.SMTP_FROM,
      ...options,
    });
    return true;
  };
}
