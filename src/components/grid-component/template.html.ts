import { html } from "lit-element";
import * as project from "../../models/project.json";

const getCategoryLabel = (category: string) => {
    return (
        category &&
        project.fields
            .find((item) => item.name === "category")
            .options.find((option) => option.value === category).label
    );
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
                grid-template-columns: ${style};
            }
        </style>
        <div class="header">
            ${sortedColumns.map((field) =>
                field.grid ? html`<span>${field.label}</span>` : false
            )}
        </div>
        ${this.items.map(
            (item, index) =>
                html`<div class="row">
                    ${sortedColumns.map((field) =>
                        field.grid
                            ? html`<span>${item[field.name]}</span>`
                            : false
                    )}
                </div>`
        )}`;
}
