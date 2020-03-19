import { customElement, html, LitElement } from "lit-element";

@customElement("shell-component")
export class ShellComponent extends LitElement {
    render() {
        return html`
            <h1>My app</h1>
        `;
    }
}
