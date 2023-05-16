"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBrandMail = void 0;
const createFeedbackMail_1 = require("../templates/createFeedbackMail");
const sendMail_1 = require("./sendMail");
const sendBrandMail = async (formInfo) => {
    const template = (0, createFeedbackMail_1.createFeedbackMail)({
        subject: "Письмо от бренда",
        formInfo,
    });
    return (0, sendMail_1.sendMailToCompany)({
        content: template,
        subject: "Новое письмо от бренда",
    });
};
exports.sendBrandMail = sendBrandMail;
