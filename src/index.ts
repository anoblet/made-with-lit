import "./components/shell-component/shell-component";
import { registerServiceWorker } from "@victorycto/web-utilities";

const el = document.createElement("shell-component");
document.body.appendChild(el);

// Uncomment this to register service-worker
registerServiceWorker({ source: "/service-worker.js" });
