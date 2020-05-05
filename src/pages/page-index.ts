import { Collection, updateDocument } from "@anoblet/firebase";
import "@material/mwc-button";
import "@material/mwc-dialog";
import { customElement, html, LitElement, query, property } from "lit-element";
import { render } from "lit-html";
import { FormComponent } from "../components/form-component/component";
import "../components/grid-component/component";
import type { GridComponent } from "../components/grid-component/component";
import * as project from "../models/project.json";
import sharedStyles from "../shared-styles";
import style from "./page-index/style.css";
import template from "./page-index/template.html";

@customElement("page-index")
export class PageIndexComponent extends LitElement {
    @property({ type: Array }) data = [];
    @query("grid-component") grid: GridComponent;
    @query("form-component") form: FormComponent;

    collection: Collection;

    public static get styles() {
        return [sharedStyles, style];
    }

    public render = template.bind(this);

    constructor() {
        super();
        this.collection = new Collection("items");
        this.collection.subscribe((data) => {
            console.log(data);
            this.data = data;
        });
        console.log(this.collection);
    }

    addProject(event: CustomEvent) {
        const data = event.detail.data;
        this.collection.add({
            ...data,
            ...{
                created: Date.now(),
            },
        });
    }

    updateProject(event: CustomEvent) {
        const data = event.detail.data;
        updateDocument(`items/${data.id}`, data);
    }

    openAddDialog() {
        const dialogContainer = document.createElement("div");
        const closed = (e: any) => {
            if (e.target.tagName === "MWC-DIALOG") {
                if (e.detail && e.detail.action === "save")
                    this.collection.add(this.form.data);
                this.renderRoot.removeChild(dialogContainer);
            }
        };
        render(
            html`<mwc-dialog @closed=${closed} heading="Add a project" open
                ><form-component .model=${project}></form-component>
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
        const item = this.collection.data[index];

        const dialogContainer = document.createElement("div");
        const closed = (e: any) => {
            if (e.target.tagName === "MWC-DIALOG") {
                if (e.detail && e.detail.action === "save")
                    this.renderRoot.removeChild(dialogContainer);
            }
        };
        render(
            html`<mwc-dialog @closed=${closed} heading="Update a project" open
                ><form-component
                    .data=${item}
                    .model=${project}
                ></form-component>
                <mwc-button raised slot="primaryAction" dialogAction="save">
                    Save
                </mwc-button>
            </mwc-dialog>`,
            dialogContainer
        );
        this.renderRoot.appendChild(dialogContainer);
    }
}
