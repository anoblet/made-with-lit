import { deleteDocument, updateDocument } from "@anoblet/firebase";
import "@material/mwc-icon";
import "@material/mwc-icon-button";
import "@material/mwc-list";
import "@material/mwc-list/mwc-list-item";
import {
    css,
    customElement,
    html,
    LitElement,
    property,
    query,
} from "lit-element";
import { render } from "lit-html";

@customElement("list-item-component")
export class ListItemComponent extends LitElement {
    @property({ type: Object }) item: any;
    @query("#dialog-container") dialog;
    @query("form-component") form: any;
    dialogContainer;

    delete() {
        deleteDocument(`items/${this.item.id}`);
    }

    edit() {
        this.dialogContainer = document.createElement("div");
        this.dialogContainer.style.display = "contents";
        render(
            html`<mwc-dialog heading="Add a project" open
                ><form-component
                    organization=${this.item.organization}
                    title=${this.item.title}
                    url=${this.item.url}
                ></form-component>
                <mwc-button raised slot="primaryAction" dialogAction="save">
                    Save
                </mwc-button>
            </mwc-dialog>`,
            this.dialogContainer
        );
        this.dialogContainer
            .querySelector("mwc-dialog")
            .addEventListener("closed", (e: any) => {
                if (e.detail.action === "save") {
                    updateDocument(`items/${this.item.id}`, {
                        organization: this.form.organizationField.value,
                        title: this.form.titleField.value,
                        url: this.form.urlField.value,
                    });
                }
                this.renderRoot.removeChild(this.dialogContainer);
            });
        this.renderRoot.appendChild(this.dialogContainer);
    }

    open() {
        window.open(this.item.address, "_blank");
    }

    public static get styles() {
        return css`
            :host {
                display: grid;
                grid-gap: 1rem;
                grid-template-columns: 1fr max-content max-content;
                padding: 0 1rem;
                border-radius: 0.25rem;
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

            mwc-dialog {
                display: contents;
            }

            mwc-textfield {
                flex: 1;
            }

            .field {
                /* height: max-content; */
                padding: 0.5rem;
            }

            .link {
                cursor: pointer;
            }
        `;
    }

    public render() {
        return html`
            <span class="link" @click=${this.open}>${this.item.title}</span>
            <mwc-button label="Edit" @click=${this.edit}></mwc-button>
            <mwc-button label="Delete" @click=${this.delete}></mwc-button>
        `;
    }
}
