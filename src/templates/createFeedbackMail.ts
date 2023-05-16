import fs from "fs";
import path from "path";
import { renderTemplate } from "../utils/renderTemplate";

const template = fs
  .readFileSync(path.join(__dirname, "../../resources/mail.template.html"))
  .toString();

export type FeedbackMailParams = {
  subject: string;
  formInfo: Record<string, string>;
};

const renderInfoItem = (key: string, value: string) => `
<tr>
<td style="padding: 0 15px 0 0;">${key}</td>
<td style="padding: 0 0 0 15px;">${value}</td>
</tr>
`;

export const createFeedbackMail = ({
  subject,
  formInfo,
}: FeedbackMailParams) => {
  const html = renderTemplate(template, {
    subject,
    content: Object.entries(formInfo)
      .map(([key, value]) => renderInfoItem(key, value))
      .join(""),
  });

  return html;
};
