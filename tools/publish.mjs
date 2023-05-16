import { execaCommand } from "execa";
import path from "path";
import fs from "fs";
import { program } from "commander";
import { fileURLToPath } from "url";

const DRY_OPTIONS = [
  "--dry-run",
  "--progress",
  "--itemize-changes",
  "--verbose",
];
program.option("--dry-run", "Нужно ли запускать в тестовом режиме");

program.parse();

const args = program.opts();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ignoreFile = path.resolve(__dirname, "../rsync_ignore");
const excluded = fs.readFileSync(ignoreFile);
const ROOT_PATH = path.resolve(__dirname, "..");

console.log(ROOT_PATH);

execaCommand(
  "rsync --delete -azvrP " +
    [
      `--exclude node_modules`,
      `--exclude tools`,
      ...(args.dryRun ? DRY_OPTIONS : []),
      ".",
      "root@95.163.234.188:/root/server",
    ].join(" ")
).then(({ escapedCommand, stdout }) => console.log(stdout));
