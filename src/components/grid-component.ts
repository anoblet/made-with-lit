import { deleteDocument } from "@anoblet/firebase";
import "@material/mwc-icon";
import "@material/mwc-icon-button";
import "@material/mwc-list";
import "@material/mwc-list/mwc-list-item";
import { css, customElement, html, LitElement, property } from "lit-element";
import "./list-item-component";

@customElement("grid-component")
export class GridComponent extends LitElement {
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
                grid-template-columns:
                    minmax(0, max-content) minmax(0, max-content)
                    auto minmax(0, max-content);
            }

            a {
                text-decoration: none;
            }

            .header {
                display: contents;
                font-weight: bold;
            }

            .header > * {
                display: flex;
                justify-content: center;
                padding: 0.25rem 1.5rem;
            }

            .row {
                display: contents;
                cursor: pointer;
            }

            .row > * {
                display: flex;
                align-items: center;
                padding: 0.25rem 1rem;
                overflow: hidden;
            }

            .row:hover > * {
                background: hsla(200, 80%, 25%, 0.25);
            }

            .title {
                cursor: pointer;
            }
        `;
    }

    public render() {
        return html`<div class="header">
                <span>Category</span> <span>Author</span><span>Title</span
                ><span></span>
            </div>
            ${this.items.map(
                (item, index) =>
                    html`<div class="row">
                        <span>category</span>
                        <span>${item.author || item.organization}</span
                        ><span
                            @click=${this.open}
                            class="title"
                            data-url=${item.url}
                            >${item.title}</span
                        >
                        <span>
                            <mwc-button
                                label="Edit"
                                @click=${this.edit}
                            ></mwc-button>
                        </span>
                    </div>`
            )} `;
    }

    open(e: any) {
        window.open(e.target.dataset.url, "_blank");
    }
}
