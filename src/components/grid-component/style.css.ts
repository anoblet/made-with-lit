import { css } from "lit-element";

export default css`
    :host {
        display: grid;
    }

    a {
        text-decoration: none;
    }

    .header {
        display: contents;
        font-weight: bold;
    }

    .header > * {
        display: flex;
        justify-content: center;
        padding: 0.25rem 1.5rem;
    }

    .row {
        display: contents;
        cursor: pointer;
    }

    .row > * {
        display: flex;
        align-items: center;
        padding: 0.25rem 1rem;
        overflow: hidden;
    }

    .row:hover > * {
        background: hsla(200, 80%, 25%, 0.25);
    }

    .title {
        cursor: pointer;
    }
`;
