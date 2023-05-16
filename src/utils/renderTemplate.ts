export const renderTemplate = (
  template: string,
  variables: Record<string, string>
) => {
  return template.replace(/\{\{(\w+)\}\}/g, (_, variable) => {
    if (variable in variables) {
      return variables[variable] as string;
    }

    throw new Error(`${variable} doesn't exist`);
  });
};
