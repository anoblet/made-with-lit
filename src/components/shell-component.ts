import "@material/mwc-button";
import "@material/mwc-drawer";
import { Drawer } from "@material/mwc-drawer";
import "@material/mwc-top-app-bar";
import { css, customElement, html, LitElement, query } from "lit-element";
import "../pages/page-index";
import sharedStyles from "../shared-styles";

@customElement("shell-component")
export class ShellComponent extends LitElement {
    @query("mwc-drawer") drawer: Drawer;

    public toggleDrawer() {
        this.drawer.getAttribute("open")
            ? this.drawer.removeAttribute("open")
            : this.drawer.setAttribute("open", "");
    }

    public static get styles() {
        return [
            sharedStyles,
            css`
                :host {
                    --mdc-theme-primary: hsla(200,80%,25%,1);
                }

                #page-container {
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
                    </mwc-top-app-bar>
                    <div id="page-container">
                        <page-index></page-index>
                    </div>
                </div>
            </mwc-drawer>
        `;
    }
}
