import { Collection } from "@anoblet/firebase";

export const ProjectCollection = new Collection({
    orderBy: "created",
    uri: "items",
});
