import { defineCommand } from "citty";
import { getDepsDownloads } from '../../lib/index.js'

export default defineCommand({
    meta: {
        name: "downloads",
        description: "Show dependencies downloads by week",
    },
    args: {
        package: {
            type: "positional",
            description: "Package name to get dependencies downloads",
            required: true
        },
    },
    async run({ args }) {
        if (!args.package) {
            throw new Error('Empty package name')
        }

        const downloads = await getDepsDownloads(args.package)
        
        downloads.sort((a, b) => b.downloads - a.downloads)

        let maxLength = 0;
        for (const download of downloads) {
            if (download.package.length > maxLength) {
                maxLength = download.package.length
            }
        }

        for (const download of downloads) {
            console.log(`${download.package.padEnd(maxLength, ' ')} - ${download.downloads.toLocaleString()}`)
        }
    },
});