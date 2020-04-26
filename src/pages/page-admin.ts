import { getCollection } from "@anoblet/firebase";
import { css, customElement, html, LitElement, property } from "lit-element";
// import "../components/form-component";
// import "../components/list-component";
import sharedStyles from "../shared-styles";

@customElement("page-index")
export class PageAdminComponent extends LitElement {
    @property({ type: Array }) items = [];

    constructor() {
        super();
        getCollection("items", {
            callback: (items: any[]) => (this.items = items)
        });
    }

    public static get styles() {
        return sharedStyles;
    }

    public render() {
        return html`
            <div class="grid">
                <div class="card">
                    <form-component></form-component>
                </div>
                <div class="card">
                    <list-component .items=${this.items}></list-component>
                </div>
            </div>
        `;
    }
}
