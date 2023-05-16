import { createFeedbackMail } from "../templates/createFeedbackMail";
import { EmploymentForm } from "../types/mail";
import { sendMailToCompany } from "./sendMail";

export const sendEmploymentMail = async (formInfo: EmploymentForm) => {
  const template = createFeedbackMail({
    subject: "Письмо от потенциального сотрудника",
    formInfo,
  });

  return sendMailToCompany({
    content: template,
    subject: "Новое письмо от потенциального сотрудника",
  });
};
