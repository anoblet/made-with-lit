import { updateDocument } from "@anoblet/firebase";
import "@material/mwc-button";
import "@material/mwc-dialog";
import { customElement, LitElement, query } from "lit-element";
import "../components/grid-component/component";
import type { GridComponent } from "../components/grid-component/component";
import sharedStyles from "../shared-styles";
import style from "./page-index/style.css";
import template from "./page-index/template.html";
import { Collection } from "@anoblet/firebase";

@customElement("page-index")
export class PageIndexComponent extends LitElement {
    @query("grid-component") grid: GridComponent;

    collection: Collection;

    public static get styles() {
        return [sharedStyles, style];
    }

    public render = template.bind(this);

    constructor() {
        super();
        this.collection = new Collection("projects");
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
}
