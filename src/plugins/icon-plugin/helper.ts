import { setIcon } from "obsidian";
import { ICON_CLASS } from "./const";

/**
 * 在 container 下面插入一个名称为 name 的图标，图标插入到 inner 前面。
 */
export function insertIcon(
  container: HTMLDivElement,
  inner: HTMLDivElement,
  name: string
) {
  const iconEl = container.createDiv();
  iconEl.classList.add(ICON_CLASS);
  iconEl.setAttribute("data-icon", name);

  setIcon(iconEl, name);

  container.insertBefore(iconEl, inner);
}
