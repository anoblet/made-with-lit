import { initialize } from "@anoblet/firebase";
import {
    showUpdateSnackbar,
    registerServiceWorker
} from "@victorycto/web-utilities";
import { html } from "lit-element";
import { render } from "lit-html";
import "./components/shell-component";

const firebaseConfig = {
    apiKey: "AIzaSyDCSnfESKV1uT3AmMS2e9VGA5LGXJBjXFI",
    authDomain: "made-with-lit.firebaseapp.com",
    databaseURL: "https://made-with-lit.firebaseio.com",
    projectId: "made-with-lit",
    storageBucket: "made-with-lit.appspot.com",
    messagingSenderId: "891139247807",
    appId: "1:891139247807:web:0fa0806b6b91a5e12ec00a",
    measurementId: "G-6YVBT7NZMR"
};

(async () => {
    initialize(firebaseConfig);
    const el: any = document.createElement("shell-component");
    document.body.appendChild(el);
})();

let updateRequested = false;
if (false)
    registerServiceWorker({
        installed: event => {
            if (event.isUpdate) {
                if (!updateRequested) showUpdateSnackbar();
                updateRequested = true;
            }
        },
        message: event => {
            if (event.data.meta === "workbox-broadcast-update") {
                if (!updateRequested) showUpdateSnackbar();
                updateRequested = true;
            }
        },
        source: "/service-worker.js"
    });
