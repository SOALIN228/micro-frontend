import { performScriptForFunction } from './performScript'

const isCheckLifeCycle = (lifecycle) => lifecycle &&
  lifecycle.bootstrap &&
  lifecycle.mount &&
  lifecycle.unmount

// 子应用生命周期处理， 环境变量设置
export const sandBox = (app, script) => {
  // 设置环境变量
  window.__MICRO_WEB__ = true

  // 运行js文件
  const lifecycle = performScriptForFunction(script, app.name)

  // 生命周期，挂载到app上
  if (isCheckLifeCycle(lifecycle)) {
    app.bootstrap = lifecycle.bootstrap
    app.mount = lifecycle.mount
    app.unmount = lifecycle.unmount
  }
}
