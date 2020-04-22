import { html } from "lit-element";

export default function () {
    return html`<div class="header">
            <span>Category</span> <span>Author</span><span>Title</span
            ><span></span>
        </div>
        ${this.items.map(
            (item, index) =>
                html`<div class="row">
                    <span>${item.category}</span>
                    <span>${item.author || item.organization}</span
                    ><span
                        @click=${this.open}
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
