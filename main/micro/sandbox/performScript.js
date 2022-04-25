export const performScriptForFunction = (script, appName, global) => {
  window.proxy = global
  const scriptText = `
   return ((window) => {
      ${script}
      return window['${appName}']
    })(window.proxy)
  `
  // eslint-disable-next-line no-new-func
  return new Function(scriptText)()
}

export const performScriptForEval = (script, appName, global) => {
  window.proxy = global
  const scriptText = `
    ((window) => {
      ${script}
      return window['${appName}']
    })(window.proxy)
  `
  // eslint-disable-next-line no-eval
  return eval(scriptText)
}
