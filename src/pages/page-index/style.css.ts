import { css } from "lit-element";

export default css`
    :host {
        display: flex;
        flex: 1;
    }

    @media (min-width: 560px) {
        :host {
            --mdc-dialog-min-width: 560px;
        }
    }

    @media (max-width: 592px) {
        :host {
            --mdc-dialog-min-width: calc(100vw - 32px);
        }
    }

    card-component {
        overflow: auto;
    }

    form-component {
        width: 100%;
    }

    mwc-dialog {
        min-width: 50%;
    }

    #container {
        flex: 1;
        grid-template-rows: min-content auto;
    }

    #list {
        overflow: auto;
    }

    .card {
        overflow: auto;
    }
`;
