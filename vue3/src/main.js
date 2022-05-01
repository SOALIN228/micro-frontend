import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setMain } from './utils/global'

let instance = null

function render () {
  instance = createApp(App)
  instance
    .use(router)
    .mount('#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap () {
  console.log('vue3.0 app bootstrap')
}

export async function mount (props) {
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev)
  })
  setTimeout(() => {
    props.setGlobalState({
      a: 2,
      b: 3
    })
  }, 500)
  // const storeData = window.store.getStore()
  // window.store.update({
  //   ...storeData,
  //   a: 11
  // })
  // window.custom.on('test1', data => {
  //   console.log('test1---data', data)
  //   window.custom.emit('test2', {
  //     b: 2
  //   })
  // })
  setMain(props)
  render()
}

export async function unmount (ctx) {
  instance?.unmount()
  instance = null
  console.log('ctx', ctx)
  // const { container } = ctx
  // if (container) {
  //   document.querySelector(container).innerHTML = ''
  // }
}
