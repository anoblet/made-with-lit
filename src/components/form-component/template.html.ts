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
                    ${field.options.map((option) => {
                        return html`<mwc-list-item
                            ?selected=${this.data[field.name] === option.value}
                            value=${option.value}
                            >${option.label}</mwc-list-item
                        >`;
                    })}
                </mwc-select>`;
                break;
            }
            case "url": {
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
        }
    })}`;
}
