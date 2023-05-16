"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmploymentMail = void 0;
const createFeedbackMail_1 = require("../templates/createFeedbackMail");
const sendMail_1 = require("./sendMail");
const sendEmploymentMail = async (formInfo) => {
    const template = (0, createFeedbackMail_1.createFeedbackMail)({
        subject: "Письмо от потенциального сотрудника",
        formInfo,
    });
    return (0, sendMail_1.sendMailToCompany)({
        content: template,
        subject: "Новое письмо от потенциального сотрудника",
    });
};
exports.sendEmploymentMail = sendEmploymentMail;
