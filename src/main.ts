import { type App, Plugin, type PluginManifest } from "obsidian";
import { IconPlugin } from "./plugins/icon-plugin";
import { info } from "./utils/logger";

export default class PersonalPlugin extends Plugin {
  private iconPlugin: IconPlugin;

  constructor(app: App, manifest: PluginManifest) {
    super(app, manifest);

    this.iconPlugin = new IconPlugin(app, manifest);
  }

  async onload() {
    info(`PersonalPlugin onload`);

    this.iconPlugin.onload();
  }

  onunload() {
    info(`PersonalPlugin onunload`);

    this.iconPlugin.onunload();
  }
}
