// 生命周期
import { findAppByRoute } from '../utils'
import { getMainLifecycle } from '../const/mainLifeCycle'
import { loadHtml } from '../loader'

export const lifecycle = async () => {
  // 获取到上一个子应用
  const prevApp = findAppByRoute(window.__ORIGIN_APP__)

  // 获取到要跳转到的子应用
  const nextApp = findAppByRoute(window.__CURRENT_SUB_APP__)
  console.log(prevApp, nextApp)
  if (!nextApp) {
    return
  }
  // todo 不会触发
  if (prevApp && prevApp.unmount) {
    if (prevApp.proxy) {
      // 将沙箱销毁
      prevApp.proxy.inactive()
    }
    await destoryed(prevApp)
  }

  const app = await beforeLoad(nextApp)
  await mounted(app)
}

export const beforeLoad = async (app) => {
  await runMainLifeCycle('beforeLoad')
  // app && app.beforeLoad && app.beforeLoad()
  // 加载子应用
  const subApp = await loadHtml(app)
  subApp && subApp.bootstrap && subApp.bootstrap()
  return subApp
}

export const mounted = async (app) => {
  app && app.mount && app.mount({
    appInfo: app.appInfo,
    entry: app.entry
  })
  await runMainLifeCycle('mounted')
}

export const destoryed = async (app) => {
  app && app.unmount && app.unmount()
  // 执行主应用的生命周期
  await runMainLifeCycle('destoryed')
}

// 执行主应用的生命周期
export const runMainLifeCycle = async (type) => {
  const mainlife = getMainLifecycle()

  await Promise.all(mainlife[type].map(async item => await item()))
}
