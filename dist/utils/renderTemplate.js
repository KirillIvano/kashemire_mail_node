"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTemplate = void 0;
const renderTemplate = (template, variables) => {
    return template.replace(/\{\{(\w+)\}\}/g, (_, variable) => {
        if (variable in variables) {
            return variables[variable];
        }
        throw new Error(`${variable} doesn't exist`);
    });
};
exports.renderTemplate = renderTemplate;
