
const _timers = []

export default class Timer {
  /**
   * Creates an instance of Timer.
   * @param {object} params
   * @param {number} params.time time after which this timer should finish
   * @param {boolean} params.running jump-start this timer immediatelly?
   * @param {boolean} params.repeat should this timer run continuously?
   * @param {function} params.onFinished function to be run after this timer is done
   * @memberof Timer
   */
  constructor({time = 0, running = true, repeat = false, onFinished = null}) {
    this._counter = 0

    this.time = time
    this.repeat = repeat
    this.onFinished = onFinished
    this.running = running
    
    this.finished = false
    _timers.push(this)
  }

  /**
   * Pause running this timer.
   * 
   * @memberof Timer
   */
  stop() {
    if (this.running) {
      this.running = false
      _timers.splice(_timers.indexOf(this), 1)
    }
  }

  /**
   * Reset this timer back to zero.
   * 
   * @memberof Timer
   */
  reset() {
    this._counter = 0
    this.running = true
    this.finished = false
  }

  // PRIVATE

  _update(dt) {
    if (this.running) {
      this._counter += dt
      if (this._counter >= this.time) {
        this._finish()
      }
      if(this.repeat){
        this.reset()
      }
    }
  }

  _finish() {
    this.running = false
    this.finished = true
    if(this.onFinished !== null){
      this.onFinished()
    }
  }

  // STATIC

  /**
   * Call this with given delta to update all running timers
   * 
   * @static
   * @param {number} dt delta time since last update
   * @memberof Timer
   */
  static update(dt) {
    _timers.forEach(el => {
      el._update(dt)
    })
  }

  /**
   * Factory for new Timer instance
   * 
   * @static
   * @param {object} params
   * @param {number} params.time time after which this timer should finish
   * @param {boolean} params.running jump-start this timer immediatelly?
   * @param {boolean} params.repeat should this timer run continuously?
   * @param {function} params.onFinished function to be run after this timer is done
   * @returns {Timer}
   * @memberof Timer
   */
  static delay({time = 0, repeat = false, onFinished = null}) {
    return new Timer({time, repeat, onFinished})
  }

  /**
   * Stops all timers immediatelly, ignoring their results
   * no callbacks should be called
   * 
   * @static
   * @memberof Timer
   */
  static clearAll() {
    _timers.forEach(el => el.stop())
  }
}
