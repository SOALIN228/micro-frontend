import * as appInfo from '../store'

export const subNavList = [
  {
    name: 'react15',// 唯一
    entry: '//localhost:9002',
    container: '#micro-container',
    activeRule: '/react15',
    props: appInfo,
  },
  {
    name: 'react16',
    entry: '//localhost:9003',
    container: '#micro-container',
    activeRule: '/react16',
    props: appInfo,
  },
  {
    name: 'vue2',
    entry: '//localhost:9004',
    container: '#micro-container',
    activeRule: '/vue2',
    props: appInfo,
  },
  {
    name: 'vue3',
    entry: '//localhost:9005',
    container: '#micro-container',
    activeRule: '/vue3',
    props: appInfo,
  },
]
