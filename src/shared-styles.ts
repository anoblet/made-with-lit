import { css } from "lit-element";

export default css`
    * {
        box-sizing: border-box;
    }

    .card {
        border: 1px solid #000;
        border-radius: 0.25rem;
        padding: 1.5rem;
        /* position: relative; */
        word-break: break-all;
    }

    .grid {
        display: grid;
        grid-gap: 1.5rem;
    }
`;
