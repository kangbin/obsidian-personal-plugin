import { type App, Plugin, type PluginManifest } from "obsidian";
import { DatePlugin } from "./plugins/date-plugin";
import { IconPlugin } from "./plugins/icon-plugin";
import { info } from "./utils/logger";

export default class PersonalPlugin extends Plugin {
  private datePlugin: DatePlugin;
  private iconPlugin: IconPlugin;

  constructor(app: App, manifest: PluginManifest) {
    super(app, manifest);

    this.datePlugin = new DatePlugin(app, manifest);
    this.iconPlugin = new IconPlugin(app, manifest);
  }

  async onload() {
    info(`PersonalPlugin onload`);

    this.datePlugin.onload();
    this.iconPlugin.onload();
  }

  onunload() {
    info(`PersonalPlugin onunload`);

    this.datePlugin.onunload();
    this.iconPlugin.onunload();
  }
}
