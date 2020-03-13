import { addDocument } from "@anoblet/firebase";
import "@material/mwc-textfield";
import { css, customElement, html, LitElement, query } from "lit-element";

@customElement("form-component")
export class FormComponent extends LitElement {
    @query("#title") title;
    @query("#address") address;

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
            title: this.title.value,
            address: this.address.value
        });
    }
}
