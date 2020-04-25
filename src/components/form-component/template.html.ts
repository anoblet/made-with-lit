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
                ></mwc-textfield>`;
            }
        }
    })}`;
}
