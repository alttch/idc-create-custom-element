#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const argv = require("minimist")(process.argv.slice(2));
const module_name = argv._[0];

const usage = () => {
  console.log("Usage: idc-create-custom-element [options] <module_name>");
  console.log("Options:");
  console.log("  -b <bundler>     Specify bundler: webpack (default) or vite");
  console.log("  -h, --help       Display this help");
};

if (argv.h || argv.help) {
  usage();
  process.exit(0);
}

if (!module_name) {
  usage();
  process.exit(1);
}
if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(module_name)) {
  console.error(
    "Invalid name. Must start with a letter and contain only alphanumeric characters and underscores."
  );
  process.exit(1);
}

console.log(`Creating custom IDC element module ${module_name}...`);

fs.mkdirSync(module_name);
process.chdir(module_name);
fs.mkdirSync("src");

const bundler = argv.b || "webpack";
if (bundler !== "webpack" && bundler !== "vite") {
  console.error("Unsupported bundler");
  usage();
  process.exit(1);
}

const tplDir = path.join(__dirname, `tpl-${bundler}`);
const files = fs.readdirSync(tplDir);

files.forEach((file) => {
  const content = fs.readFileSync(path.join(tplDir, file), "utf-8");
  const newContent = content.replaceAll(/%NAME%/g, module_name);
  const out = file.endsWith(".tsx") ? path.join("src", file) : file;
  fs.writeFileSync(out, newContent);
});

console.log("Done! 🎉");
console.log("");
console.log(`Change to the project directory: \`cd ${module_name}\``);
console.log("");
console.log("Run `npm install` to install dependencies.");
console.log("Run `npm run build` to build the project.");
console.log(
  "Run `npm run install-local` to install the module into local EVA ICS instance."
);
console.log(
  "Run `npm run upload` to upload the module to the remote EVA ICS instance."
);
console.log("");
console.log(
  "For help visit: https://info.bma.ai/en/actual/eva4/va/opcentre-custom-elements.html"
);
console.log("Happy coding!");
