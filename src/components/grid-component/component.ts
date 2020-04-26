import { deleteDocument } from "@anoblet/firebase";
import "@material/mwc-icon";
import "@material/mwc-icon-button";
import "@material/mwc-list";
import "@material/mwc-list/mwc-list-item";
import { customElement, LitElement, property, query } from "lit-element";
import { html, render } from "lit-html";
import * as project from "../../models/project.json";
import sharedStyles from "../../shared-styles";
import style from "./style.css";
import template from "./template.html";

@customElement("grid-component")
export class GridComponent extends LitElement {
    @property({ type: Array }) items: any[];
    @query("form-component") form;

    dialogContainer: HTMLElement;

    public static get styles() {
        return [sharedStyles, style];
    }

    public render = template.bind(this);

    delete({ target }) {
        deleteDocument(`items/${this.items[target.dataset.index].id}`);
    }

    open(e: any) {
        window.open(e.target.dataset.url, "_blank");
    }

    openEditDialog({ target }) {
        const item = this.items[target.dataset.index];

        this.dialogContainer = document.createElement("div");
        const closed = (e: any) => {
            if (e.target.tagName === "MWC-DIALOG") {
                if (e.detail && e.detail.action === "save") this.form.save();
                this.renderRoot.removeChild(this.dialogContainer);
            }
        };
        render(
            html`<mwc-dialog @closed=${closed} heading="Add a project" open
                ><form-component .data=${item} .model=${project}></form-component>
                <mwc-button raised slot="primaryAction" dialogAction="save">
                    Save
                </mwc-button>
            </mwc-dialog>`,
            this.dialogContainer
        );
        this.renderRoot.appendChild(this.dialogContainer);
    }
}
