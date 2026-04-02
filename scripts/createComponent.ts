const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
const ejs = require("ejs");
const { validNameRegex } = require("./utilites");

const folders = ["components", "pages", "layouts"];
const parentFolder = process.argv[2];
const componentName = process.argv[3];

type TemplateSuffix = "tsx" | "module.scss" | "test.tsx" | "ts";

if (!componentName) {
  console.error("Please provide a component name as an argument.");
  process.exit(1);
}

if (!folders.includes(parentFolder)) {
  console.error(
    `Invalid folder "${parentFolder}". Please choose from: ${folders.join(", ")}`,
  );
  process.exit(1);
}

if (!validNameRegex.test(componentName)) {
  console.error(
    "Invalid component name. It should start with an uppercase letter and contain only alphanumeric characters.",
  );
  process.exit(1);
}

const componentDir = path.resolve("src", parentFolder, componentName);
if (fs.existsSync(componentDir)) {
  console.error(
    `Component "${componentName}" already exists at ${componentDir}.`,
  );
  process.exit(1);
}

try {
  fs.mkdirSync(componentDir);
} catch (error) {
  console.error(`Error creating component directory: ${error}`);
  process.exit(1);
}

ejs.renderFile(
  path.resolve("templates", "component.ejs"),
  { componentName },
  (err: Record<string, unknown>, str: string) => {
    if (err) {
      console.error(`Error rendering template: ${err}`);
      process.exit(1);
    }
    fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), str);
  },
);

const renderFromTemplate = (
  componentName: string,
  template: `${string}.ejs`,
  suffix: TemplateSuffix,
  fileName: string = componentName,
): void => {
  ejs.renderFile(
    path.resolve("templates", `${template}`),
    { componentName },
    (err: Record<string, unknown>, str: string) => {
      if (err) {
        console.error(`Error rendering ${template}: ${err}`);
        process.exit(1);
      }
      fs.writeFileSync(path.join(componentDir, `${fileName}.${suffix}`), str);
    },
  );
};

renderFromTemplate(componentName, "component.ejs", "tsx");
renderFromTemplate(componentName, "component.module.ejs", "module.scss");
renderFromTemplate(componentName, "component.test.ejs", "test.tsx");
renderFromTemplate(componentName, "component.index.ejs", "ts", "index");

/*
if (parentFolder === 'pages') {
    const output = babel.transformFileSync(fileName, {
        presets: ['@babel/preset-react', '@babel/preset-env'],
    });

    console.log(output.code);
};
*/
