import * as firebase from "@anoblet/firebase";
import { Collection } from "@anoblet/firebase";
import "@material/mwc-icon";
import "@material/mwc-icon-button";
import "@material/mwc-list";
import "@material/mwc-list/mwc-list-item";
import { css, customElement, LitElement, property, query } from "lit-element";
import sharedStyles from "../../shared-styles";
import "../form-component/component";
import { FormComponent } from "../form-component/component";
import style from "./style.css";
import template from "./template.html";

@customElement("grid-component")
export class GridComponent extends LitElement {
    @property({ type: Array }) data = [];
    model: any;
    @property({ attribute: "order-by", type: String }) orderBy: string;
    schema: any;
    sortedColumns = [];

    @query("form-component") form: FormComponent;

    public static get styles() {
        return [sharedStyles, style, css``];
    }

    public render = template.bind(this);

    firstUpdated() {
        this.sortedColumns = this.model
            ? this.model.fields.sort((a, b) =>
                  a.grid?.order > b.grid?.order ? 1 : -1
              )
            : [];
    }

    updated(changedProperties) {
        // changedProperties.has("orderBy") && this.updateCollection();
    }

    delete({ target }) {
        const index = target.dataset.index;
        firebase.deleteDocument(`items/${this.data[index].id}`);
        this.data.splice(index, 1);
        this.data = [...this.data];
    }

    openLink(e: any) {
        window.open(e.target.dataset.url, "_blank");
    }

    refresh() {}
}
