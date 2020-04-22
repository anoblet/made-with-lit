import "@material/mwc-button";
import "@material/mwc-drawer";
import "@material/mwc-top-app-bar";
import { html } from "lit-element";
import { github } from "../../icons";
import "../../pages/page-index";

export default function () {
    return html` <mwc-drawer hasHeader type="modal">
        <span slot="title">Drawer Title</span>
        <span slot="subtitle">subtitle</span>
        <div>
            <p>Drawer content!</p>
            <mwc-icon-button icon="gesture"></mwc-icon-button>
            <mwc-icon-button icon="gavel"></mwc-icon-button>
        </div>
        <div slot="appContent">
            <mwc-top-app-bar>
                <div slot="title">Made with lit</div>
                <a
                    id="github"
                    href="https://github.com/anoblet/made-with-lit"
                    target="_blank"
                    slot="actionItems"
                    >${github}</a
                >
            </mwc-top-app-bar>
            <div id="page-container">
                <page-index></page-index>
            </div>
        </div>
    </mwc-drawer>`;
}
