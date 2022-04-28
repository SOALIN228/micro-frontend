export const createStore = (initData = {}) => (() => {
  let store = initData
  const observers = [] // 管理所有的订阅者，依赖

  // 获取store
  const getStore = () => store
  // 更新store
  const update = (value) => {
    if (value !== store) {
      // 更新store
      const oldValue = store
      store = value
      // 通知所有订阅者，store发生变化
      observers.forEach(async item => await item(store, oldValue))
    }
  }
  // 添加订阅
  const subscribe = (fn) => {
    observers.push(fn)
  }

  return {
    getStore,
    update,
    subscribe
  }
})()
