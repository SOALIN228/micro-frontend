export const performScriptForFunction = (script) => {
  // eslint-disable-next-line no-new-func
  new Function(script).call(window, window)
}

export const performScriptForEval = (script) => {
  // eslint-disable-next-line no-eval
  eval(script)
}
