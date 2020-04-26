import { html } from "lit-element";

export default function () {
    return html`${this.model.fields.map((field) => {
        switch (field.inputType) {
            case "text": {
                return html`<mwc-textfield
                    @change=${this.textChanged}
                    label=${field.label}
                    name=${field.name}
                    outlined
                    ?required=${field.required}
                    value=${this.data[field.name] || ""}
                ></mwc-textfield>`;
                break;
            }
            case "select": {
                return html`<mwc-select
                    label=${field.label}
                    name=${field.name}
                    outlined
                    ?required=${field.required}
                    @selected=${this.selectChanged}
                >
                    ${field.options.map(
                        (option) =>
                            html`<mwc-list-item>${option.label}</mwc-list-item>`
                    )}
                </mwc-select>`;
                break;
            }
        }
    })}`;
}
