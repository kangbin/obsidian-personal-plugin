import { type TAbstractFile, TFolder } from "obsidian";

export function isFolder(file: TAbstractFile): boolean {
  return file instanceof TFolder;
}
