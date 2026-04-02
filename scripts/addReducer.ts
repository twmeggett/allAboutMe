const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const { validNameRegex } = require("./utilites");

const reducerName = process.argv[2];

if (!reducerName) {
  console.error("Please provide a reducer name as an argument.");
  process.exit(1);
}

if (!validNameRegex.test(reducerName)) {
  console.error(
    "Invalid reducer name. It should start with an uppercase letter and contain only alphanumeric characters.",
  );
  process.exit(1);
}

const reducerDir = path.resolve("src", "store", "reducers", reducerName);
if (fs.existsSync(reducerDir)) {
  console.error(`Reducer "${reducerName}" already exists at ${reducerDir}.`);
  process.exit(1);
}

try {
  fs.mkdirSync(reducerDir);
} catch (error) {
  console.error(`Error creating reducer directory: ${error}`);
  process.exit(1);
}

ejs.renderFile(
  path.resolve("templates", "reducer.ejs"),
  { reducerName },
  (err: Record<string, unknown>, str: string) => {
    if (err) {
      console.error(`Error rendering template: ${err}`);
      process.exit(1);
    }
    fs.writeFileSync(path.join(reducerDir, `${reducerName}Slice.ts`), str);
  },
);

ejs.renderFile(
  path.resolve("templates", "reducer.test.ejs"),
  { reducerName },
  (err: Record<string, unknown>, str: string) => {
    if (err) {
      console.error(`Error rendering test template: ${err}`);
      process.exit(1);
    }
    fs.writeFileSync(path.join(reducerDir, `${reducerName}Slice.test.ts`), str);
  },
);
