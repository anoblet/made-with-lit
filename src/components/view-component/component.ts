import { customElement, LitElement, property } from "lit-element";
import sharedStyles from "../../shared-styles";
import style from "./style.css";
import index from "./index.html";

@customElement("view-component")
export class ViewComponent extends LitElement {
    @property() data;

    static get styles() {
        return [sharedStyles, style];
    }

    public render = index.bind(this);
}
