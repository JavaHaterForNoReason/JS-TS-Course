const path = require("path");
const fs = require("fs").promises;

const readDir = async (rootDir) => {
  rootDir = rootDir || path.resolve(__dirname);
  const files = await fs.readdir(rootDir);
  walk(files, rootDir);
};

const walk = async (files, rootDir) => {
  for (let file of files) {
    const filePath = path.resolve(rootDir, file);
    const stat = await fs.stat(filePath);

    if (/\.git/g.test(filePath) || /node_modules/g.test(filePath)) continue;

    if (stat.isDirectory()) {
      readDir(filePath);
      continue;
    }

    /\.js$/g.test(filePath) && console.log(filePath);
  }
};

readDir("C:\\Users\\Usuario\\Documents\\js-code");
