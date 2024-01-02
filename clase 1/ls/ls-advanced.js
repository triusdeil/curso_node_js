const fs = require("node:fs");

const folder = process.argv[2] ?? "."

fs.readdir(folder)
    