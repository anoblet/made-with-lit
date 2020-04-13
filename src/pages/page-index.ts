import { getCollection } from "@anoblet/firebase";
import "@material/mwc-button";
import "@material/mwc-dialog";
import {
    css,
    customElement,
    html,
    LitElement,
    property,
    query,
} from "lit-element";
import { render } from "lit-html";
import "../components/form-component";
import type { FormComponent } from "../components/form-component";
import "../components/list-component";
import type { Project } from "../models";
import sharedStyles from "../shared-styles";

@customElement("page-index")
export class PageIndexComponent extends LitElement {
    @property({ type: Array }) items: Project[] = [];
    @query("form-component") form: FormComponent;
    dialogContainer: HTMLElement;

    constructor() {
        super();

        getCollection("items", {
            callback: (items: any[]) => (this.items = items),
            orderBy: "created",
        });
    }

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
            `,
        ];
    }

    public render() {
        return html`
            <div id="container" class="grid">
                <mwc-button
                    @click=${this.open}
                    label="Add a project"
                    raised
                ></mwc-button>
                <div id="list" class="card">
                    <list-component .items=${this.items}></list-component>
                </div>
            </div>
        `;
    }

    open() {
        this.dialogContainer = document.createElement("div");
        const closed = (e: any) => {
            if (e.detail.action === "save") this.form.save();
            this.renderRoot.removeChild(this.dialogContainer);
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
    }
}
