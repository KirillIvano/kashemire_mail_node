import { createFeedbackMail } from "../templates/createFeedbackMail";
import { BrandForm } from "../types/mail";
import { sendMailToCompany } from "./sendMail";

export const sendBrandMail = async (formInfo: BrandForm) => {
  const template = createFeedbackMail({
    subject: "Письмо от бренда",
    formInfo,
  });

  return sendMailToCompany({
    content: template,
    subject: "Новое письмо от бренда",
  });
};
