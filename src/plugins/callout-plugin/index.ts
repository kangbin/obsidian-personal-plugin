import {
  type App,
  type Editor,
  type Menu,
  type PluginManifest,
  Plugin,
} from "obsidian";
import { info } from "../../utils/logger";
import { separator, submenuTexts } from "./config";

export class CalloutPlugin extends Plugin {
  constructor(app: App, manifest: PluginManifest) {
    super(app, manifest);
  }

  async onload() {
    info(`CalloutPlugin onload`);

    const {
      app: { workspace },
    } = this;

    workspace.on("editor-menu", this.handleEditorMenu);
  }

  onunload() {
    info(`CalloutPlugin onunload`);

    const {
      app: { workspace },
    } = this;

    workspace.off("editor-menu", this.handleEditorMenu);
  }

  private handleEditorMenu = (menu: Menu, editor: Editor) => {
    menu.addItem((item) => {
      item.setTitle("插入高亮块");

      // https://github.com/mProjectsCode/obsidian-meta-bind-plugin/blob/4b16a75fb63dfdb34e3ccf2756a324a84dd8fd85/packages/obsidian/src/EditorMenu.ts#L17-L30
      // https://forum.obsidian.md/t/make-setsubmenu-public-api/59175/2
      this.generateSubmenu(editor, item.setSubmenu());
    });
  };

  private generateSubmenu(editor: Editor, submenu: Menu) {
    submenuTexts.forEach((title) => {
      if (title === separator) {
        submenu.addSeparator();
      } else {
        submenu.addItem((item) => {
          item.setTitle(title);
          item.onClick(() => this.insertText(editor, title2content(title)));
        });
      }
    });
  }

  private insertText(editor: Editor, text: string) {
    const cursor = editor.getCursor();
    editor.replaceRange(text, cursor);
    editor.setCursor({
      line: cursor.line,
      ch: cursor.ch + text.length - 6,
    });
  }
}

function title2content(title: string) {
  return `> [!${title}] ${title}\n> \n> `;
}
