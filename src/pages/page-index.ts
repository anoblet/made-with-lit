import { addDocument } from "@anoblet/firebase";
import "@material/mwc-button";
import "@material/mwc-dialog";
import { css, customElement, html, LitElement, query } from "lit-element";
import { render } from "lit-html";
import "../components/form-component/component";
import type { FormComponent } from "../components/form-component/component";
import "../components/grid-component/component";
import * as project from "../models/project.json";
import sharedStyles from "../shared-styles";

@customElement("page-index")
export class PageIndexComponent extends LitElement {
    @query("form-component") form: FormComponent;
    @query("#grid") grid;
    dialogContainer: HTMLElement;

    public static get styles() {
        return [
            sharedStyles,
            css`
                :host {
                    display: flex;
                    flex: 1;
                }

                @media (min-width: 560px) {
                    :host {
                        --mdc-dialog-min-width: 560px;
                    }
                }

                @media (max-width: 592px) {
                    :host {
                        --mdc-dialog-min-width: calc(100vw - 32px);
                    }
                }

                card-component {
                    overflow: auto;
                }

                form-component {
                    width: 100%;
                }

                mwc-dialog {
                    min-width: 50%;
                }

                #container {
                    flex: 1;
                    grid-template-rows: min-content auto;
                }

                #list {
                    overflow: auto;
                }

                .card {
                    overflow: auto;
                }
            `,
        ];
    }

    public render() {
        return html`
            <div id="container" class="grid">
                <mwc-button
                    @click=${this.openDialog}
                    label="Add a project"
                    raised
                ></mwc-button>
                <div class="card">
                    <grid-component
                        id="grid"
                        .model=${project}
                        order-by="created"
                    ></grid-component>
                </div>
            </div>
        `;
    }

    openDialog() {
        this.dialogContainer = document.createElement("div");
        const closed = (e: any) => {
            if (e.target.tagName === "MWC-DIALOG") {
                if (e.detail && e.detail.action === "save") this.save();
                this.renderRoot.removeChild(this.dialogContainer);
            }
        };
        render(
            html`<mwc-dialog @closed=${closed} heading="Add a project" open
                ><form-component .model=${project}></form-component>
                <mwc-button raised slot="primaryAction" dialogAction="save">
                    Save
                </mwc-button>
            </mwc-dialog>`,
            this.dialogContainer
        );
        this.renderRoot.appendChild(this.dialogContainer);
    }

    save() {
        addDocument("items", {
            ...this.form.data,
            ...{
                created: Date.now(),
            },
        });
        this.grid.updateCollection();
    }
}
