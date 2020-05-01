import { html } from "lit-element";
import { nothing } from "lit-html";
import * as project from "../../models/project.json";
import "@material/mwc-fab";

const getOptionLabel = (field, value) => {
    if (!field || !value) return nothing;
    return field.options.find((option) => option.value === value).label;
};

let style = html``;

project.fields.map((field) => {
    style = html`${style} ${field.grid.width}`;
});

export default function () {
    return html` <style>
            :host {
                grid-template-columns: ${style} max-content;
            }
        </style>
        <div class="header">
            ${this.sortedColumns.map((field) =>
                field.grid ? html`<span>${field.label}</span>` : nothing
            )}<span></span>
        </div>
        ${this.data.map(
            (item, index) =>
                html`<div class="row">
                    ${this.sortedColumns.map((field) => {
                        switch (field.inputType) {
                            case "select": {
                                return html`<span
                                    >${getOptionLabel(
                                        field,
                                        item[field.name]
                                    )}</span
                                >`;
                                break;
                            }
                            case "text": {
                                return html`<span>${item[field.name]}</span>`;
                                break;
                            }
                            case "url": {
                                return html`<span>${item[field.name]}</span>`;
                                break;
                            }
                        }
                    })}
                    <span
                        ><mwc-button
                            @click=${this.openUpdateDialog}
                            data-index=${index}
                            >Edit</mwc-button
                        ><mwc-button @click=${this.delete} data-index=${index}
                            >Delete</mwc-button
                        ></span
                    >
                </div>`
        )}
        <div id="fab">
            <mwc-fab icon="add" @click=${this.openAddDialog}></mwc-fab>
        </div>`;
}
