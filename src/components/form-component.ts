import { addDocument } from "@anoblet/firebase";
import "@material/mwc-select";
import "@material/mwc-textfield";
import { TextField } from "@material/mwc-textfield";
import {
    css,
    customElement,
    html,
    LitElement,
    property,
    query,
} from "lit-element";

@customElement("form-component")
export class FormComponent extends LitElement {
    @property({ type: String }) author: string = "";
    @property({ type: String }) github: string = "";
    @property({ type: String }) organization: string = "";
    @property({ type: String }) title: string = "";
    @property({ type: String }) url: string = "";
    @query("#organization") organizationField: TextField;
    @query("#title") titleField: TextField;
    @query("#url") urlField: TextField;

    addItem() {
        console.log(this.titleField);
        addDocument("items", {
            created: Date.now(),
            organization: this.organizationField.value,
            title: this.titleField.value,
            url: this.urlField.value,
        });
        this.organizationField.value = "";
        this.titleField.value = "";
        this.urlField.value = "";
    }

    save = this.addItem;

    public static get styles() {
        return css`
            :host {
                display: grid;
                grid-gap: 1rem;
                padding: 1rem 0 0 0;
                box-sizing: border-box;
            }
        `;
    }

    public render() {
        return html`
            <mwc-textfield
                id="title"
                label="Title"
                outlined
                required
                value=${this.title}
            ></mwc-textfield>
            <mwc-textfield
                id="url"
                label="Project URL"
                outlined
                required
                value=${this.url}
            ></mwc-textfield>
            <mwc-textfield
                id="author"
                label="Author"
                outlined
                value=${this.author}
            ></mwc-textfield>
            <mwc-select outlined label="Category">
                <mwc-list-item value="0">Component</mwc-list-item>
                <mwc-list-item value="1">Component Suite</mwc-list-item>
            </mwc-select>
        `;
    }
}
