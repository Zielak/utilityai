
const _timers = []

export default class Timer {
  /**
   * Creates an instance of Timer.
   * @param {object} params
   * @param {number} [params.time=0] time after which this timer should finish
   * @param {boolean} [params.running=true] jump-start this timer immediatelly?
   * @param {boolean} [params.repeat=false] should this timer run continuously?
   * @param {function(passedTime:number, timer:Timer)} [params.onFinished=null] function to be run after this timer is done. It'll contain `passedTime` and a reference to this timer in `timer`
   * @memberof Timer
   */
  constructor({ time = 0, running = true, repeat = false, onFinished = null }) {
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
    return this
  }

  /**
   * Pauses this timer
   * 
   * @returns {Timer} this timer, for chaining
   * @memberof Timer
   */
  pause() {
    this.running = false
    return this
  }

  /**
   * Resums this timer
   * 
   * @returns {Timer} this timer, for chaining
   * @memberof Timer
   */
  resume() {
    this.running = true
    return this
  }

  /**
   * Reset this timer back to zero.
   * 
   * @returns {Timer} this timer, for chaining
   * @memberof Timer
   */
  reset() {
    this._counter = 0
    this.running = true
    this.finished = false
    return this
  }

  /**
   * How much time has passed since this timer begun
   * 
   * @readonly
   * @memberof Timer
   */
  get elapsed(){
    return this._counter
  }

  // PRIVATE

  /**
   * Updates this timer with delta
   * It will run `onFinished` with passed time in parameter.
   * (time passed can be higher than desired time)
   * 
   * @param {any} dt 
   * @memberof Timer
   */
  _update(dt) {
    if (this.running) {
      this._counter += dt
      if (this._counter >= this.time) {
        this._finish(this._counter)
      }
      if (this.repeat) {
        this.reset()
      }
    }
  }

  _finish(timePassed) {
    this.running = false
    this.finished = true
    if (this.onFinished !== null && typeof this.onFinished === 'function') {
      this.onFinished(timePassed)
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
  static delay({ time = 0, repeat = false, onFinished = null }) {
    return new Timer({ time, repeat, onFinished })
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
