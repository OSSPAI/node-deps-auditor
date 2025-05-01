import { defineCommand, runMain } from "citty";

const main = defineCommand({
    meta: {
        name: "deps-auditor",
        version: "1.0.0",
        description: "Audit npm package dependencies",
    },
    subCommands: {
        downloads: () => import("./commands/downloads.js").then((r) => r.default),
    },
});

runMain(main);
