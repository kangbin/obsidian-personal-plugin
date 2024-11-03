import {
  type App,
  type Editor,
  type Menu,
  type PluginManifest,
  Plugin,
  moment,
} from "obsidian";
import { info } from "../../utils/logger";

export class DatePlugin extends Plugin {
  constructor(app: App, manifest: PluginManifest) {
    super(app, manifest);
  }

  async onload() {
    info(`DatePlugin onload`);

    const {
      app: { workspace },
    } = this;

    workspace.on("editor-menu", this.handleEditorMenu);
  }

  onunload() {
    info(`DatePlugin onunload`);

    const {
      app: { workspace },
    } = this;

    workspace.off("editor-menu", this.handleEditorMenu);
  }

  private handleEditorMenu = (menu: Menu, editor: Editor) => {
    menu.addItem((item) => {
      item.setTitle("插入时间");

      // https://github.com/mProjectsCode/obsidian-meta-bind-plugin/blob/4b16a75fb63dfdb34e3ccf2756a324a84dd8fd85/packages/obsidian/src/EditorMenu.ts#L17-L30
      // https://forum.obsidian.md/t/make-setsubmenu-public-api/59175/2
      this.generateSubmenu(editor, (item as any).setSubmenu());
    });
  };

  private generateSubmenu(editor: Editor, submenu: Menu) {
    const submenuTexts: Array<string> = [
      moment().format("YYYY-MM-DD"),
      moment().format("## MM-DD ddd"),
    ];

    submenuTexts.forEach((title) => {
      submenu.addItem((item) => {
        item.setTitle(title);
        item.onClick(() => this.insertText(editor, title));
      });
    });
  }

  private insertText(editor: Editor, text: string) {
    const cursor = editor.getCursor();
    editor.replaceRange(text, cursor);
    editor.setCursor({
      line: cursor.line,
      ch: cursor.ch + text.length,
    });
  }
}
