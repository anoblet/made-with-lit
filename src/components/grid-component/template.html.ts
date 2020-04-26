import { html } from "lit-element";
import { nothing } from "lit-html";
import * as project from "../../models/project.json";

const getOptionLabel = (field, value) => {
    if (!field || !value) return nothing;
    return field.options.find((option) => option.value === value).label;
};

const sortColumns = (fields) => {
    return fields.sort((a, b) =>
        a.grid?.columnSortOrder > b.grid?.columnSortOrder ? 1 : -1
    );
};

const sortedColumns = project.fields.sort((a, b) =>
    a.grid?.columnSortOrder > b.grid?.columnSortOrder ? 1 : -1
);

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
            ${sortedColumns.map((field) =>
                field.grid ? html`<span>${field.label}</span>` : nothing
            )}<span></span>
        </div>
        ${this.items.map(
            (item, index) =>
                html`<div class="row">
                    ${sortedColumns.map((field) => {
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
                    <span><mwc-button>Edit</mwc-button><mwc-button>Delete</mwc-button></span>
                </div>`
        )}`;
}
