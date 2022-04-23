import { fetchResource } from '../utils/fetchResource'
import { sandBox } from '../sandbox'

// 加载html
export const loadHtml = async (app) => {
  // 子应用显示位置，id
  const container = app.container
  // 子应用的入口
  const entry = app.entry

  const [dom, scripts] = await parseHtml(entry)
  const ct = document.querySelector(container)
  if (!ct) {
    throw new Error('容器不存在')
  }
  ct.innerHTML = dom
  console.log('scripts', scripts)
  scripts.forEach(item => {
    sandBox(app, item)
  })

  return app
}

// 解析资源
export const parseHtml = async (entry) => {
  const html = await fetchResource(entry)
  let allScript = []
  const div = document.createElement('div')
  div.innerHTML = html

  const [dom, scriptUrl, script] = await getResources(div, entry)
  // 加载资源
  const fetchedScripts = await Promise.all(scriptUrl.map(async item => fetchResource(item)))
  allScript = script.concat(fetchedScripts)

  return [dom, allScript]
}

export const getResources = async (root, entry) => {
  const scriptUrl = [] // js 链接  src  href
  const script = [] // 写在script中的js脚本内容
  const dom = root.outerHTML

  // 深度解析
  function deepParse (element) {
    const children = element.children
    const parent = element.parent
    // 解析script
    if (element.nodeName.toLowerCase() === 'script') {
      const src = element.getAttribute('src')
      // 无资源链接
      if (!src) {
        script.push(element.outerHTML)
      } else {
        if (src.startsWith('http')) {
          scriptUrl.push(src)
        } else {
          // todo 可能需要做 / 的兼容处理
          scriptUrl.push(`http:${entry}/${src}`)
        }
      }
      if (parent) {
        parent.replaceChild(document.createComment('此 js 文件已经被微前端替换'), element)
      }
    }

    // 解析link
    if (element.nodeName.toLowerCase() === 'link') {
      const href = element.getAttribute('href')
      // 解析link 中的js
      if (href.endsWith('.js')) {
        if (href.startsWith('http')) {
          scriptUrl.push(href)
        } else {
          // todo 可能需要做 / 的兼容处理
          scriptUrl.push(`http:${entry}/${href}`)
        }
      }
    }

    for (let i = 0; i < children.length; i++) {
      deepParse(children[i])
    }
  }

  deepParse(root)
  return [dom, scriptUrl, script]
}
