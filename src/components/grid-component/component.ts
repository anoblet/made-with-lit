import {
    addDocument,
    deleteDocument,
    getCollection,
    updateDocument,
} from "@anoblet/firebase";
import * as firebase from "@anoblet/firebase";
import "@material/mwc-icon";
import "@material/mwc-icon-button";
import "@material/mwc-list";
import "@material/mwc-list/mwc-list-item";
import { css, customElement, LitElement, property, query } from "lit-element";
import { html, render } from "lit-html";
import sharedStyles from "../../shared-styles";
import style from "./style.css";
import template from "./template.html";
import { FormComponent } from "../form-component/component";

@customElement("grid-component")
export class GridComponent extends LitElement {
    @property({ type: Array }) data = [];
    model: any;
    sortedColumns = [];

    @property({ attribute: "order-by", type: String }) orderBy: string;

    @query("form-component") form: FormComponent;

    delete({ target }) {
        const index = target.dataset.index;
        firebase.deleteDocument(`items/${this.data[index].id}`);
        this.data.splice(index, 1);
        this.data = [...this.data];
    }

    firstUpdated() {
        this.sortedColumns = this.model
            ? this.model.fields.sort((a, b) =>
                  a.grid?.order > b.grid?.order ? 1 : -1
              )
            : [];
        this.updateCollection();
    }

    openLink(e: any) {
        window.open(e.target.dataset.url, "_blank");
    }

    openAddDialog() {
        const dialogContainer = document.createElement("div");
        const closed = (e: any) => {
            if (e.target.tagName === "MWC-DIALOG") {
                if (e.detail && e.detail.action === "save")
                    this.addItem(this.form.data);
                this.renderRoot.removeChild(dialogContainer);
            }
        };
        render(
            html`<mwc-dialog @closed=${closed} heading="Add a project" open
                ><form-component .model=${this.model}></form-component>
                <mwc-button raised slot="primaryAction" dialogAction="save">
                    Save
                </mwc-button>
            </mwc-dialog>`,
            dialogContainer
        );
        this.renderRoot.appendChild(dialogContainer);
    }

    openUpdateDialog({ target }) {
        const index = target.dataset.index;
        const item = this.data[index];

        const dialogContainer = document.createElement("div");
        const closed = (e: any) => {
            if (e.target.tagName === "MWC-DIALOG") {
                if (e.detail && e.detail.action === "save")
                    this.updateItem(this.form.data, index);
                this.renderRoot.removeChild(dialogContainer);
            }
        };
        render(
            html`<mwc-dialog @closed=${closed} heading="Add a project" open
                ><form-component
                    .data=${item}
                    .model=${this.model}
                ></form-component>
                <mwc-button raised slot="primaryAction" dialogAction="save">
                    Save
                </mwc-button>
            </mwc-dialog>`,
            dialogContainer
        );
        this.renderRoot.appendChild(dialogContainer);
    }

    refresh() {}

    public render = template.bind(this);

    addItem(data: any) {
        this.data = [...this.data, data];
        this.dispatchEvent(new CustomEvent("item-added", { detail: { data } }));
    }

    updateItem(data: any, index: string) {
        this.data[index] = data;
        this.data = [...this.data];
        this.dispatchEvent(
            new CustomEvent("item-updated", { detail: { data } })
        );
    }

    public static get styles() {
        return [sharedStyles, style, css``];
    }

    async updateCollection({ orderBy = "" } = {}) {
        this.data = await getCollection(this.model.collectionURI, {
            orderBy: this.orderBy || orderBy,
        });
    }

    updated(changedProperties) {
        changedProperties.has("orderBy") && this.updateCollection();
    }
}
