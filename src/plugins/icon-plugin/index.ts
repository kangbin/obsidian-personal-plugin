import { type App, Plugin, type PluginManifest, debounce } from "obsidian";
import { info } from "../../utils/logger";
import { IconPluginService } from "./service";

export class IconPlugin extends Plugin {
  private service: IconPluginService;

  constructor(app: App, manifest: PluginManifest) {
    super(app, manifest);

    this.service = new IconPluginService(this);
  }

  async onload() {
    info(`IconPlugin onload`);

    const {
      app: { vault, workspace },
    } = this;

    // registerEvent 不靠谱，根本不会取消监听，所以还是自己手动监听与取消
    vault.on("create", this.handleLayoutChange);
    workspace.on("layout-change", this.handleLayoutChange);

    // 关闭插件之后，重新启用插件，需要展示图标
    this.service.addIcons();
  }

  onunload() {
    info(`IconPlugin onunload`);

    this.service.removeIcons();

    const {
      app: { vault, workspace },
    } = this;

    vault.off("create", this.handleLayoutChange);
    workspace.off("layout-change", this.handleLayoutChange);
  }

  private handleLayoutChange = debounce(() => {
    this.service.addIcons();
  }, 100);
}
