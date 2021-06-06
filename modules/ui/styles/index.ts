export const composeClasses = (root: string, classes: any) =>
  [root, ...Object.values(classes)].join(" ");
