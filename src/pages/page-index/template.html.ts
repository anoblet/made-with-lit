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
                    @item-added=${this.addProject}
                    @item-updated=${this.updateProject}
                    id="grid"
                    .model=${project}
                    order-by="created"
                ></grid-component>
            </div>
        </div>
    `;
}
