import { css } from "lit-element";

export default css`
    :host {
        display: grid;
    }

    a {
        text-decoration: none;
    }

    #fab {
        position: absolute;
        bottom: 1rem;
        right: 2rem;
    }

    .header {
        display: contents;
        --mdc-button-disabled-ink-color: rgba(0, 0, 0, 1);
        --mdc-typography-button-font-weight: bold;
    }

    .header > * {
        display: flex;
        justify-content: center;
        overflow: hidden;
        padding: 0.25rem 1.5rem;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .header span {
        text-transform: uppercase;
    }

    .row {
        display: contents;
        cursor: pointer;
        overflow: hidden;
    }

    .row > * {
        align-items: center;
        display: flex;
        overflow: hidden;
        padding: 0.25rem 1rem;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .row:hover > * {
        background: hsla(200, 80%, 25%, 0.25);
    }

    .title {
        cursor: pointer;
    }
`;
