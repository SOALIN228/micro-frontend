import React from 'react'
import ReactDOM from 'react-dom'
import BasicMap from './src/router/index.jsx'
import './index.scss'

const render = () => {
  ReactDOM.render((
    <BasicMap/>
  ), document.getElementById('app-react'))
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export const bootstrap = async () => {
  console.log('bootstrap')
}

export const mount = async () => {
  render()
}

export const unmount = async () => {
  console.log('卸载')
}


