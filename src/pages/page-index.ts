import { addDocument } from "@anoblet/firebase";
import "@material/mwc-button";
import "@material/mwc-dialog";
import { customElement, html, LitElement, query } from "lit-element";
import { render } from "lit-html";
import "../components/form-component/component";
import type { FormComponent } from "../components/form-component/component";
import "../components/grid-component/component";
import * as project from "../models/project.json";
import sharedStyles from "../shared-styles";
import template from "./page-index/template.html";
import style from "./page-index/style.css";

@customElement("page-index")
export class PageIndexComponent extends LitElement {
    @query("form-component") form: FormComponent;
    @query("#grid") grid;

    public static get styles() {
        return [sharedStyles, style];
    }

    public render = template.bind(this);

    openDialog() {
        const dialogContainer = document.createElement("div");
        const closed = (e: any) => {
            if (e.target.tagName === "MWC-DIALOG") {
                if (e.detail && e.detail.action === "save") this.save();
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

    save() {
        addDocument("items", {
            ...this.form.data,
            ...{
                created: Date.now(),
            },
        });
        this.grid.updateCollection();
    }
}
