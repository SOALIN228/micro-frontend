import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// eslint-disable-next-line no-unused-vars
let instance = null
const render = () => {
  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount('#app-vue')
}

// 项目单独启动
if (!window.__MICRO_WEB__) {
  render()
}

// 项目在微前端环境启动
/**
 * 生命周期-开始加载
 * @returns {Promise<void>}
 */
export async function bootstrap () {
  console.log('vue2.0 app bootstrap')
}

/**
 * 生命周期-挂载完成
 * @returns {Promise<void>}
 */
export async function mount () {
  render()
}

/**
 * 生命周期-卸载
 * @param ctx
 * @returns {Promise<void>}
 */
export async function unmount (ctx) {
  instance = null
  console.log('ctx', ctx)
  // const { container } = ctx
  // if (container) {
  //   document.querySelector(container).innerHTML = ''
  // }
}

