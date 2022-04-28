import { setList, getList } from './const/subApps'
import { setMainLifecycle } from './const/mainLifeCycle'
import { rewriteRouter } from './router/rewriteRouter'
import { currentApp } from './utils'
import { Custom } from './customevent'

const custom = new Custom()
window.custom = custom

// 实现路由拦截
rewriteRouter()

// 注册应用到微前端框架
export const registerMicroApps = (appList, lifeCycle) => {
  setList(appList)

  setMainLifecycle(lifeCycle)
}

// 启动微前端框架
export const start = () => {
  // 校验自应用列表是否为空
  const apps = getList()
  if (!apps.length) {
    throw Error('自应用列表为空')
  }
  // 有子应用的内容， 查找到符合当前路由的子应用
  const app = currentApp()
  if (app) {
    const { pathname, hash } = window.location
    const url = pathname + hash
    window.__CURRENT_SUB_APP__ = app.activeRule
    window.history.pushState('', '', url)
  }
}
