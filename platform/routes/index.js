var express = require('express')
var router = express.Router()
const path = require('path')
const fs = require('fs')
const childProcess = require('child_process')
const versionDir = path.join(__dirname, '../version')
const initVersion = '1.0.0'

/* GET home page. */
router.get('/', function (req, res, next) {
  const name = req.query.name
  // 创建一个当前应用的路径
  const currentUrl = path.join(versionDir, name)
  let newVersion = ''
  try {
    // 读取版本，版本不存在则进入catch
    const originVersion = fs.readFileSync(currentUrl).toString().replace(/\n/g, '')
    // todo 当前更新，只能更新最后一个版本号
    newVersion = originVersion.replace(/\.(\d+)$/, (a, b) => `.${+b + 1}`)
    fs.writeFileSync(currentUrl, newVersion)
  } catch (e) {
    // 设置初始值
    fs.writeFileSync(currentUrl, initVersion)
  }
  // 构建 打包 发布
  const originPath = path.join(__dirname, '../../', name)
  const originDist = path.join(originPath, 'dist')
  const bagPath = path.join(__dirname, '../bag')
  try {
    // 子进程异步执行构建打包命令
    childProcess.execSync(`cd ${originPath} && yarn install && npm run build`)
    // 创建打包文件夹
    childProcess.execSync(`cd ${bagPath} && mkdir -p ./${name}/${newVersion}`)
    // 将打包文件移入bag
    const lastDist = path.join(bagPath, `./${name}/${newVersion}`)
    childProcess.execSync(`mv ${originDist}/* ${lastDist}`)
    // todo 后续可以将生成的文件上传到cdn
    fs.readdir(path.join(bagPath, `./${name}`), function (err, files) {
      if (err) {
        return console.log('err', err)
      }
      const len = files.length
      // 最包保留2个版本
      if (len >= 2) {
        // 版本号排序
        const sFiles = files.sort((a, b) => {
          let aArr = a.split('.')
          let bArr = b.split('.')
          if (+aArr[0] === +bArr[0]) {
            if (+aArr[1] === +bArr[1]) {
              return +aArr[2] > +bArr[2] ? 1 : -1
            }
            return +aArr[1] > +bArr[1] ? 1 : -1
          }
          return +aArr[0] > +bArr[0] ? 1 : -1
        })
        // 删除最小版本
        childProcess.execSync(`rm -rf ${bagPath}/${name}/${sFiles[0]}`)
      }
    })
  } catch (e) {
    console.log(e)
  }
  res.send({
    version: newVersion
  })
})

module.exports = router
