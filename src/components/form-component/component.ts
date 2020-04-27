import { addDocument } from "@anoblet/firebase";
import "@material/mwc-list/mwc-list-item";
import "@material/mwc-select";
import "@material/mwc-textfield";
import { customElement, LitElement, property } from "lit-element";
import sharedStyles from "../../shared-styles";
import style from "./style.css";
import template from "./template.html";

@customElement("form-component")
export class FormComponent extends LitElement {
    @property({ type: Object }) model: any = {};

    data: any = {};

    public static get styles() {
        return [sharedStyles, style];
    }

    public render = template.bind(this);

    selectChanged(event) {
        const name = event.target.getAttribute("name");
        this.data[name] = this.model.fields.find(
            (item) => item.name === name
        ).options[event.detail.index].value;
    }

    textChanged(event) {
        this.data[event.target.getAttribute("name")] = event.target.value;
    }
}
