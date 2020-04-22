import { css } from "lit-element";

export default css`
    :host {
        --mdc-theme-primary: hsla(200, 80%, 25%, 1);
        display: flex;
        flex: 1;
        flex-direction: column;
    }

    [slot="appContent"] {
        display: flex;
        flex: 1;
        flex-direction: column;
    }

    #github {
        display: block;
        fill: #fff;
        margin-right: 20px;
        width: 36px;
    }

    #page-container {
        display: flex;
        flex: 1;
        overflow: auto;
        padding: 1.5rem;
    }
`;
