import type { ExplorerLeaf, FileItem } from "../../types/obsidian";
import { ICON_CLASS } from "./const";
import { isFolder } from "../../helpers/file";
import { type IconPlugin } from "./index";
import { insertIcon } from "./helper";

export class IconPluginService {
  constructor(private plugin: IconPlugin) {
    this.plugin = plugin;
  }

  addIcons() {
    this.traverse((_: string, fileItem: FileItem) => {
      const { selfEl, innerEl, file } = fileItem;

      // 如果已经有图标了，就不重复添加了
      if (selfEl.querySelectorAll(`.${ICON_CLASS}`).length) {
        return;
      }

      if (isFolder(file)) {
        insertIcon(selfEl, innerEl, "folder-open");
        insertIcon(selfEl, innerEl, "folder-closed");
      } else {
        insertIcon(selfEl, innerEl, "file");
      }
    });
  }

  removeIcons() {
    this.traverse((_: string, fileItem: FileItem) => {
      Array.from(fileItem.selfEl.querySelectorAll(`.${ICON_CLASS}`)).forEach(
        (el) => el.remove()
      );
    });
  }

  /**
   * 相关 API 使用，参考了插件 [FlorianWoelki/obsidian-iconize: Simply add icons to anything you want in Obsidian](https://github.com/FlorianWoelki/obsidian-iconize)。
   *
   * 路径：src/lib/icon.ts#addAll
   */
  private traverse(callback: (filePath: string, fileItem: FileItem) => void) {
    const fileExplorers = this.plugin.app.workspace.getLeavesOfType(
      "file-explorer"
    ) as ExplorerLeaf[];

    fileExplorers.forEach(({ view: { fileItems } }) => {
      Object.keys(fileItems).forEach((filePath) => {
        callback(filePath, fileItems[filePath]);
      });
    });
  }
}
