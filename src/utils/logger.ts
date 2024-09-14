import { moment } from "obsidian";

function buildMessage(msg: string, level: string): string {
  return `[${moment().format(
    "YYYY-MM-DD HH:mm:ss"
  )}] [OBSIDIAN_PLUGIN] [${level}] ${msg}`;
}

export function info(msg: string) {
  console.info(buildMessage(msg, "INFO"));
}
