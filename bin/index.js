import { auditPackage } from '../lib/index.js'

async function main() {
    await auditPackage('node-red')
}

main()