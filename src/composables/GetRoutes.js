export async function GetRoutes() {
  let apiData = await fetch(`https://raw.githubusercontent.com/Ik1497/Docs/main/api/url-parameters.json`)
  apiData = await apiData.json()
  apiData = apiData.pages

  let routes = []

  const promise = new Promise((resolve, reject) => {
    apiData.forEach(async (urlParam, urlParamIndex) => {
      let pageData = await fetch(`https://raw.githubusercontent.com/Ik1497/Docs/main/url-parameters-src/${urlParam.apiPath}.json`)
      pageData = await pageData.json()
  
      pageData.URLSearchParams = JSON.parse(pageData.URLSearchParams)
      delete pageData.path
  
      routes.push({
        ...urlParam,
        ...pageData
      })
  
      if (apiData.length - 1 === urlParamIndex) {
        resolve(routes)
      }
    });
  });

  return await promise
}