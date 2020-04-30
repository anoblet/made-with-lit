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
        right: 1rem;
    }

    .header {
        display: contents;
        font-weight: bold;
    }

    .header > * {
        display: flex;
        justify-content: center;
        overflow: hidden;
        padding: 0.25rem 1.5rem;
        text-overflow: ellipsis;
        white-space: nowrap;
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
