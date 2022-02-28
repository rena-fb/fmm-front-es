export const truncateExcerpt = (string, limit = 200) => {
  if (string.length <= limit) return string
  return `${string.substring(0, limit)}...`
}

export const getClassFromSlug = feSlug => {
  return feSlug?.substring(1).split("/")
}

export const addMethodToCompare = (data, lang) => {
  const existingCompareItems =
    JSON.parse(sessionStorage?.getItem(`compareMethods-${lang}`)) || []

  const arr = [...existingCompareItems]

  const existInArray = arr.find(item => item?.methodId === data?.methodId)

  !existInArray && arr.length < 6 && arr.push(data)

  sessionStorage?.setItem(`compareMethods-${lang}`, JSON.stringify(arr))
  return
}

export const removeFromCompare = (data, lang) => {
  const existingCompareItems =
    JSON.parse(sessionStorage?.getItem(`compareMethods-${lang}`)) || []

  const arr = [...existingCompareItems]

  const index = arr.findIndex(item => item?.methodId === data?.methodId)

  index > -1 && arr.splice(index, 1)

  sessionStorage?.setItem(`compareMethods-${lang}`, JSON.stringify(arr))
  return
}

export const stripTags = string => {
  if (typeof string !== "string") return string
  return string.replace(/(<([^>]+)>)/gi, "")
}
