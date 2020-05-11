import { html } from "lit-element";
import * as project from "../../models/project.json";

export default function () {
    return html`
        <mwc-dialog
            @closed=${this.onSave}
            heading="Add a project"
            id="add-project"
        >
            <form-component .model=${project}></form-component>
            <mwc-button raised slot="primaryAction" dialogAction="save">
                Save
            </mwc-button>
        </mwc-dialog>
    `;
}
