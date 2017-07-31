import Timer from '../timer'
import now from '../now'

const actions = new Map()

export default class Action {

  constructor({uniqueName, cooldown}){
    // Check uniqueness
    if(actions.has(uniqueName)){
      throw `Action '${uniqueName} already exists`
    }

    this.uniqueName = uniqueName
    actions.set(this.uniqueName, this)

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
    this.onUpdate(context, dt)
  }

  /**
   * Override this to keep updating an action with desired delta and context
   * 
   * @param {any} context 
   * @param {number} dt 
   * @memberof Action
   */
  onUpdate(context, dt) {}

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
  onExecute(context) {}

  fail(context) {
    this.onFailure(context)
  }
  onFailure(context) {}

  succeed(context) {
    this.onSuccess(context)
  }
  onSuccess(context) {}

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