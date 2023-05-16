"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeedbackMail = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const renderTemplate_1 = require("../utils/renderTemplate");
const template = fs_1.default
    .readFileSync(path_1.default.join(__dirname, "../../resources/mail.template.html"))
    .toString();
const renderInfoItem = (key, value) => `
<tr>
<td style="padding: 0 15px 0 0;">${key}</td>
<td style="padding: 0 0 0 15px;">${value}</td>
</tr>
`;
const createFeedbackMail = ({ subject, formInfo, }) => {
    const html = (0, renderTemplate_1.renderTemplate)(template, {
        subject,
        content: Object.entries(formInfo)
            .map(([key, value]) => renderInfoItem(key, value))
            .join(""),
    });
    return html;
};
exports.createFeedbackMail = createFeedbackMail;
