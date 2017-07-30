import Timer from '../timer'

const actions = new Map()

export default class Action {

  constructor({uniqueName, cooldown}){
    // Check uniqueness
    if(actions.has(uniqueName)){
      throw `Action '${uniqueName} already exists`
    }

    this.uniqueName = uniqueName
    actions.set(this.uniqueName, this)

    this._cooldown = new Timer({
      time: cooldown,
      running: false,
    })
  }

  get inCooldown() {
    return !this._cooldown.finished
  }

  
  update(context, dt) {
    this.onUpdate(context, dt)
  }
  onUpdate(dt) {}

  execute(context) {}

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
}