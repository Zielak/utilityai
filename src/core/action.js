import Timer from '../timer'
import now from '../now'

const actions = new Map()

export default class Action {

  constructor({name, cooldown = 3000}){
    // Check uniqueness
    if(actions.has(name)){
      throw `Action '${name} already exists`
    }

    this.name = name
    actions.set(this.name, this)

    this.startedTime = now()
    this.status = Action.IDLE

    this._cooldown = new Timer({
      time: cooldown,
      running: false,
    })
  }

  /**
   * `true` if this action can't be run again right now
   * 
   * @readonly
   * @memberof Action
   */
  get inCooldown() {
    return !this._cooldown.finished
  }

  /**
   * How long has this action been running for
   * 
   * @readonly
   * @memberof Action
   */
  get elapsedTime() {
    if(this.status === Action.RUNNING){
      now() - this.startedTime
    } else {
      return 0
    }
  }

  update(context, dt) {
    if(this.status === Action.RUNNING){
      this.onUpdate(context, dt)
    }
  }

  execute(context) {
    if(this.inCooldown){
      this.status = Action.FAILURE
    }else if(this.status !== Action.RUNNING){
      this.startedTime = now()
      this.status = Action.RUNNING
      this.onExecute(context)
    }
    return this.status
  }

  /**
   * Ends running this action with a failure
   * 
   * @param {any} context 
   * @memberof Action
   */
  fail(context) {
    this.status = Action.FAILURE
    this.onFailure(context)
    this.onEnded(context)
  }

  /**
   * End this action with successful result
   * 
   * @param {any} context 
   * @memberof Action
   */
  succeed(context) {
    this.status = Action.SUCCESS
    this.onSuccess(context)
    this.onEnded(context)
  }

  // OVERRIDEES

  /**
   * Executes on every update untill this action ends with SUCCESS or FAILURE
   * 
   * @param {any} context 
   * @param {number} dt 
   * @memberof Action
   */
  onUpdate(context, dt) {}

  /**
   * Executes right after execution
   * 
   * @param {any} context 
   * @memberof Action
   */
  onExecute(context) {}

  /**
   * Executes once this action will end successfully
   * 
   * @param {any} context 
   * @memberof Action
   */
  onSuccess(context) {}

  /**
   * Executes once this action ends with a failure
   * 
   * @param {any} context 
   * @memberof Action
   */
  onFailure(context) {}

  /**
   * Runs after ending this action with FAILURE or SUCCESS
   * 
   * @param {any} context 
   * @memberof Action
   */
  onEnded(context) {}

  // PRIVATE

  _restartCooldown() {

  }

  // STATIC

  static get(name){
    return actions.get(name)
  }

  static get IDLE(){ return 0 }
  static get RUNNING(){ return 1 }
  static get SUCCESS(){ return 2 }
  static get FAILURE(){ return 3 }
}