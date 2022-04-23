export const performScriptForFunction = (script, appName) => {
  const scriptText = `
    ${script}
    return window['${appName}']
  `
  // eslint-disable-next-line no-new-func
  return new Function(scriptText).call(window, window)
}

export const performScriptForEval = (script, appName) => {
  const scriptText = `
    () => {
      ${script}
      return window['${appName}']
    }
  `
  // eslint-disable-next-line no-eval
  return eval(scriptText).call(window, window)
}
