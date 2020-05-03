import { addDocument, updateDocument } from "@anoblet/firebase";
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

    addProject(event) {
        const data = event.detail.data;
        addDocument("items", {
            ...data,
            ...{
                created: Date.now(),
            },
        });
    }

    updateProject(event) {
        const data = event.detail.data;
        updateDocument(`items/${data.id}`, data);
    }
}
