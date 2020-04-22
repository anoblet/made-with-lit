import { html } from "lit-element";
import { render } from "lit-html";

export const openDialog = (container) => {
    this.dialogContainer = document.createElement("div");
    const closed = (e: any) => {
        if (e.target.tagName === "MWC-DIALOG") {
            if (e.detail && e.detail.action === "save") this.form.save();
            this.renderRoot.removeChild(this.dialogContainer);
        }
    };
    render(
        html`<mwc-dialog @closed=${closed} heading="Add a project" open
            ><form-component></form-component>
            <mwc-button raised slot="primaryAction" dialogAction="save">
                Save
            </mwc-button>
        </mwc-dialog>`,
        this.dialogContainer
    );
    this.renderRoot.appendChild(this.dialogContainer);
};
