import { html } from "lit-element";

export default function () {
    return html`${this.model.map((field) => {
        switch (field.inputType) {
            case "text": {
                return html`<mwc-textfield
                    label=${field.label}
                    outlined
                    ?required=${field.required}
                ></mwc-textfield>`;
            }
        }
    })}`;
}

// export default function () {
//     return html`
//         <mwc-textfield
//             @change=${this.textChange}
//             id="title"
//             label="Title"
//             outlined
//             required
//             value=${this.title}
//         ></mwc-textfield>
//         <mwc-textfield
//             id="url"
//             label="Project URL"
//             outlined
//             required
//             value=${this.url}
//         ></mwc-textfield>
//         <mwc-textfield
//             id="author"
//             label="Author"
//             outlined
//             value=${this.author}
//         ></mwc-textfield>
//         <mwc-select
//             @selected=${this.categorySelected}
//             id="category"
//             label="Category"
//             outlined
//         >
//             ${this.categories.map(
//                 (category) => html`
//                     <mwc-list-item
//                         ?selected=${category.label === this.category}
//                         value=${category.label}
//                         >${category.label}</mwc-list-item
//                     >
//                 `
//             )}
//         </mwc-select>
//     `;
// }
