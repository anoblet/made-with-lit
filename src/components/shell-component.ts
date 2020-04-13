import "@material/mwc-button";
import "@material/mwc-drawer";
import { Drawer } from "@material/mwc-drawer";
import "@material/mwc-top-app-bar";
import { css, customElement, html, LitElement, query } from "lit-element";
import "../pages/page-index";
import sharedStyles from "../shared-styles";
import { github } from "../icons";

@customElement("shell-component")
export class ShellComponent extends LitElement {
    @query("mwc-drawer") drawer: Drawer;

    public toggleDrawer() {
        this.drawer.getAttribute("open")
            ? this.drawer.removeAttribute("open")
            : this.drawer.setAttribute("open", "");
    }

    public firstUpdated() {
        const style = css`
            .mdc-drawer-app-content {
                display: flex;
            }
        `;
        applyStyle(this.drawer, style);
    }

    public static get styles() {
        return [
            sharedStyles,
            css`
                :host {
                    --mdc-theme-primary: hsla(200, 80%, 25%, 1);

                    display: flex;
                    flex-direction: column;
                    flex: 1;
                }

                [slot="appContent"] {
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                }

                #github {
                    display: block;
                    fill: #fff;
                    margin-right: 20px;
                    width: 36px;
                }

                #page-container {
                    display: flex;
                    flex: 1;
                    overflow: auto;
                    padding: 1.5rem;
                }
            `,
        ];
    }

    public render() {
        return html`
            <mwc-drawer hasHeader type="modal">
                <span slot="title">Drawer Title</span>
                <span slot="subtitle">subtitle</span>
                <div>
                    <p>Drawer content!</p>
                    <mwc-icon-button icon="gesture"></mwc-icon-button>
                    <mwc-icon-button icon="gavel"></mwc-icon-button>
                </div>
                <div slot="appContent">
                    <mwc-top-app-bar>
                        <div slot="title">Made with lit</div>
                        <a
                            id="github"
                            href="https://github.com/anoblet/made-with-lit"
                            target="_blank"
                            slot="actionItems"
                            >${github}</a
                        >
                    </mwc-top-app-bar>
                    <div id="page-container">
                        <page-index></page-index>
                    </div>
                </div>
            </mwc-drawer>
        `;
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
