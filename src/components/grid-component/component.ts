import {
    deleteDocument,
    getCollection,
    updateDocument,
} from "@anoblet/firebase";
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
const columns = css``;

@customElement("grid-component")
export class GridComponent extends LitElement {
    @property({ type: Array }) data: any[] = [];
    @property({ attribute: "order-by", type: String }) orderBy: string;
    @query("form-component") form: FormComponent;

    dialogContainer: HTMLElement;
    model;

    firstUpdated() {
        this.updateCollection();
    }

    public static get styles() {
        return [sharedStyles, style, css``];
    }

    public render = template.bind(this);

    delete({ target }) {
        deleteDocument(`items/${this.data[target.dataset.index].id}`);
        this.updateCollection();
    }

    openLink(e: any) {
        window.open(e.target.dataset.url, "_blank");
    }

    openEditDialog({ target }) {
        const index = target.dataset.index;
        const item = this.data[index];

        const dialogContainer = document.createElement("div");
        const closed = (e: any) => {
            if (e.target.tagName === "MWC-DIALOG") {
                if (e.detail && e.detail.action === "save")
                    this.save(this.form.data, index);
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

    save(data, index) {
        updateDocument(`items/${data.id}`, data);
        const tmp = this.data;
        tmp[index] = data;
        this.data = tmp;
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
