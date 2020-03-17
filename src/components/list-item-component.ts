import {
    css,
    customElement,
    html,
    LitElement,
    property,
    query
} from "lit-element";
import "@material/mwc-list";
import "@material/mwc-list/mwc-list-item";
import "@material/mwc-icon-button";
import "@material/mwc-icon";

import { deleteDocument, updateDocument } from "@anoblet/firebase";

@customElement("list-item-component")
export class ListItemComponent extends LitElement {
    @property({ reflect: true, type: Boolean }) editable: any;
    @property({ type: Object }) item: any;
    @query("#address") address;
    @query("#title") title;

    cancel() {
        this.editable = false;
    }

    async confirm() {
        await updateDocument(`items/${this.item.id}`, {
            address: this.address.value,
            title: this.title.value
        });
        this.editable = false;
    }

    delete() {
        deleteDocument(`items/${this.item.id}`);
    }

    edit() {
        this.editable = true;
    }

    renderField(field: string) {
        !this.editable
            ? this.item[field]
            : html`
                  <mwc-textfield
                      label=${field}
                      value=${this.item[field]}
                  ></mwc-textfield>
              `;
    }

    public static get styles() {
        return css`
            :host {
                display: grid;
                grid-gap: 1rem;
                grid-template-columns: 1fr max-content max-content;
            }

            :host([editable]) {
                grid-template-columns: 1fr 1fr max-content max-content;
            }

            :host > * {
                display: flex;
                align-items: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            a {
                text-decoration: none;
            }
        `;
    }

    public render() {
        return html`
            ${!this.editable
                ? html`
                      <span>${this.item.title}</span>
                      <!-- <span
                          ><a href=${this.item.address}
                              >${this.item.address}</a
                          ></span
                      > -->
                      <mwc-button label="Edit" @click=${this.edit}></mwc-button>
                      <mwc-button
                          label="Delete"
                          @click=${this.delete}
                      ></mwc-button>
                  `
                : html`
                      <mwc-textfield
                          id="title"
                          label="Title"
                          value=${this.item.title}
                      ></mwc-textfield>
                      <mwc-textfield
                          id="address"
                          label="Address"
                          value=${this.item.address}
                      ></mwc-textfield>
                      <mwc-button
                          label="Confirm"
                          @click=${this.confirm}
                      ></mwc-button>
                      <mwc-button
                          label="Cancel"
                          @click=${this.cancel}
                      ></mwc-button>
                  `}
        `;
    }
}
