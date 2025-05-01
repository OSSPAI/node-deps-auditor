import fetch from 'node-fetch';

const npmRegistry = 'https://registry.npmjs.org/'
const npmApi = 'https://api.npmjs.org/'

export async function getDepsDownloads(packageName) {
    const packageInfo = await getPackageInfo(packageName)

    const dependencies = Object.keys(packageInfo.dependencies)

    const requests = []
    for (const dep of dependencies) {
        requests.push(await getDownloadsInfo(dep))
    }
    
    return await Promise.all(requests)
}

async function getPackageInfo(packageName, version = 'latest') {
   const response = await fetch(`${npmRegistry}${packageName}/${version}`)
   const data = await response.json()

   return data
}

async function getDownloadsInfo(packageName) {
    const response = await fetch(`${npmApi}downloads/point/last-week/${packageName}`)
    const data = await response.json()
 
    return data
 }