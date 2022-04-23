// 给路由跳转打补丁
import { getList } from '../const/subApps'

export const patchRouter = (globalEvent, eventName) => {
  return function () {
    const e = new Event(eventName)
    globalEvent.apply(this, arguments)
    window.dispatchEvent(e)
  }
}

// 获取当前路由下的app
export const currentApp = () => {
  const currentUrl = window.location.pathname
  return filterApp('activeRule', currentUrl)
}

export const findAppByRoute = (router) => {
  return filterApp('activeRule', router)
}

export const filterApp = (key, value) => {
  const currentApp = getList().filter(item => item[key] === value)
  return currentApp && currentApp.length ? currentApp[0] : {}
}

// 子应用是否切换出去，如：vue3切到react
export const isTurnChild = () => {
  const { pathname } = window.location
  // 当前路由无改变
  let prefix = pathname.match(/(\/\w+)/g)
  if (prefix) {
    prefix = prefix[0]
  }
  window.__ORIGIN_APP__ = window.__CURRENT_SUB_APP__
  console.log(window.__CURRENT_SUB_APP__, prefix)
  // 记录上一次路由
  if (window.__CURRENT_SUB_APP__ === prefix) {
    return false
  }
  // 记录当前路由
  const currentSubApp = window.location.pathname.match(/(\/\w+)/)
  if (!currentSubApp) {
    return
  }
  window.__CURRENT_SUB_APP__ = currentSubApp[0]
  return true
}
