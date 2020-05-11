import { html } from "lit-element";
import * as project from "../../models/project.json";

export default function () {
    return html`
        <mwc-dialog
            @closed=${this.onSave}
            heading="Update a project"
            id="edit-project"
        >
            <form-component .data=${item} .model=${project}></form-component>
            <mwc-button raised slot="primaryAction" dialogAction="save">
                Save
            </mwc-button></mwc-dialog
        >
    `;
}
