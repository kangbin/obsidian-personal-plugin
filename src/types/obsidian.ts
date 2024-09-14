import type { TAbstractFile, View, WorkspaceLeaf } from "obsidian";

export interface ExplorerLeaf extends WorkspaceLeaf {
  view: ExplorerView;
}

interface ExplorerView extends View {
  fileItems: Record<string, FileItem>; // keyed by path
  // ready: boolean; // true if fileItems is populated
  // file?: TFile;
  // getViewState(): ExplorerViewState;
  // getMode(): "source" | "preview";
  // dom: { children: DomChild[]; changed: () => void };
}

export interface FileItem {
  file: TAbstractFile;
  selfEl: HTMLDivElement;
  innerEl: HTMLDivElement;
}
