"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailToCompany = void 0;
const nodemailer_1 = require("nodemailer");
const settings_1 = require("../settings");
const transporter = (0, nodemailer_1.createTransport)({
    // @ts-expect-error ошибка типов
    host: "smtp.yandex.ru",
    port: 465,
    secure: "SSL",
    auth: {
        user: settings_1.SOURCE_MAIL,
        pass: settings_1.SOURCE_SECRET,
    },
});
const baseParams = {
    from: settings_1.SOURCE_MAIL,
    to: settings_1.TARGET_MAIL,
    bcc: settings_1.SOURCE_MAIL,
};
const sendMailToCompany = (params) => new Promise((resolve, reject) => {
    transporter.sendMail({ ...baseParams, html: params.content, subject: params.subject }, (err, data) => {
        if (err) {
            reject(err);
        }
        else {
            resolve(data);
        }
    });
});
exports.sendMailToCompany = sendMailToCompany;
