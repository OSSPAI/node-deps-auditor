import fetch from 'node-fetch';

const defaultOptions = {
    registry: 'https://registry.npmjs.org/'
}

export async function auditPackage(packageName, options = {}) {
    const registry = options.registry || defaultOptions.registry

    const packageInfo = await getPackageInfo(registry, packageName)
    let downloadsInfo;
    if (registry === defaultOptions.registry) {
        downloadsInfo = await getDownloadsInfo(packageInfo)
    }
}

async function getPackageInfo(registry, packageName, version = 'latest') {
   const response = await fetch(`${registry}${packageName}/${version}`)
   const data = await response.json()

   return data
}

async function getDownloadsInfo(packageName) {
    const response = await fetch(`https://api.npmjs.org/downloads/point/last-month/${packageName}`)
    const data = await response.json()
 
    return data
 }