// 快照沙箱
// 应用场景： 兼容性好，适合老版本的浏览器，缺点是遍历window 会导致性能较差
export class SnapShotSandbox {
  constructor () {
    // 代理对象
    this.proxy = window

    this.active()
  }

  // 沙箱激活
  active () {
    // 创建快照沙箱
    this.snapshot = new Map()
    for (const key in window) {
      this.snapshot[key] = window[key]
    }
  }

  // 沙箱销毁
  inactive () {
    for (const key in window) {
      if (window[key] !== this.snapshot[key]) {
        // 还原操作
        window[key] = this.snapshot[key]
      }
    }
  }
}
