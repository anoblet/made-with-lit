import { addDocument } from "@anoblet/firebase";
import "@material/mwc-list/mwc-list-item";
import "@material/mwc-select";
import "@material/mwc-textfield";
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

    data: any = {};

    addItem() {
        addDocument("items", {
            author: this.author,
            category: this.category,
            created: Date.now(),
            title: this.title,
            url: this.url,
        });
    }

    save() {
        addDocument("items", {
            ...this.data,
            ...{
                created: Date.now(),
            },
        });
    }

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
