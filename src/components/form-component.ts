import { addDocument } from "@anoblet/firebase";
import "@material/mwc-textfield";
import { TextField } from "@material/mwc-textfield";
import { css, customElement, html, LitElement, query } from "lit-element";

@customElement("form-component")
export class FormComponent extends LitElement {
    @query("#title") titleField: TextField;
    @query("#address") addressField: TextField;

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
                id="address"
                label="Address"
                outlined
            ></mwc-textfield>
            <mwc-button label="Add" raised @click=${this.addItem}></mwc-button>
        `;
    }

    addItem() {
        addDocument("items", {
            address: this.addressField.value,
            created: Date.now(),
            title: this.titleField.value
        });
        this.addressField.value = "";
        this.titleField.value = "";
    }
}
