import { addDocument } from "@anoblet/firebase";
import "@material/mwc-list/mwc-list-item";
import "@material/mwc-select";
import "@material/mwc-textfield";
import { TextField } from "@material/mwc-textfield";
import { customElement, LitElement, property, query } from "lit-element";
import sharedStyles from "../../shared-styles";
import style from "./style.css";
import template from "./template.html";

const categories = [
    { label: "Component", value: "component" },
    { label: "Component Suite", value: "component_suite" },
];

@customElement("form-component")
export class FormComponent extends LitElement {
    @property({ type: String }) author: string = "";
    @property({ type: String }) category: string = "";
    @property({ type: String }) github: string = "";
    @property({ type: Object }) model: any = {};
    @property({ type: String }) organization: string = "";
    @property({ type: String }) title: string = "";
    @property({ type: String }) url: string = "";

    addItem() {
        addDocument("items", {
            author: this.author,
            category: this.category,
            created: Date.now(),
            title: this.title,
            url: this.url,
        });
    }

    save = this.addItem;

    public static get styles() {
        return [sharedStyles, style];
    }

    public render = template.bind(this);

    selectChanged(event) {
        this[event.target.name] = this.model.fields.find(
            (item) => item.name === this[event.target.name]
        ).options[event.detail.index].value;
    }

    textChanged(event) {
        this[event.target.name] = event.target.value;
    }
}
