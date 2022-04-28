import { registerMicroApps, start, createStore } from '../../micro'
import { loading } from '../store'

const store = createStore()
window.store = store

store.subscribe((newValue, oldValue) => {
  console.log(newValue, oldValue, '---')
})

// 注册子应用
export const registerApp = (list) => {
  registerMicroApps(list, {
    beforeLoad: [
      () => {
        loading.changeLoading(true)
        console.log('开始加载')
      }
    ],
    mounted: [
      () => {
        loading.changeLoading(false)
        console.log('渲染完成')
      }
    ],
    destoryed: [
      () => {
        console.log('卸载完成')
      }
    ]
  })
  start()
}
