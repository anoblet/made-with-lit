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

export default function () {
    return html`<div class="header">
            ${sortedColumns.map((field) =>
                field.grid ? html`<span>${field.label}</span>` : false
            )}<span></span>
        </div>
        ${this.items.map(
            (item, index) =>
                html`<div class="row">
                    ${sortedColumns.map((field) =>
                        field.grid
                            ? html`<span>${item[field.name]}</span>`
                            : false
                    )}
                    <span>${getCategoryLabel(item.category)}</span>
                    <span>${item.author || item.organization}</span
                    ><span
                        @click=${this.openLink}
                        class="title"
                        data-url=${item.url}
                        >${item.title}</span
                    >
                    <span>
                        <mwc-button
                            data-index=${index}
                            label="Edit"
                            @click=${this.openEditDialog}
                        ></mwc-button>
                        <mwc-button
                            data-index=${index}
                            label="Delete"
                            @click=${this.delete}
                        ></mwc-button>
                    </span>
                </div>`
        )}`;
}
