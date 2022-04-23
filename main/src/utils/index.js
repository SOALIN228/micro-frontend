import { registerMicroApps, start } from '../../micro'
import { loading } from '../store'

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
