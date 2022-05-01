import React from 'react'
import './index.scss'
import ReactDOM from 'react-dom'
import BasicMap from './src/router'
import { setMain } from './src/utils/main'

const render = () => {
  ReactDOM.render(<BasicMap/>, document.getElementById('app-react'))
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export const bootstrap = async () => {
  console.log('bootstrap')
}

export const mount = async (app) => {
  setMain(app)
  render()
}

export const unmount = async () => {
  console.log('卸载')
}
