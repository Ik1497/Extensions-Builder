export async function GetRoutes() {
  let apiData = await fetch(`https://ik1497.github.io/Docs/api/url-parameters.json`)
  apiData = await apiData.json()

  let array = []

  Object.entries(apiData).forEach(item => {
    apiData[item[0]].apiPath = item[0]

    if (item[1].public === false && localStorage.getItem(`websiteSettings__visibilityChannel`) != `beta`) delete apiData[item[0]]
  });

  Object.entries(apiData).forEach(item => {
    array.push(item[1])
  });

  return {
    object: apiData,
    array
  }
}
