import { css, customElement, html, LitElement, property } from "lit-element";
import "@material/mwc-list";
import "@material/mwc-list/mwc-list-item";
import "@material/mwc-icon-button";
import "@material/mwc-icon";

@customElement("list-component")
export class ListComponent extends LitElement {
    @property({ type: Array }) items: any[];

    public static get styles() {
        return css`
            a {
                text-decoration: none;
            }

            .item-address {
                color: #999;
            }
        `;
    }

    public render() {
        return html`
            <mwc-list>
                ${this.items.map(
                    item =>
                        html`
                            <mwc-list-item hasMeta>
                                ${item.title}<span class="item-address">
                                    - ${item.address}</span
                                >
                                <span slot="meta"
                                    ><mwc-icon>more_vert</mwc-icon></span
                                >
                            </mwc-list-item>
                        `
                )}
            </mwc-list>
        `;
    }
}
