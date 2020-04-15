import { deleteDocument } from "@anoblet/firebase";
import "@material/mwc-icon";
import "@material/mwc-icon-button";
import "@material/mwc-list";
import "@material/mwc-list/mwc-list-item";
import { css, customElement, html, LitElement, property } from "lit-element";
import "./list-item-component";

@customElement("table-component")
export class TableComponent extends LitElement {
    @property({ type: Array }) items: any[];

    delete({ target }) {
        deleteDocument(`items/${this.items[target.dataset.index].id}`);
    }

    edit({ target }) {
        const index = target.dataset.index;
    }

    public static get styles() {
        return css`
            table {
                border: 0;
                width: 100%;
                table-layout: auto;
                border-collapse: collapse;
            }

            th,
            td {
                padding: 0.5rem;
                white-space: nowrap;
            }

            tr:hover {
                background: hsla(200, 80%, 25%, 0.25);
            }
        `;
    }

    public render() {
        return html`<table>
            <tr>
                <th width="1px">Category</th>
                <th width="1px">Author</th>
                <th>Title</th>
            </tr>
            ${this.items.map(
                (item) =>
                    html`<tr>
                        <td>category</td>
                        <td>
                            ${item.author || item.organization}
                        </td>
                        <td>${item.title}</td>
                    </tr>`
            )}
        </table>`;
    }

    open(e: any) {
        window.open(e.target.dataset.url, "_blank");
    }
}
