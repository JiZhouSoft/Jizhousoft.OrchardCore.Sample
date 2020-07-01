const convert2FormData = (data: any): string => {
  let formDatas = []
  for (let it in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(it)) {
      formDatas.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]))
    }
  }
  return formDatas.join('&')
}

export {
  convert2FormData
}
