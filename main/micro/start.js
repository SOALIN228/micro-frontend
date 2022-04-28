import { setList, getList } from './const/subApps'
import { setMainLifecycle } from './const/mainLifeCycle'
import { rewriteRouter } from './router/rewriteRouter'
import { currentApp } from './utils'
import { prefetch } from './loader/prefetch'
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

  const { pathname, hash } = window.location

  if (!hash) {
    // 当前没有在使用的子应用
    // 1. 抛出一个错误，请访问正确的连接
    // 2. 访问一个默认的路由，通常为首页或登录页面
    window.history.pushState(null, null, '/vue3#/index')
  }

  if (app && hash) {
    const url = pathname + hash
    window.__CURRENT_SUB_APP__ = app.activeRule
    window.history.pushState('', '', url)
  }

  // 预加载 - 加载接下来的所有子应用，但是不显示
  prefetch()
}
