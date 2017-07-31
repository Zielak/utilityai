
let now, getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime

if (performance && performance.now) {
  now = () => performance.now()
} else if (process && process.hrtime) {
  now = () => (getNanoSeconds() - nodeLoadTime) / 1e6
  hrtime = process.hrtime
  getNanoSeconds = () => {
    let hr
    hr = hrtime()
    return hr[0] * 1e9 + hr[1]
  }
  moduleLoadTime = getNanoSeconds()
  upTime = process.uptime() * 1e9
  nodeLoadTime = moduleLoadTime - upTime
} else if (Date.now) {
  now = () => Date.now() - loadTime
  loadTime = Date.now()
} else {
  now = () => new Date().getTime() - loadTime
  loadTime = new Date().getTime()
}

/**
 * Returns current time using available precision
 */
export default now
