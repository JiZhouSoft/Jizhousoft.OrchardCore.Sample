const convert2FormData = (data: any): string => {
  let ret = ''
  for (let it in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(it)) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
  }
  return ret
}

export {
  convert2FormData
}
