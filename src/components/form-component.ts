import { addDocument } from "@anoblet/firebase";
import "@material/mwc-textfield";
import { TextField } from "@material/mwc-textfield";
import { css, customElement, html, LitElement, query } from "lit-element";

@customElement("form-component")
export class FormComponent extends LitElement {
    @query("#organization") organizationField: TextField;
    @query("#title") titleField: TextField;
    @query("#url") urlField: TextField;

    public static get styles() {
        return css`
            :host {
                display: grid;
                grid-gap: 1rem;
            }
        `;
    }

    public render() {
        return html`
            <mwc-textfield id="title" label="Title" outlined></mwc-textfield>
            <mwc-textfield
                id="organization"
                label="Organization"
                outlined
            ></mwc-textfield>
            <mwc-textfield id="url" label="URL" outlined></mwc-textfield>
            <mwc-button label="Add" raised @click=${this.addItem}></mwc-button>
        `;
    }

    addItem() {
        addDocument("items", {
            created: Date.now(),
            organization: this.organizationField.value,
            title: this.titleField.value,
            url: this.urlField.value
        });
        this.organizationField.value = "";
        this.titleField.value = "";
        this.urlField.value = "";
    }
}
