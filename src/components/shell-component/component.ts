import type { Drawer } from "@material/mwc-drawer";
import { css, customElement, LitElement, query } from "lit-element";
import sharedStyles from "../../shared-styles";
import style from "./style.css";
import template from "./template.html";

@customElement("shell-component")
export class ShellComponent extends LitElement {
    @query("mwc-drawer") drawer: Drawer;

    public firstUpdated() {
        applyStyle(
            this.drawer,
            css`
                .mdc-drawer-app-content {
                    display: flex;
                }
            `
        );
    }

    public static get styles() {
        return [sharedStyles, style];
    }

    public render = template.bind(this);

    public toggleDrawer() {
        this.drawer.getAttribute("open")
            ? this.drawer.removeAttribute("open")
            : this.drawer.setAttribute("open", "");
    }
}

/**
 * Takes a node, CSSResult and appends it
 */
export const applyStyle = (node: LitElement, style) => {
    if ("adoptedStyleSheets" in document) {
        const shadowRoot: any = node.shadowRoot;
        const sheets = shadowRoot.adoptedStyleSheets;
        shadowRoot.adoptedStyleSheets = [...sheets, style.styleSheet];
    } else {
        const styleNode = document.createElement("style");
        styleNode.textContent = style.cssText;
        node.shadowRoot.appendChild(styleNode);
    }
};
