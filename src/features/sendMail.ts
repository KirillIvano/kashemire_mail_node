import { createTransport } from "nodemailer";
import { SOURCE_MAIL, SOURCE_SECRET, TARGET_MAIL } from "../settings";

const transporter = createTransport({
  // @ts-expect-error ошибка типов
  host: "smtp.yandex.ru",
  port: 465,
  secure: "SSL",
  auth: {
    user: SOURCE_MAIL,
    pass: SOURCE_SECRET,
  },
});

const baseParams = {
  from: SOURCE_MAIL,
  to: TARGET_MAIL,
  bcc: SOURCE_MAIL,
};

export type MessageParams = {
  subject: string;
  content: string;
};

export const sendMailToCompany = (params: MessageParams) =>
  new Promise((resolve, reject) => {
    transporter.sendMail(
      { ...baseParams, html: params.content, subject: params.subject },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
