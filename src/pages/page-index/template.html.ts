import { html } from "lit-element";
import * as project from "../../models/project.json";

export default function () {
    return html`
        <div id="container" class="grid">
            <mwc-button
                @click=${this.openDialog}
                label="Add a project"
                raised
            ></mwc-button>
            <div class="card">
                <grid-component
                    .addItem=${this.openAddDialog}
                    .data=${this.data}
                    .model=${project}
                    order-by="created"
                    .updateItem=${this.openUpdateDialog}
                ></grid-component>
            </div>
        </div>
    `;
}
