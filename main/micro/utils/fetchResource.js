// 加载资源
export const fetchResource = url => fetch(url).then(async res => await res.text())
