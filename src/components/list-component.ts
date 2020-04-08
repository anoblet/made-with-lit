import { deleteDocument } from "@anoblet/firebase";
import "@material/mwc-icon";
import "@material/mwc-icon-button";
import "@material/mwc-list";
import "@material/mwc-list/mwc-list-item";
import { css, customElement, html, LitElement, property } from "lit-element";
import "./list-item-component";

@customElement("list-component")
export class ListComponent extends LitElement {
    @property({ type: Array }) items: any[];

    delete({ target }) {
        deleteDocument(`items/${this.items[target.dataset.index].id}`);
    }

    edit({ target }) {
        const index = target.dataset.index;
    }

    public static get styles() {
        return css`
            :host {
                display: grid;
                grid-gap: 1rem;
            }

            a {
                text-decoration: none;
            }

            list-item-component:not([editable]):hover {
                background: hsla(200, 80%, 25%, 0.25);
            }

            .item-address {
                color: #999;
            }
        `;
    }

    public render() {
        return html`
            ${this.items.map(
                (item, index) =>
                    html`
                        <list-item-component
                            .item=${item}
                        ></list-item-component>
                    `
            )}
        `;
    }
}
